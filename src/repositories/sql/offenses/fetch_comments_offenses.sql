SELECT 
    offense_code, offense_title, ban_time, offense_id
FROM offenses
WHERE offense_type='c'
ORDER BY offense_code;