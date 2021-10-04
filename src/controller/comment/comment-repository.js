class CommentRepository {
  async createComment(db, session, body) {
    try {
      body.user_id = session.id;
      return db.query(
        `
        insert into comments (post_id, user_id, content, created_at )
        values ($<post_id>, $<user_id>, $<content>, now())
      `,
        body
      );
    } catch (error) {
      return error;
    }
  }

  async deleteComment(db, commentId) {
    try {
      return db.query(
        `
        delete from comments where comment_id = $1
      `,
        commentId
      );
    } catch (error) {
      return error;
    }
  }
}

export default CommentRepository;
