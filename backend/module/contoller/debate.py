import json
from flask import Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from .. import app
from ..model.dto import *


@app.route("/api/debates", methods=['POST'])
@jwt_required()
def register_debate():
    task = request.json
    current_user = get_jwt_identity()

    user = UserInfo.objects(email=current_user['email']).first()

    created_detail = DebateDetails(
        topic_num=task['topicNum'],
        writer=user['id'],
        content=task['content']
    ).save()

    return Response("SUCCESS", mimetype="application/json", status=201)


@app.route("/api/debates/<int:debate_id>", methods=['DELETE'])
@jwt_required()
def delete_debate(debate_id):
    target_debate = DebateDetails.objects(id=debate_id).first()
    LikeOnDebate.objects(debate_num=target_debate['id']).delete()
    UnLikeOnDebate.objects(debate_num=target_debate['id']).delete()
    target_debate.delete()
    return Response("SUCCESS", mimetype="application/json", status=200)


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
        content=task['content']
    ).save()

    return Response("SUCCESS", mimetype="application/json", status=200)
