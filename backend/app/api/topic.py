import json
from flask import Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..dto import UserInfo, Topics, DebateDetails, LikeOnDebate, UnLikeOnDebate
from .. import app


@app.route("/api/topic", methods=['GET'])
def topics_list():
    topics_list = Topics.objects().to_json()
    return Response(topics_list, mimetype="application/json", status=200)


@app.route("/api/topic/<int:topic_num>", methods=['GET'])
def topic_one(topic_num):
    topic_one = Topics.objects(id=topic_num).first().to_json()
    return Response(topic_one, mimetype="application/json", status=200)


@app.route("/api/topic", methods=['POST'])
def add_topic():
    task = request.json
    created_topic = Topics(
        title=task['title'],
        header=task['header'],
        content=task['content']
    ).save()

    return Response(created_topic.to_json(), mimetype="application/json", status=201)


@app.route("/api/topic", methods=['PUT'])
def modify_topic():
    task = request.json
    Topics(
        id=int(task['_id']),
        title=task['title'],
        header=task['header'],
        content=task['content']
    ).save()

    return Response("SUCCESS", mimetype="application/json", status=200)


@app.route("/api/topic/<int:topic_id>", methods=['DELETE'])
@jwt_required()
def delete_topic(topic_id):
    response = {"result": "SUCCESS"}
    current_user = get_jwt_identity()
    user = UserInfo.objects(email=current_user['email']).first()

    if user['role'] != "Manager":
        response['result'] = "FAIL"
        response['mesesage'] = "No permission"
        return Response(json.dumps(response), mimetype="application/json", status=403)

    Topics.objects(id=topic_id).delete()
    target_debate = DebateDetails.objects(topic_num=topic_id)
    for element in target_debate:
        LikeOnDebate.objects(debate_num=element['id']).delete()
        UnLikeOnDebate.objects(debate_num=element['id']).delete()
        element.delete()

    return Response("SUCCESS", mimetype="application/json", status=200)
