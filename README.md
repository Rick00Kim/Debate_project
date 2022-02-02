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
   | 1| /api/auth| Authorize | POST| Login |
   | 2| /api/signup| Sign up| POST| Sign up user |
   | 3| /api/users| Get all users|GET | get all users (Manage) |
   | 4| /api/topic| Get topic|GET | Get all topics |
   | 5| /api/topic/{topic_num}| Get specific topic| GET| Get specific topic (Use path variable) |
   | 6| /api/topic| Resister topic| POST| Register new topic |
   | 7| /api/topic|Modify topic |PUT | Modify topic |
   | 8| /api/topic/{topic_num}|Delete topic | DELETE| Delete topic |
   | 9| /api/debates/{topic_num}| Get Debate List | GET| Get Debate list by topic|
   | 10| /api/debates| Resister Debate | POST| Register debate linked topic |
   | 11| /api/debates/{debate_id} | Delete Debate | DELETE | Delete specific debate |
   | 12| /api/debates| Modify Debate | PUT| Modify debate |
   | 13| /api/like/{debate_num}| Get Like and Unlike | GET | Get like list and unlike list |
   | 14| /api/like| Resister like | POST | Register like(Include delete) |
   | 15| /api/unlike| Resister unlike | POST |Register unlike (Include delete) |
