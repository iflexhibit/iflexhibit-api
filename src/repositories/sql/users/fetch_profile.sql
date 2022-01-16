SELECT user_id,
B.usertype_title,
username,
CASE WHEN show_name = FALSE THEN NULL
        ELSE given_name
        END,
    CASE WHEN show_name = FALSE THEN NULL
        ELSE family_name
        END,
    CASE WHEN show_email = FALSE THEN NULL
        ELSE email
        END,
    CASE WHEN show_contact = FALSE THEN NULL
        ELSE contact
       END,
    A.avatar_image,
    A.background_image,
    A.bio,
    show_name,
    show_email,
    show_contact,
    A.created_at
FROM users
A INNER JOIN usertypes B ON A.usertype_id = B.usertype_id WHERE user_id = $1;
