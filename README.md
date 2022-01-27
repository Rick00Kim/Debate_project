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
   1. Authorize
      [EP: /api/auth, POST]
   2. Sign up
      [EP: /api/signup, POST]
   3. Get all users
      [EP: /api/users, GET]
   4. Get topic
      [EP: /api/topic, GET]
   5. Get specific topic
      [EP: /api/topic/{topic_num}, GET]
   6. Resister topic
      [EP: /api/topic, POST]
   7. Modify topic
      [EP: /api/topic, PUT]
   8. Delete topic
      [EP: /api/topic/{topic_num}, DELETE]
   9. Get Debate List
      [EP: /api/debates/{topic_num}, GET]
   10. Resister Debate
       [EP: /api/debates, POST]
   11. Delete Debate
       [EP: /api/debates/{debate_id}, DELETE]
   12. Modify Debate
       [EP: /api/debates, PUT]
   13. Get Like and Unlike
       [EP: /api/like/{debate_num}, GET]
   14. Resister like
       [EP: /api/like, POST]
   15. Resister unlike
       [EP: /api/unlike, POST]
