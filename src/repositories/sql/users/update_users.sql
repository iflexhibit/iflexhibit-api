UPDATE users 
SET usertype_id = 'ut1'
WHERE users.user_id = $1 
                AND EXISTS(SELECT ban_id 
                    FROM bans WHERE bans.target_id = $1 AND 
                    (SELECT expires_at FROM bans WHERE bans.target_id = $1) > now());

-- Syntax
-- $1 user_id

UPDATE users 
SET usertype_id = 'ut1'
WHERE users.user_id = 11 
                AND EXISTS(SELECT ban_id 
                    FROM bans WHERE bans.target_id = 11 AND 
                    (SELECT expires_at FROM bans WHERE bans.target_id = 11) > now());