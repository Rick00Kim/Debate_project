import datetime
import os
import json
import logging
from datetime import timedelta
from logging.config import fileConfig
from logging.handlers import RotatingFileHandler
from flask import Flask, Response, request
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, create_refresh_token, get_jwt_identity
from flask_bcrypt import Bcrypt
from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

# Log settings
fileConfig('./log_config.ini')
logger = logging.getLogger('debate_backend_logger')

handler = RotatingFileHandler(
    'logs/debate_backend_logger.log', maxBytes=10000, backupCount=10)
handler.setLevel(logging.INFO)

app = Flask(__name__)
CORS(app)
app.config['MONGODB_SETTINGS'] = {
    'host': os.environ['MONGODB_HOST'],
    'username': os.environ['MONGODB_USERNAME'],
    'password': os.environ['MONGODB_PASSWORD'],
    'db': 'debate_web'
}
app.config['JWT_SECRET_KEY'] = 'sampleSecretKey'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}
app.logger.addHandler(handler)

db = MongoEngine()
db.init_app(app)

flask_bcrypt = Bcrypt(app)
jwt = JWTManager(app)


class UserInfo(db.Document):
    id = db.SequenceField(primary_key=True)
    email = db.StringField(unique=True)
    password = db.StringField()
    name = db.StringField()
    role = db.StringField(default="Participant")
    del_flg = db.StringField(default="0")


class Topics(db.Document):
    id = db.SequenceField(primary_key=True)
    title = db.StringField()
    header = db.StringField()
    content = db.StringField()


class DebateDetails(db.Document):
    id = db.SequenceField(primary_key=True)
    topic_num = db.IntField()
    writer = db.IntField()
    content = db.StringField()
    create_on = db.DateTimeField(default=datetime.datetime.utcnow)
    update_on = db.DateTimeField(default=datetime.datetime.utcnow)


class LikeOnDebate(db.Document):
    id = db.SequenceField(primary_key=True)
    debate_num = db.IntField()
    user_id = db.IntField()


class UnLikeOnDebate(db.Document):
    id = db.SequenceField(primary_key=True)
    debate_num = db.IntField()
    user_id = db.IntField()


def validate_for_auth(auth_data):
    user_schema = {
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
            },
            "email": {
                "type": "string",
                "format": "email"
            },
            "password": {
                "type": "string",
                "minLength": 8
            }
        },
        "required": ["email", "password"],
        "additionalProperties": False
    }

    try:
        validate(auth_data, user_schema)
    except ValidationError as e:
        return {'result': False, 'message': e}
    except SchemaError as e:
        return {'result': False, 'message': e}
    return {'result': True, 'data': auth_data}


@app.route('/api/auth', methods=['POST'])
def auth_login():
    validated_data = validate_for_auth(request.json)
    try:
        if validated_data['result']:
            request_data = validated_data['data']
            request_pwd = request_data['password']
            manager = UserInfo.objects(email=request_data['email']).first()
            if manager and flask_bcrypt.check_password_hash(
                    manager['password'], request_pwd):
                identify = {
                    'email': manager['email'],
                    'name': manager['name'],
                    'role': manager['role']
                }
                response = {
                    'status': 'SUCCESS',
                    'access_token': create_access_token(identity=identify),
                    'refresh_token': create_refresh_token(identity=identify)
                }
                return Response(json.dumps(response), mimetype="application/json", status=200)
            else:
                return Response(json.dumps({"result": False}), mimetype="application/json", status=200)
        else:
            return Response(json.dumps({"result": False}), mimetype="application/json", status=200)
    except Exception as e:
        return Response(json.dumps({"result": False}), mimetype="application/json", status=200)


