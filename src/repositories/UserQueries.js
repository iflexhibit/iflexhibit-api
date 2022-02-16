module.exports = {
  create:
    "INSERT INTO users (username, given_name, family_name, email) VALUES ($1,$2,$3,$4) RETURNING user_id",
  fetchEmailOne: "SELECT user_id FROM users WHERE email LIKE $1",
  fetchProfile: `
    SELECT
        user_id,
        B.usertype_title,
        username,
        CASE WHEN show_name = FALSE THEN NULL
            ELSE given_name END,
        CASE WHEN show_name = FALSE THEN NULL
            ELSE family_name END,
        CASE WHEN show_email = FALSE THEN NULL
            ELSE email END,
        CASE WHEN show_contact = FALSE THEN NULL
            ELSE contact END,
        A.avatar_image,
        A.background_image,
        A.bio,
        show_name,
        show_email,
        show_contact,
        (SELECT SUM (likes_count) 
        FROM posts
        WHERE posts.user_id = $1) AS likes_received,
        (SELECT SUM (views_count)
        FROM posts 
        WHERE posts.user_id = $1) AS views_received,
        A.created_at
    FROM users A INNER JOIN usertypes B
    ON A.usertype_id = B.usertype_id WHERE user_id = $1;
    `,
  insertComment: `INSERT INTO comments (user_id, post_id, comment_body)
      VALUES ($1, $2, $3)
      RETURNING comment_id;`,
  updatePreferences: `
      UPDATE users
      SET
          show_name = $1,
          show_contact = $2,
          show_email = $3,
          updated_at = NOW()
      WHERE user_id = $4
      RETURNING user_id;
      `,
  updateProfile: `
      UPDATE users
      SET
          username = $1,
          contact = $2,
          bio = $3,
          updated_at = NOW()
      WHERE user_id = $4
      RETURNING user_id;
      `,
  fetchMe: `
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
  `,
  updateAvatar: `
    UPDATE users
    SET
        avatar_image = $1,
        updated_at = NOW()
    WHERE user_id = $2
    RETURNING user_id;
  `,
  updateBackground: `
    UPDATE users 
    SET 
        background_image = $1,
        updated_at = NOW()
    WHERE user_id = $2
    RETURNING user_id;
  `,
  deleteComment: `
    UPDATE comments SET is_deleted=TRUE WHERE comment_id=$1 AND user_id=$2 RETURNING comment_id;
  `,
  updateUsertype: `UPDATE users SET usertype_id = 'ut1' WHERE users.user_id = $1 AND NOT EXISTS(SELECT ban_id FROM bans WHERE bans.target_id = $1 AND (SELECT expires_at FROM bans WHERE bans.target_id = $1 ORDER BY expires_at DESC LIMIT 1) > now());`,
  updateBan: `UPDATE users 
  SET usertype_id = 'ut4'
  WHERE users.user_id = $1 
  AND EXISTS(SELECT ban_id FROM bans WHERE bans.target_id = $1 AND 
  (SELECT expires_at FROM bans WHERE bans.target_id = $1 ORDER BY expires_at DESC LIMIT 1) > now());`,
};
