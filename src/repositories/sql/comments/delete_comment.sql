UPDATE comments SET is_deleted=TRUE WHERE comment_id=$1 AND user_id=$2 RETURNING comment_id;

-- NEW

DELETE FROM comments WHERE comment_id=$1 AND user_id=$2 RETURNING comment_id;