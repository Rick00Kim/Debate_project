import datetime
import os
import json
from bson import encode

from flask import Flask, Response, request
from flask_mongoengine import MongoEngine

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': os.environ['MONGODB_HOST'],
    'username': os.environ['MONGODB_USERNAME'],
    'password': os.environ['MONGODB_PASSWORD'],
    'db': 'webapp'
}

db = MongoEngine()
db.init_app(app)


class Topics(db.Document):
    idx = db.IntField()
    title = db.StringField()
    header = db.StringField()
    content = db.StringField()


class DebateDetails(db.Document):
    topic_num = db.IntField()
    username = db.StringField()
    email = db.StringField()
    content = db.StringField()
    create_on = db.DateTimeField(default=datetime.datetime.utcnow)


@app.route("/api/topics", methods=['GET'])
def topics_list():
    topics_list = Topics.objects().to_json()
    print(topics_list)
    return Response(topics_list, mimetype="application/json", status=200)


@app.route("/api/debates/<int:refer_num>", methods=['GET'])
def debate_list(refer_num):
    get_data = DebateDetails.objects(topic_num=refer_num)
    debate_list = []
    for debate in get_data:
        debate_dict = debate.to_mongo().to_dict()
        print(debate_dict)
        debate_dict.pop('_id')
        debate_dict['create_on'] = datetime.datetime.strftime(
            debate.create_on, '%Y-%m-%d %H:%M:%S')
        debate_list.append(debate_dict)

    return Response(json.dumps(debate_list), mimetype="application/json", status=200)


@app.route("/api/debates", methods=['POST'])
def register_debate():
    task = request.json
    print(task)

    DebateDetails(
        topic_num=task['topicNum'],
        username=task['username'],
        email=task['email'],
        content=task['content']
    ).save()

    return Response(json.dumps(task), mimetype="application/json", status=201)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
