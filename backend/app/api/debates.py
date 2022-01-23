import datetime
import json
from flask import Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..dto import UserInfo, DebateDetails, LikeOnDebate, UnLikeOnDebate
from .. import app


@app.route("/api/debates/<int:refer_num>", methods=['GET'])
@jwt_required(optional=True)
def debate_list(refer_num):
    current_user = get_jwt_identity()
    debate_list = []
    get_data = DebateDetails.objects(topic_num=refer_num)
    for debate in get_data:
        debate_dict = debate.to_mongo().to_dict()
        user_info = UserInfo.objects(id=debate_dict['writer']).first()
        debate_dict['username'] = user_info['name']
        debate_dict['create_on'] = datetime.datetime.strftime(
            debate.create_on, '%Y-%m-%d %H:%M:%S')
        debate_dict['update_on'] = datetime.datetime.strftime(
            debate.update_on, '%Y-%m-%d %H:%M:%S')
        if current_user is None:
            debate_dict['edit_grant'] = False
        else:
            user = UserInfo.objects(email=current_user['email']).first()
            debate_dict['edit_grant'] = debate_dict['writer'] == user['id']
        debate_list.append(debate_dict)

    return Response(json.dumps(debate_list), mimetype="application/json", status=200)


@app.route("/api/debates", methods=['POST'])
@jwt_required()
def register_debate():
    task = request.json
    current_user = get_jwt_identity()

    user = UserInfo.objects(email=current_user['email']).first()

    DebateDetails(
        topic_num=task['topicNum'],
        writer=user['id'],
        content=task['content']
    ).save()

    return Response("SUCCESS", mimetype="application/json", status=201)


@app.route("/api/debates/<int:debate_id>", methods=['DELETE'])
@jwt_required()
def delete_debate(debate_id):
    response = {"result": "SUCCESS"}
    current_user = get_jwt_identity()
    user = UserInfo.objects(email=current_user['email']).first()

    target_debate = DebateDetails.objects(id=debate_id).first()

    if user['role'] != "Manager" and target_debate.writer != user['id']:
        response['result'] = "FAIL"
        response['mesesage'] = "Current user no have grant for deleting debate"
        return Response(json.dumps(response), mimetype="application/json", status=200)

    LikeOnDebate.objects(debate_num=target_debate['id']).delete()
    UnLikeOnDebate.objects(debate_num=target_debate['id']).delete()
    target_debate.delete()
    return Response(json.dumps(response), mimetype="application/json", status=200)


@app.route("/api/debates", methods=['PUT'])
@jwt_required()
def put_debate():
    task = request.json
    current_user = get_jwt_identity()
    user = UserInfo.objects(email=current_user['email']).first()
    DebateDetails(
        id=task['_id'],
        topic_num=task['topicNum'],
        writer=user['id'],
        content=task['content'],
        update_on=datetime.datetime.now
    ).save()

    return Response("SUCCESS", mimetype="application/json", status=200)
