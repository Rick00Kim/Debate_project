import json
from flask import Response, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, reqparse
from werkzeug.wrappers import response
from ..model.dto import *


class Topic(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('topic_num', type=int, required=True,
                        help='Must enter the topic_num')

    def get(self, topic_num):
        topic_one = Topics.objects(id=topic_num).first().to_json()
        return Response(topic_one, mimetype="application/json", status=200)

    def post(self):
        task = request.json
        created_topic = Topics(
            title=task['title'],
            header=task['header'],
            content=task['content']
        ).save()

        print(created_topic)

        return Response(created_topic.to_json(), mimetype="application/json", status=201)

    def put(self):
        task = request.json
        modified_topic = Topics(
            id=task['_id'],
            title=task['title'],
            header=task['header'],
            content=task['content']
        ).save()

        print(modified_topic)

        return Response("SUCCESS", mimetype="application/json", status=200)

    @jwt_required()
    def delete(self, topic_num):
        response = {"result": "SUCCESS"}
        current_user = get_jwt_identity()
        print(current_user)
        user = UserInfo.objects(email=current_user['email']).first()

        if user['role'] != "Manager":
            response['result'] = "FAIL"
            response['mesesage'] = "No permission"
            return Response(json.dumps(response), mimetype="application/json", status=403)

        Topics.objects(id=topic_num).delete()
        target_debate = DebateDetails.objects(topic_num=topic_num)
        for element in target_debate:
            LikeOnDebate.objects(debate_num=element['id']).delete()
            UnLikeOnDebate.objects(debate_num=element['id']).delete()
            element.delete()

        return Response("SUCCESS", mimetype="application/json", status=200)


class TopicList(Resource):

    def get(self):
        topics_list = Topics.objects().to_json()

        return Response(topics_list, mimetype="application/json", status=200)
