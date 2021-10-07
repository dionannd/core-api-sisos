class LikeRepository {
  async postingLike(db, session, body) {
    try {
      body.user_id = session.id;
      return db.query(
        `
        insert into likes (user_id, post_id, created_at)
        values ($<user_id>, $<post_id>,  now())
      `,
        body
      );
    } catch (error) {
      return error;
    }
  }

  async deletePostingLike(db, likeId) {
    try {
      return db.query(
        `
        delete from likes where like_id = $1
      `,
        likeId
      );
    } catch (error) {
      return error;
    }
  }

  async commentLike(db, session, body) {
    try {
      body.user_id = session.id;
      return db.query(
        `
        insert into likes (user_id, comment_id, created_at)
        values ($<user_id>, $<comment_id>, now())
      `,
        body
      );
    } catch (error) {
      return error;
    }
  }

  async deleteCommentLike(db, likeId) {
    try {
      return db.query(
        `
        delete from likes where like_id = $1
      `,
        likeId
      );
    } catch (error) {
      return error;
    }
  }
}

export default LikeRepository;
