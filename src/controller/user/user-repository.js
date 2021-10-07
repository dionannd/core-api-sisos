class UserRepository {
  async editUser(db, session, body) {
    try {
      body.user_id = session.id;
      const result = await db.query(
        `
        update users set email = $<email>, username = $<username>, bio = $<bio> where user_id = $<user_id>
        returning *
      `,
        body
      );
      return result[0];
    } catch (error) {
      return error;
    }
  }

  async getFollower(db, userId) {
    try {
      const result = await db.one(
        `
        select username, 
        (select count(*) from followings f where f.user_id = $1) as total_following,
        (select count(*) from followings f where f.followed_user_id = $1) as total_follower
        from users u 
        where user_id = $1
      `,
        userId
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  async uploadImage(db, session, body) {
    try {
      body.user_id = session;
      body.profil_pic = req.file ? req.file.filename : null;
      if (req.file) {
        const result = await db.query(
          `
          update users set profil_pic = $<profil_pic> where user_id = $<user_id>
          RETURNING *
        `,
          body
        );
        return result;
      }
    } catch (error) {
      return error;
    }
  }

  async updatePassword(db, session, body) {
    try {
      body.user_id = session.id;
      const result = await db.one(
        `
      update users set password = $<password_new>
      where user_id = $<user_id>
      returning *
      `,
        body
      );
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default UserRepository;
