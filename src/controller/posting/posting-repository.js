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
        post_id, content, image, u.user_id, u.profil_pic, u.username,
        (select count(*) from likes l where l.post_id = up.post_id) as total_like,
        (select count(*) from "comments" c where c.post_id = up.post_id) as total_comment,
        (select 
          case when count(*) > 0 then true else false end
        from likes l where l.post_id = up.post_id and l.user_id = $1
        ) as has_you_like,
        up.created_at
      from
        user_posts up
        left join users u on u.user_id = up.user_id
      where
       up.user_id in (
        select
          followed_user_id
        from
          followings f
        where
          user_id = $1
      ) or up.user_id = $1
      order by created_at desc
    `,
      session
    );
  }

  async getDetailPosting(db, postId) {
    try {
      const detail = await db.oneOrNone(
        `
      select u.username, u.profil_pic, up.content, up.created_at, up.post_id
      from user_posts up
      join users u on u.user_id = up.user_id
      where post_id = $1
    `,
        postId
      );

      const comments = await db.query(
        `
        select comment_id, u.username, u.profil_pic, c.content, c.user_id, 
          c.created_at, c.user_id, c.post_id
        from comments c
        join users u on u.user_id = c.user_id
        where post_id = $1 order by c.created_at desc
      `,
        postId
      );
      console.log(detail, comments);
      return { detail, comments };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default PostingRepository;
