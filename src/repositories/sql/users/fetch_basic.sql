SELECT user_id,
B.usertype_title,
username,
A.avatar_image,
A.created_at
FROM users
A INNER JOIN usertypes B ON A.usertype_id=B.usertype_id WHERE user_id=$1;