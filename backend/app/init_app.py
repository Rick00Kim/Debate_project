import os
from .dto import UserInfo
from . import flask_bcrypt

if not UserInfo.objects(email='admin@admin.com'):
    UserInfo(
        name='ADMIN',
        email='admin@admin.com',
        password=flask_bcrypt.generate_password_hash(
             os.getenv('DEBATE_INIT_USER_PWD')).decode('utf-8'),
        role='Manager',
        temporary_password=True
    ).save()
