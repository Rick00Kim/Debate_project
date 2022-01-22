# -*- coding: utf-8 -*-
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
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_bcrypt import Bcrypt
from jsonschema import validate
from constants import signin_schema, signup_schema

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
app.config['JWT_SECRET_KEY'] = os.environ['SECRET_KEY']
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
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
    name = db.StringField(unique=True)
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
    create_on = db.DateTimeField(default=datetime.datetime.now)
    update_on = db.DateTimeField(default=datetime.datetime.now)


class LikeOnDebate(db.Document):
    id = db.SequenceField(primary_key=True)
    debate_num = db.IntField()
    user_id = db.IntField()


class UnLikeOnDebate(db.Document):
    id = db.SequenceField(primary_key=True)
    debate_num = db.IntField()
    user_id = db.IntField()


@app.route('/api/auth', methods=['POST'])
def auth_login():
    try:
        validate(request.json, signin_schema)
        request_email = request.json['email']
        request_pwd = request.json['password']
        manager = UserInfo.objects(email=request_email).first()
        if manager and flask_bcrypt.check_password_hash(
                manager['password'], request_pwd):
            identify = {
                'email': manager['email'],
                'name': manager['name'],
                'role': manager['role']
            }
            response = {
                'status': 'SUCCESS',
                'access_token': create_access_token(identity=identify)
            }
            return Response(json.dumps(response), mimetype="application/json", status=200)
        else:
            return Response(json.dumps({"result": False}), mimetype="application/json", status=200)
    except Exception as e:
        return Response(json.dumps({"result": False}), mimetype="application/json", status=200)


@app.route('/api/signup', methods=['POST'])
def register_manager():
    response = {
        'status': True
    }

    try:
        print('validated => ', validate(request.json, signup_schema))
        validate(request.json, signup_schema)
        request_data = request.json

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
    except Exception as e:
        print(e)
        return Response(json.dumps({"result": False}), mimetype="application/json", status=200)


@app.route("/api/users", methods=['GET'])
@jwt_required()
def user_list():
    response = {"result": "SUCCESS"}
    current_user = get_jwt_identity()
    user = UserInfo.objects(email=current_user['email']).first()

    if user['role'] != "Manager":
        response['result'] = "FAIL"
        response['mesesage'] = "No permission"
        return Response(json.dumps(response), mimetype="application/json", status=403)

    user_list = UserInfo.objects().to_json()
    return Response(user_list, mimetype="application/json", status=200)


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

    return Response(created_topic.to_json(), mimetype="application/json", status=201)


@app.route("/api/topic", methods=['PUT'])
def modify_topic():
    task = request.json
    Topics(
        id=int(task['_id']),
        title=task['title'],
        header=task['header'],
        content=task['content']
    ).save()

    return Response("SUCCESS", mimetype="application/json", status=200)


@app.route("/api/topic/<int:topic_id>", methods=['DELETE'])
@jwt_required()
def delete_topic(topic_id):
    response = {"result": "SUCCESS"}
    current_user = get_jwt_identity()
    user = UserInfo.objects(email=current_user['email']).first()

    if user['role'] != "Manager":
        response['result'] = "FAIL"
        response['mesesage'] = "No permission"
        return Response(json.dumps(response), mimetype="application/json", status=403)

    Topics.objects(id=topic_id).delete()
    target_debate = DebateDetails.objects(topic_num=topic_id)
    for element in target_debate:
        LikeOnDebate.objects(debate_num=element['id']).delete()
        UnLikeOnDebate.objects(debate_num=element['id']).delete()
        element.delete()

    return Response("SUCCESS", mimetype="application/json", status=200)


@app.route("/api/debates/<int:refer_num>", methods=['GET'])
@jwt_required(optional=True)
def debate_list(refer_num):
    current_user = get_jwt_identity()
    debate_list = []
    get_data = DebateDetails.objects(topic_num=refer_num)
    for debate in get_data:
        debate_dict = debate.to_mongo().to_dict()
        user_info = UserInfo.objects(id=debate_dict['writer']).first()
        debate_dict['username'] = user_info['name']
        debate_dict['create_on'] = datetime.datetime.strftime(
            debate.create_on, '%Y-%m-%d %H:%M:%S')
        debate_dict['update_on'] = datetime.datetime.strftime(
            debate.update_on, '%Y-%m-%d %H:%M:%S')
        if current_user is None:
            debate_dict['edit_grant'] = False
        else:
            user = UserInfo.objects(email=current_user['email']).first()
            debate_dict['edit_grant'] = debate_dict['writer'] == user['id']
        debate_list.append(debate_dict)

    return Response(json.dumps(debate_list), mimetype="application/json", status=200)


@app.route("/api/debates", methods=['POST'])
@jwt_required()
def register_debate():
    task = request.json
    current_user = get_jwt_identity()

    user = UserInfo.objects(email=current_user['email']).first()

    DebateDetails(
        topic_num=task['topicNum'],
        writer=user['id'],
        content=task['content']
    ).save()

    return Response("SUCCESS", mimetype="application/json", status=201)


@app.route("/api/debates/<int:debate_id>", methods=['DELETE'])
@jwt_required()
def delete_debate(debate_id):
    response = {"result": "SUCCESS"}
    current_user = get_jwt_identity()
    user = UserInfo.objects(email=current_user['email']).first()

    target_debate = DebateDetails.objects(id=debate_id).first()

    if user['role'] != "Manager" and target_debate.writer != user['id']:
        response['result'] = "FAIL"
        response['mesesage'] = "Current user no have grant for deleting debate"
        return Response(json.dumps(response), mimetype="application/json", status=200)

    LikeOnDebate.objects(debate_num=target_debate['id']).delete()
    UnLikeOnDebate.objects(debate_num=target_debate['id']).delete()
    target_debate.delete()
    return Response(json.dumps(response), mimetype="application/json", status=200)


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
        content=task['content'],
        update_on=datetime.datetime.now
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
        'liked': not LikeOnDebate.objects(debate_num=debate_num, user_id=user['id']).count() == 0,
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
