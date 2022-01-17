SELECT 
	users.user_id,
	usertypes.usertype_title,
	users.username,
	users.given_name,
	users.family_name,
	users.email,
	users.contact,
	users.avatar_image,
	users.bio,
	users.show_name
	users_show_email,
	users.show_contact,
	permissions.submit_post,
	permissions.comment_post,
	permissions.moderator_access,
	permissions.admin_access,
	users.created_at
FROM usertypes
RIGHT JOIN users ON usertypes.usertype_id = users.usertype_id
INNER JOIN permissions ON usertypes.permission_id = permissions.permission_id
WHERE users.user_id = $1;

-- Status: In Progress