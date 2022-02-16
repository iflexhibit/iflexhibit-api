UPDATE users 
  SET usertype_id = 'ut4'
  WHERE users.user_id = $1 
  AND EXISTS(SELECT ban_id FROM bans WHERE bans.target_id = $1 AND 
  (SELECT expires_at FROM bans WHERE bans.target_id = $1 ORDER BY expires_at DESC LIMIT 1) > now());