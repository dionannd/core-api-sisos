class PostingRepository {
  async createPosting(db, session, body) {
    try {
      body.user_id = session.id;
      const result = await db.query(
        `
        insert into user_posts(user_id, content, created_at)
        values ($<user_id>, $<content>, now())
        returning *
      `,
        body
      );

      return Promise.resolve(result[0]);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}

export default PostingRepository;
