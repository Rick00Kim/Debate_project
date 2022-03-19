import json
from flask import Response, request
from jsonschema import validate
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..constants import signup_schema, initialize_password_schema
from ..dto import UserInfo
from .. import app, flask_bcrypt


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


@app.route("/api/init-password", methods=['POST'])
@jwt_required()
def init_password():
    response = {"result": "SUCCESS"}
    current_user = get_jwt_identity()

    try:
        validate(request.json, initialize_password_schema)
        request_data = request.json

        user = UserInfo.objects(email=current_user['email']).first()

        if(request_data['password'] != request_data['confirmPassword']):
            response['result'] = "FAIL"
            response['mesesage'] = "Not equal password and confirmPassword"
            return Response(json.dumps(response), mimetype="application/json", status=200)

        UserInfo(
            id=user['id'],
            name=user['name'],
            email=user['email'],
            password=flask_bcrypt.generate_password_hash(
                request_data['password']).decode('utf-8'),
            temporary_password=False
        ).save()

        return Response(json.dumps(response), mimetype="application/json", status=200)
    except Exception as e:
        print(e)
        return Response(json.dumps({"result": False}), mimetype="application/json", status=200)
