SELECT 
    offense_id, offense_title, ban_time
FROM offenses
WHERE offense_type = 'u'
ORDER BY offense_id;