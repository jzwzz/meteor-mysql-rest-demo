
Demo = Meteor + MySQL + REST API + Express

fuction
===============================
  1. add mysql by npm (No reactive)

  2. add nimble:restivus by hand , direct modify ./meteor/packages

  3. Use Meteor.wrapAsync(asyncFunc) for sync return mysql search result

  4. use express npm for static pages

config mysql
-----------------------
    app/server/serverapi.js
    app/server/abc.js






access url:
------------------------
  rest api:
  --------------------------
      http://localhost:3000/api/articles/1

  static pages:
  --------------------------
      http://localhost:8081/index0.html

      http://localhost:8081/index1.html

      http://localhost:8081/


QA:
=====================================

  if has error with npm-bcrypt
  add npm-bcrypt@0.8.6_1 in .meteor/release



TODOs:
====================================
