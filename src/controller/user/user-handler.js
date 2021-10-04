import { mainDb } from "../../lib/database";
import UserRepository from "./user-repository";
import fs from "fs";

class UserController {
  constructor() {
    this.db = mainDb;
    this.repository = new UserRepository();
  }

  editUser = async (req, res) => {
    try {
      const { body } = req;
      const session = req.user;
      const result = await this.repository.editUser(this.db, session, body);
      return res.status(200).send({ message: "ok", result });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  uploadImage = async (req, res) => {
    try {
      const { body } = req;
      const session = req.user.id;
      body.user_id = session;
      body.profil_pic = req.file ? req.file.filename : null;

      if (req.file) {
        await this.db.query(
          `
          update users set profil_pic = $<profil_pic> where user_id = $<user_id>
          RETURNING *
        `,
          body
        );
      }

      return res.status(200).send({ message: "ok" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}

export default UserController;
