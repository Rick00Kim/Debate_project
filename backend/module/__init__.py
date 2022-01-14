from .db import db
import os
import logging
from datetime import timedelta
from logging.config import fileConfig
from logging.handlers import RotatingFileHandler
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from .contoller.topic import Topic, TopicList


# Log settings
# fileConfig('./log_config.ini')
# logger = logging.getLogger('debate_backend_logger')

# handler = RotatingFileHandler(
#     'logs/debate_backend_logger.log', maxBytes=10000, backupCount=10)
# handler.setLevel(logging.INFO)


flask_app = Flask(__name__)
CORS(flask_app)
flask_app.config['MONGODB_SETTINGS'] = {
    'host': os.environ['MONGODB_HOST'],
    'username': os.environ['MONGODB_USERNAME'],
    'password': os.environ['MONGODB_PASSWORD'],
    'db': 'debate_web'
}
flask_app.config['JWT_SECRET_KEY'] = 'sampleSecretKey'
flask_app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
flask_app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}
# app.logger.addHandler(handler)
db.init_app(flask_app)

flask_bcrypt = Bcrypt(flask_app)
jwt = JWTManager(flask_app)
api = Api(flask_app)


api.add_resource(Topic, '/api/topic/<int:topic_num>')
api.add_resource(TopicList, '/api/topics')
