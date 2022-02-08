INSERT INTO bans (report_id, target_id, user_id, offense_id, ban_note, expires_at)
VALUES ($1, 
(SELECT target_user_id FROM reports WHERE report_id = $1), $2, $3, $4, 
(CASE
    WHEN (SELECT ban_time FROM offenses WHERE offenses.offense_id = $4) = '07' THEN now() + 'INTERVAL 7 days',
    ELSE now () + 'INTERVAL 14 days'
END))
RETURNING ban_id;

-- Syntax 
-- $1 ban_id
-- $2 user_id
-- $3 offense_id
-- $4 ban_note

INSERT INTO bans (report_id, target_id, user_id, offense_id, ban_note, expires_at)
VALUES (1, 
(SELECT target_user_id FROM reports WHERE report_id = 1), 8, 'U03', 'This issue is resolved once she has bought you a new tripod.', 
(CASE
    WHEN (SELECT ban_time FROM offenses WHERE offenses.offense_id = 'U03') = '07' THEN now() + INTERVAL '7 days'
    ELSE now () + INTERVAL '14 days'
END))
RETURNING ban_id;