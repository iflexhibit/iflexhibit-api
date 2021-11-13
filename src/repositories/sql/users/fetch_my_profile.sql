SELECT user_id,
    usertype_title,
    username,
    given_name,
    family_name,
    email,
    contact,
    avatar_image,
    background_image,
    bio,
    show_name,
    show_email,
    show_contact,
    A.created_at
FROM users
A INNER JOIN usertypes B ON A.usertype_id=B.usertype_id
WHERE user_id=$1;
