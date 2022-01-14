import json
from flask import Response, request
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, create_access_token, create_refresh_token, get_jwt_identity
from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError
from .. import app, flask_bcrypt
from ..model.dto import UserInfo


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


class Auth(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('email', type=str, required=True,
                        help='This field cannot be left blank')
    parser.add_argument('password', type=str, required=True,
                        help='This field cannot be left blank')

# @app.route('/api/auth', methods=['POST'])
    def post(self):
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


class SignUp(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('email', type=str, required=True,
                        help='This field cannot be left blank')
    parser.add_argument('password', type=str, required=True,
                        help='This field cannot be left blank')
    parser.add_argument('name', type=str, required=True,
                        help='This field cannot be left blank')

    # @app.route('/api/signup', methods=['POST'])

    def post(self):
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
