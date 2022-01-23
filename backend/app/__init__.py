# -*- coding: utf-8 -*-
import os
import logging
from os import path
from datetime import timedelta
from logging.config import fileConfig
from logging.handlers import RotatingFileHandler
from flask import Flask
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

# Log settings
fileConfig(path.join(path.dirname(path.abspath(__file__)), 'log_config.ini'))
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
