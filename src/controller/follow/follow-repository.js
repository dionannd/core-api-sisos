class FollowRepository {
  async followUser(db, session, body) {
    try {
      body.user_id = session.id;
      return db.query(
        `
        insert into followings (followed_user_id, user_id)
        values ($<followed_user_id>, $<user_id>)
      `,
        body
      );
    } catch (error) {
      return error;
    }
  }

  async deleteFollowUser(db, followingId) {
    try {
      return db.query(
        `
        delete from followings where following_id = $1
      `,
        followingId
      );
    } catch (error) {
      return error;
    }
  }
}

export default FollowRepository;
