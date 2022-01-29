module.exports = {
  fetchCommentOffenses: `
    SELECT 
        offense_id, offense_title, ban_time
    FROM offenses
    WHERE offense_type = 'c'
    ORDER BY offense_id;
    `,
  fetchPostOffenses: `
    SELECT 
        offense_id, offense_title, ban_time
    FROM offenses
    WHERE offense_type = 'p'
    ORDER BY offense_id;
    `,
  fetchUsersOffenses: `
    SELECT 
        offense_id, offense_title, ban_time
    FROM offenses
    WHERE offense_type = 'u'
    ORDER BY offense_id;
    `,
};
