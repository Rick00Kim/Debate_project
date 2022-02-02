# Debate_project

Build Debate Module using Docker, (Kubernetes)

## SUMMARY

Web application for debate with various people.

1. To build simple web application using `React.js` and `Python & Flask framework`
2. To build with Docker and Kubernetes.

## PRECONDITION

1. Spec
   - Web server: NGINX 1.15
   - Frontend: Node 14.18-alpine
   - Backend: Python 3.8
2. Tools
   [TODO] Write Tools

## DESIGN

1. System
   [TODO] Input Picture
2. Views

3. APIs
   | No | End point | Function name | Method | description |
   |----|-----------|---------------|--------|-------------|
   | 1| /api/auth| Authorize | POST|- |
   | 2| /api/signup| Sign up| POST| -|
   | 3| /api/users| Get all users|GET | -|
   | 4| /api/topic| Get topic|GET | -|
   | 5| /api/topic/{topic_num}| Get specific topic| GET| -|
   | 6| /api/topic| Resister topic| POST| -|
   | 7| /api/topic|Modify topic |PUT | -|
   | 8| /api/topic/{topic_num}|Delete topic | DELETE| -|
   | 9| /api/debates/{topic_num}| Get Debate List | GET| -|
   | 10| /api/debates| Resister Debate | POST| -|
   | 11| /api/debates/{debate_id} | Delete Debate | DELETE| -|
   | 12| /api/debates| Modify Debate | PUT| -|
   | 13| /api/like/{debate_num}| Get Like and Unlike | GET| -|
   | 14| /api/like| Resister like |POST | -|
   | 15| /api/unlike| Resister unlike |POST | -|
