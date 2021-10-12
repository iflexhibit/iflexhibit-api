SELECT * FROM users
JOIN usertypes ON users.usertype_id=usertypes.usertype_id WHERE user_id=$1;

SELECT user_id,
B.usertype_title,
username,
CASE WHEN show_name=FALSE THEN NULL
        ELSE given_name
        END,
CASE WHEN show_name=FALSE THEN NULL
        ELSE family_name
        END,
CASE WHEN show_email=FALSE THEN NULL
        ELSE email
        END,
CASE WHEN show_contact=FALSE THEN NULL
        ELSE contact
       END
FROM users
A INNER JOIN usertypes ON A.usertype_id=B.usertype_id WHERE user_id=$1;