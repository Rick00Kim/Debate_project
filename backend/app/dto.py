

import datetime
from . import db


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
