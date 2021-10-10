class HomeRepository {
  async getUserPosting(db, session, body) {
    try {
      body.user_id = session.id;
      const result = await db.query(
        `
        select * from user_posts up 
        where user_id in (
        select user_id from followings f
        where followed_user_id = $<user_id>)
      `,
        body
      );
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default HomeRepository;
