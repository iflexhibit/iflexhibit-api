SELECT * FROM users
JOIN usertypes ON users.usertype_id=usertypes.usertype_id WHERE user_id=$1;