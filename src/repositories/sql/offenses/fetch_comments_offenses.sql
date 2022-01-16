SELECT 
    offense_id, offense_title, ban_time
FROM offenses
WHERE offense_type='c'
ORDER BY offense_code;