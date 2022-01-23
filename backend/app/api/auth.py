import json
from jsonschema import validate
from flask import Response, request
from flask_jwt_extended import create_access_token
from ..constants import signin_schema
from ..dto import UserInfo
from .. import app, flask_bcrypt


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
