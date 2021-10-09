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

  async searchUser(db, session) {
    try {
      const { q } = session.query;
      let where = "";
      let bindParams = {};
      if (q && q.length > 0) {
        where += ` where ((email ~* $<q> or username ~* $<q>))`;
        bindParams = { ...bindParams, q };
      }
      const result = await db.query(
        `
        select * from users
        ${where}
      `,
        bindParams
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  async searchUserFollow(db, session) {
    try {
      const { q } = session.query;
      let where = "";
      let bindParams = {
        user_id: session.user.id,
      };
      if (q && q.length > 0) {
        where += ` and ((username ~* $<q>))`;
        bindParams = { ...bindParams, q };
      }
      const result = await db.query(
        `
        select u.username, u.email
        from users u 
        where user_id in (select followed_user_id
        from followings f
        where user_id = $<user_id>)
        ${where}
      `,
        bindParams
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  async searchUserFollowed(db, session) {
    try {
      const { q } = session.query;
      let where = "";
      let bindParams = {
        user_id: session.user.id,
      };
      if (q && q.length > 0) {
        where += ` and ((username ~* $<q>))`;
        bindParams = { ...bindParams, q };
      }
      const result = await db.query(
        `
        select u.username, u.email 
        from users u 
        where user_id in (select user_id 
        from followings f
        where followed_user_id = $<user_id>)
        ${where} 
    `,
        bindParams
      );
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default UserRepository;
