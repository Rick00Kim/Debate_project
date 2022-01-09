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


class UserInfo(db.Document):
    id = db.SequenceField(primary_key=True)
    email = db.StringField()
    password = db.StringField()
    name = db.StringField()
    del_flg = db.StringField(default="0")


class Topics(db.Document):
    id = db.SequenceField(primary_key=True)
    title = db.StringField()
    header = db.StringField()
    content = db.StringField()


class DebateDetails(db.Document):
    id = db.SequenceField(primary_key=True)
    topic_num = db.IntField()
    username = db.StringField()
    email = db.StringField()
    content = db.StringField()
    create_on = db.DateTimeField(default=datetime.datetime.utcnow)
    update_on = db.DateTimeField(default=datetime.datetime.utcnow)


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
def delete_topic(topic_id):
    Topics(id=topic_id).delete()
    DebateDetails(topic_num=topic_id).delete()
    return Response("SUCCESS", mimetype="application/json", status=200)


@app.route("/api/debates/<int:refer_num>", methods=['GET'])
def debate_list(refer_num):
    get_data = DebateDetails.objects(topic_num=refer_num)
    debate_list = []
    for debate in get_data:
        debate_dict = debate.to_mongo().to_dict()
        debate_dict['create_on'] = datetime.datetime.strftime(
            debate.create_on, '%Y-%m-%d %H:%M:%S')
        debate_dict['update_on'] = datetime.datetime.strftime(
            debate.update_on, '%Y-%m-%d %H:%M:%S')
        debate_list.append(debate_dict)

    return Response(json.dumps(debate_list), mimetype="application/json", status=200)


@app.route("/api/debates", methods=['POST'])
def register_debate():
    task = request.json

    created_detail = DebateDetails(
        topic_num=task['topicNum'],
        username=task['username'],
        email=task['email'],
        content=task['content']
    ).save()

    return Response(created_detail.to_json(), mimetype="application/json", status=201)


@app.route("/api/debates/<int:debate_id>", methods=['DELETE'])
def delete_debate(debate_id):
    DebateDetails(id=debate_id).delete()

    return Response("SUCCESS", mimetype="application/json", status=200)


@app.route("/api/debates", methods=['PUT'])
def put_debate():
    task = request.json
    DebateDetails(
        id=task['_id'],
        topic_num=task['topicNum'],
        username=task['username'],
        email=task['email'],
        content=task['content']
    ).save()

    return Response("SUCCESS", mimetype="application/json", status=200)


if __name__ == "__main__":
    app.run(debug=True, port=5500)
