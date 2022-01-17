SELECT 
	users.user_id,
	usertypes.usertype_title,
	users.username,
	users.given_name,
	users.family_name,
	users.email,
	users.contact,
	users.avatar_image,
	users.background_image,
	users.bio,
	users.show_name,
	users.show_email,
	users.show_contact,
	permissions.submit_post,
	permissions.comment_post,
	permissions.moderator_access,
	permissions.admin_access,
	users.created_at,
	users.updated_at
FROM usertypes
RIGHT JOIN users ON usertypes.usertype_id = users.usertype_id
INNER JOIN permissions ON usertypes.permission_id = permissions.permission_id
WHERE users.user_id = $1;

-- Syntax ($1) user_id

-- Status: For Testing 1-17-22
-- As seen in the code, this particular code might be moved to /usertypes since it both requires ID's 
-- from /permissions and /users