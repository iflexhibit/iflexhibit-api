module.exports = {
  create:
    "INSERT INTO users (username, given_name, family_name, email) VALUES ($1,$2,$3,$4) RETURNING user_id",
  fetchEmailOne: "SELECT user_id FROM users WHERE email LIKE $1",
  fetchProfile: `SELECT user_id,
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
      A INNER JOIN usertypes B ON A.usertype_id=B.usertype_id WHERE user_id=$1;
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
  fetchMyProfile: `
    SELECT
        user_id,
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
  `,
};
