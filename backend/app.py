import datetime
import os
import json

from flask import Flask, Response, request
from flask_mongoengine import MongoEngine

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': "mongodb://192.168.0.8:27017",
    'username': "admin",
    'password': "admin",
    'db': 'admin'
}

db = MongoEngine()
db.init_app(app)


class Topic(db.Document):
    idx = db.IntField()
    title = db.StringField()
    header = db.StringField()
    content = db.StringField()


class DebateDetails(db.Document):
    topic_num = db.IntField()
    username = db.StringField()
    email = db.StringField()
    opinion = db.StringField()


@app.route("/api/topics")
def topic_list():
    # Todo.objects().delete()
    # Todo(title="Simple todo A", text="12345678910").save()
    # Todo(title="Simple todo B", text="12345678910").save()
    # Todo.objects(title__contains="B").update(set__text="Hello world")
    # todos = Todo.objects().to_json()

    topic_list = [
        {
            "idx": 1,
            "title": "Grow up as developer",
            "header": "How to improve development skill?",
            "content": "What is your advice for development as a developer?"
        },
        {
            "idx": 2,
            "title": "Happiness..",
            "header": "How to make people happy?",
            "content": "Things to do for people's happiness."
        },
    ]

    return Response(json.dumps(topic_list), mimetype="application/json", status=200)


@app.route("/api/debates/<int:topic_num>", methods=['GET'])
def debate_list(topic_num):
    debate_list = [
        {"topic_num": 1, "username": "Author1", "email": "Author1@gmail.com",
            "opinion": "Read Documents and Write code."},
        {"topic_num": 1, "username": "Author2", "email": "Author2@gmail.com",
            "opinion": "Write just document and read it!"},
        {"topic_num": 1, "username": "Author3", "email": "Author3@gmail.com",
            "opinion": "Write code by yourself"},
        {"topic_num": 1, "username": "Author4",
            "email": "Author4@gmail.com", "opinion": "I love stackoverflow"},
        {"topic_num": 2, "username": "Author5",
            "email": "Author5@gmail.com", "opinion": "Runbook."},
        {"topic_num": 2, "username": "Author6",
            "email": "Author6@gmail.com", "opinion": "It is not difficult."},
        {"topic_num": 2, "username": "Author7",
            "email": "Author7@gmail.com", "opinion": "I don’t know…"},
        {"topic_num": 2, "username": "Author8",
            "email": "Author8@gmail.com", "opinion": "I have no ideas."},
        {"topic_num": 1, "username": "Author9", "email": "Author9@gmail.com",
            "opinion": "I also wanna ask what is recommend book?"},
        {"topic_num": 1, "username": "Author10",
            "email": "Author10@gmail.com", "opinion": "Stackoverflow!!!!"},
        {"topic_num": 1, "username": "Author1", "email": "Author1@gmail.com",
         "opinion": "Read Documents and Write code."},
        {"topic_num": 1, "username": "Author2", "email": "Author2@gmail.com",
            "opinion": "Write just document and read it!"},
        {"topic_num": 1, "username": "Author3", "email": "Author3@gmail.com",
            "opinion": "Write code by yourself"},
        {"topic_num": 1, "username": "Author4",
            "email": "Author4@gmail.com", "opinion": "I love stackoverflow"},
        {"topic_num": 2, "username": "Author5",
            "email": "Author5@gmail.com", "opinion": "Runbook."},
        {"topic_num": 2, "username": "Author6",
            "email": "Author6@gmail.com", "opinion": "It is not difficult."},
        {"topic_num": 2, "username": "Author7",
            "email": "Author7@gmail.com", "opinion": "I don’t know…"},
        {"topic_num": 2, "username": "Author8",
            "email": "Author8@gmail.com", "opinion": "I have no ideas."},
        {"topic_num": 1, "username": "Author9", "email": "Author9@gmail.com",
            "opinion": "I also wanna ask what is recommend book?"},
        {"topic_num": 1, "username": "Author10",
            "email": "Author10@gmail.com", "opinion": "Stackoverflow!!!!"},
        {"topic_num": 1, "username": "Author1", "email": "Author1@gmail.com",
         "opinion": "Read Documents and Write code."},
        {"topic_num": 1, "username": "Author2", "email": "Author2@gmail.com",
            "opinion": "Write just document and read it!"},
        {"topic_num": 1, "username": "Author3", "email": "Author3@gmail.com",
            "opinion": "Write code by yourself"},
        {"topic_num": 1, "username": "Author4",
            "email": "Author4@gmail.com", "opinion": "I love stackoverflow"},
        {"topic_num": 2, "username": "Author5",
            "email": "Author5@gmail.com", "opinion": "Runbook."},
        {"topic_num": 2, "username": "Author6",
            "email": "Author6@gmail.com", "opinion": "It is not difficult."},
        {"topic_num": 2, "username": "Author7",
            "email": "Author7@gmail.com", "opinion": "I don’t know…"},
        {"topic_num": 2, "username": "Author8",
            "email": "Author8@gmail.com", "opinion": "I have no ideas."},
        {"topic_num": 1, "username": "Author9", "email": "Author9@gmail.com",
            "opinion": "I also wanna ask what is recommend book?"},
        {"topic_num": 1, "username": "Author10",
            "email": "Author10@gmail.com", "opinion": "Stackoverflow!!!!"},
    ]

    result = list(filter(lambda x: x['topic_num'] == topic_num, debate_list))

    return Response(json.dumps(result), mimetype="application/json", status=200)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