@app.route('/api/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    try:
        current_user = get_jwt_identity()
        print('USER', current_user)
        response = {
            'status': 'SUCCESS',
            'access_token': create_access_token(identity=current_user)
        }
    except Exception as e:
        print(e)
    return Response(json.dumps(response), mimetype="application/json", status=200)


@app.route('/api/signup', methods=['POST'])
def register_manager():
    request_data = request.json
    response = {
        'status': 'SUCCESS'
    }

    if UserInfo.objects(email=request_data['email']):
        response['status'] = False
        response['message'] = "{} is already registered...".format(
            request_data['email'])
        return Response(json.dumps(response), mimetype="application/json", status=200)

    UserInfo(
        name=request_data['name'],
        email=request_data['email'],
        password=flask_bcrypt.generate_password_hash(
            request_data['password']).decode('utf-8')
    ).save()

    return Response(json.dumps(response), mimetype="application/json", status=201)


@app.route("/api/topic", methods=['GET'])
def topics_list():
    topics_list = Topics.objects().to_json()
    return Response(topics_list, mimetype="application/json", status=200)


@app.route("/api/topic/<int:topic_num>", methods=['GET'])
def topic_one(topic_num):
    topic_one = Topics.objects(id=topic_num).first().to_json()
    return Response(topic_one, mimetype="application/json", status=200)


@app.route("/api/topic", methods=['POST'])
def add_topic():
    task = request.json
    created_topic = Topics(
        title=task['title'],
        header=task['header'],
        content=task['content']
    ).save()

    print(created_topic)

    return Response(created_topic.to_json(), mimetype="application/json", status=201)


@app.route("/api/topic", methods=['PUT'])
def modify_topic():
    task = request.json
    modified_topic = Topics(
        id=task['_id'],
        title=task['title'],
        header=task['header'],
        content=task['content']
    ).save()

    print(modified_topic)

    return Response("SUCCESS", mimetype="application/json", status=200)


@app.route("/api/topic/<int:topic_id>", methods=['DELETE'])
@jwt_required()
def delete_topic(topic_id):
    current_user = get_jwt_identity()
    if current_user['role'] != "Manager":
        return Response("No permission", mimetype="application/json", status=200)

    Topics.objects(id=topic_id).delete()
    target_debate = DebateDetails.objects(topic_num=topic_id)
    for element in target_debate:
        LikeOnDebate.objects(debate_num=element['id']).delete()
        UnLikeOnDebate.objects(debate_num=element['id']).delete()
        element.delete()

    return Response("SUCCESS", mimetype="application/json", status=200)


@app.route("/api/debates/<int:refer_num>", methods=['GET'])
def debate_list(refer_num):
    get_data = DebateDetails.objects(topic_num=refer_num)
    debate_list = []
    for debate in get_data:
        debate_dict = debate.to_mongo().to_dict()
        user_info = UserInfo.objects(id=debate_dict['writer']).first()
        debate_dict['username'] = user_info['name']
        debate_dict['create_on'] = datetime.datetime.strftime(
            debate.create_on, '%Y-%m-%d %H:%M:%S')
        debate_dict['update_on'] = datetime.datetime.strftime(
            debate.update_on, '%Y-%m-%d %H:%M:%S')
        debate_list.append(debate_dict)

    return Response(json.dumps(debate_list), mimetype="application/json", status=200)


@app.route("/api/debates", methods=['POST'])
@jwt_required()
def register_debate():
    task = request.json
    current_user = get_jwt_identity()

    user = UserInfo.objects(email=current_user['email']).first()

    created_detail = DebateDetails(
        topic_num=task['topicNum'],
        writer=user['id'],
        content=task['content']
    ).save()

    return Response("SUCCESS", mimetype="application/json", status=201)


@app.route("/api/debates/<int:debate_id>", methods=['DELETE'])
@jwt_required()
def delete_debate(debate_id):
    target_debate = DebateDetails.objects(id=debate_id).first()
    LikeOnDebate.objects(debate_num=target_debate['id']).delete()
    UnLikeOnDebate.objects(debate_num=target_debate['id']).delete()
    target_debate.delete()
    return Response("SUCCESS", mimetype="application/json", status=200)


@app.route("/api/debates", methods=['PUT'])
@jwt_required()
def put_debate():
    task = request.json
    current_user = get_jwt_identity()
    user = UserInfo.objects(email=current_user['email']).first()
    DebateDetails(
        id=task['_id'],
        topic_num=task['topicNum'],
        writer=user['id'],
        content=task['content']
    ).save()

    return Response("SUCCESS", mimetype="application/json", status=200)


@app.route("/api/like/<int:debate_num>", methods=['GET'])
@jwt_required()
def get_debate_like(debate_num):
    current_user = get_jwt_identity()

    user = UserInfo.objects(email=current_user['email']).first()

    response = {
        'like_cnt': LikeOnDebate.objects(debate_num=debate_num).count(),
        'unlike_cnt': UnLikeOnDebate.objects(debate_num=debate_num).count(),
        'liked': False if LikeOnDebate.objects(debate_num=debate_num, user_id=user['id']).count() == 0 else True,
        'unliked': False if UnLikeOnDebate.objects(debate_num=debate_num, user_id=user['id']).count() == 0 else True
    }

    return Response(json.dumps(response), mimetype="application/json", status=200)


@app.route("/api/like", methods=['POST'])
@jwt_required()
def post_debate_like():
    task = request.json
    current_user = get_jwt_identity()

    user = UserInfo.objects(email=current_user['email']).first()

    if LikeOnDebate.objects(debate_num=task['debate_id'], user_id=user['id']).count() == 0:
        LikeOnDebate(debate_num=task['debate_id'], user_id=user['id']).save()
        if UnLikeOnDebate.objects(debate_num=task['debate_id'], user_id=user['id']).count() > 0:
            UnLikeOnDebate.objects(
                debate_num=task['debate_id'], user_id=user['id']).delete()
    else:
        LikeOnDebate.objects(
            debate_num=task['debate_id'], user_id=user['id']).delete()

    return Response("SUCCESS", mimetype="application/json", status=200)


@app.route("/api/unlike", methods=['POST'])
@jwt_required()
def post_debate_unlike():
    task = request.json
    current_user = get_jwt_identity()

    user = UserInfo.objects(email=current_user['email']).first()

    if UnLikeOnDebate.objects(debate_num=task['debate_id'], user_id=user['id']).count() == 0:
        UnLikeOnDebate(
            debate_num=task['debate_id'], user_id=user['id']).save()
        if LikeOnDebate.objects(debate_num=task['debate_id'], user_id=user['id']).count() > 0:
            LikeOnDebate.objects(
                debate_num=task['debate_id'], user_id=user['id']).delete()
    else:
        UnLikeOnDebate.objects(debate_num=task['debate_id'],
                               user_id=user['id']).delete()

    return Response("SUCCESS", mimetype="application/json", status=200)


if __name__ == "__main__":
    app.run(debug=True, port=5500)
