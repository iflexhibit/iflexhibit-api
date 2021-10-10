SELECT
    user_id,
    CASE WHEN show_name=FALSE THEN NULL
        ELSE given_name,
    CASE WHEN permission_id=0 THEN 'member'
         WHEN permission_id=1 THEN 'moderator'
         WHEN permission_id=2 THEN 'administrator'
         WHEN permission_id=3 THEN 'banned'
        ELSE,
    username,
    CASE WHEN show_name=FALSE THEN NULL
        ELSE given_name,
    CASE WHEN show_name=FALSE THEN NULL
        ELSE family_name, 
    CASE WHEN show_email=FALSE THEN NULL
        ELSE email,
    CASE WHEN show_contact=FALSE THEN NULL
        ELSE contact,
    avatar_image,
    background_image,
    created_at
FROM users, usertypes WHERE user_id=$1;