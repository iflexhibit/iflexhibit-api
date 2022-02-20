SELECT offense_title 
    FROM bans
    JOIN offenses ON bans.offense_id = offenses.offense_id
    WHERE target_id=4;