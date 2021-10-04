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
}

export default UserRepository;
