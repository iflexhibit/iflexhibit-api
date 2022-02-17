DROP VIEW IF EXISTS total_rows;

CREATE VIEW total_rows AS 
    SELECT
    (
        (SELECT COUNT(*) FROM bans) +
        (SELECT COUNT(*) FROM comments) +
        (SELECT COUNT(*) FROM offenses) +
        (SELECT COUNT(*) FROM permissions) +
        (SELECT COUNT(*) FROM posts) +
        (SELECT COUNT(*) FROM poststatus) +
        (SELECT COUNT(*) FROM reports) +
        (SELECT COUNT(*) FROM session) +
        (SELECT COUNT(*) FROM userpost) +
        (SELECT COUNT(*) FROM users) +
        (SELECT COUNT(*) FROM usertypes)
    ) as total_rows

SELECT * FROM total_rows;