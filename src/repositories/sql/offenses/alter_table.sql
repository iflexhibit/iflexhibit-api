ALTER TABLE offenses
ALTER COLUMN offense_title TYPE VARCHAR(50); 

ALTER TABLE offenses
ADD offense_code VARCHAR(3) NOT NULL UNIQUE;