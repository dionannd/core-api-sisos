class PostingRepository {
  async createPosting(db, session, body, file) {
    try {
      body.user_id = session.id;
      const result = await db.one(
        `
        insert into user_posts(user_id, content, created_at)
        values ($<user_id>, $<content>, now())
        returning post_id
      `,
        body
      );

      if (file) {
        body.image = file ? file.filename : null;
        body.post_id = result.post_id;
        await db.query(
          `update user_posts set image = $<image> where post_id = $<post_id>`,
          body
        );
      }

      return Promise.resolve(result);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async getPosting(db, session) {
    return db.query(
      `
      select
        *,
        (select count(*) from likes l where l.post_id = up.post_id) as total_like,
        (select count(*) from "comments" c where c.post_id = up.post_id) as total_comment
      from
        user_posts up
      where
        user_id in (
        select
          followed_user_id
        from
          followings f
        where
          user_id = $1
      )
    `,
      session
    );
  }
}

export default PostingRepository;
