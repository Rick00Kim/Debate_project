import json
from flask import Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..dto import UserInfo, LikeOnDebate, UnLikeOnDebate
from .. import app


@app.route("/api/like/<int:debate_num>", methods=['GET'])
@jwt_required()
def get_debate_like(debate_num):
    current_user = get_jwt_identity()

    user = UserInfo.objects(email=current_user['email']).first()

    response = {
        'like_cnt': LikeOnDebate.objects(debate_num=debate_num).count(),
        'unlike_cnt': UnLikeOnDebate.objects(debate_num=debate_num).count(),
        'liked': not LikeOnDebate.objects(debate_num=debate_num, user_id=user['id']).count() == 0,
        'unliked': False if UnLikeOnDebate.objects(debate_num=debate_num, user_id=user['id']).count() == 0 else True
    }

    return Response(json.dumps(response), mimetype="application/json", status=200)


@app.route("/api/like", methods=['POST'])
@jwt_required()
def post_debate_like():
    task = request.json
    current_user = get_jwt_identity()

    user = UserInfo.objects(email=current_user['email']).first()

    if LikeOnDebate.objects(debate_num=task['debate_id'], user_id=user['id']).count() == 0:
        LikeOnDebate(debate_num=task['debate_id'], user_id=user['id']).save()
        if UnLikeOnDebate.objects(debate_num=task['debate_id'], user_id=user['id']).count() > 0:
            UnLikeOnDebate.objects(
                debate_num=task['debate_id'], user_id=user['id']).delete()
    else:
        LikeOnDebate.objects(
            debate_num=task['debate_id'], user_id=user['id']).delete()

    return Response("SUCCESS", mimetype="application/json", status=200)


@app.route("/api/unlike", methods=['POST'])
@jwt_required()
def post_debate_unlike():
    task = request.json
    current_user = get_jwt_identity()

    user = UserInfo.objects(email=current_user['email']).first()

    if UnLikeOnDebate.objects(debate_num=task['debate_id'], user_id=user['id']).count() == 0:
        UnLikeOnDebate(
            debate_num=task['debate_id'], user_id=user['id']).save()
        if LikeOnDebate.objects(debate_num=task['debate_id'], user_id=user['id']).count() > 0:
            LikeOnDebate.objects(
                debate_num=task['debate_id'], user_id=user['id']).delete()
    else:
        UnLikeOnDebate.objects(debate_num=task['debate_id'],
                               user_id=user['id']).delete()

    return Response("SUCCESS", mimetype="application/json", status=200)
