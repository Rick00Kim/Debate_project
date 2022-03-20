#!/bin/bash
set -e

echo ">>>>>>> trying to create database and users"
if \
[ -n "${MONGO_INITDB_ROOT_USERNAME:-}" ] && \
[ -n "${MONGO_INITDB_ROOT_PASSWORD:-}" ] && \
[ -n "${TARGET_DATABASE:-}" ] && \
[ -n "${TARGET_USERNAME:-}" ] && \
[ -n "${TARGET_PASSWORD:-}" ]; then
mongo -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD <<EOF
db=db.getSiblingDB('$TARGET_DATABASE');
use $TARGET_DATABASE;
db.createUser({
  user: '$TARGET_USERNAME',
  pwd: '$TARGET_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$TARGET_DATABASE'
  }]
});
db.user_info.insert({ "_id" : 0, "email" : "admin@admin.com", "password" : "$2b$12$tnF0CpdL2N9HjVQ94q1Vu.iLJlbrYStyLck3Y0wTngUDHJDclCL2y", "name" : "ADMIN", "role" : "Manager", "temporary_password" : true, "del_flg" : "0" })
EOF
else
    echo "Not exists environment variables..."
    exit 403
fi
