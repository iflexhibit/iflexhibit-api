DROP VIEW IF EXISTS banned_users;

CREATE VIEW banned_users AS 
    SELECT 
        bans.ban_id,
        bans.target_id,
        (SELECT username FROM users WHERE users.user_id = bans.target_id) AS banned_user,
        bans.user_id,
        (SELECT username FROM users WHERE users.user_id = bans.user_id) AS complainee_username,
        bans.offense_id,
        offenses.offense_title,
        bans.created_at,
        bans.expires_at
    FROM bans
    JOIN offenses ON offenses.offense_id = bans.offense_id
    ORDER BY complainee_username ASC;

SELECT * FROM banned_users;