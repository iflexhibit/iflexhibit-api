INSERT INTO bans (report_id, target_id, user_id, offense_id, ban_note, expires_at)
VALUES ($1, 
(SELECT target_user_id FROM reports WHERE report_id = $1), $2, $3, $4, 
(SELECT now() + concat((SELECT ban_time FROM offenses WHERE offense_id = $3), ' days')::INTERVAL))
RETURNING ban_id;

-- Syntax 
-- $1 ban_id
-- $2 user_id
-- $3 offense_id
-- $4 ban_note

INSERT INTO bans (report_id, target_id, user_id, offense_id, ban_note, expires_at)
VALUES ($1, 
(SELECT target_user_id FROM reports WHERE report_id = $1), $2, $3, $4, 
(SELECT now() + concat((SELECT ban_time FROM offenses WHERE offense_id = $3), ' days')::INTERVAL))
RETURNING ban_id;