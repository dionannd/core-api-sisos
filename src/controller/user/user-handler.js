import { mainDb } from "../../lib/database";
import UserRepository from "./user-repository";
import Bcrypt from "bcrypt";

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
      const result = await this.repository.uploadImage(this.db, session, body);
      return res.status(200).send({ message: "ok", result });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  getFollower = async (req, res) => {
    try {
      const userId = req.params.id;
      const result = await this.repository.getFollower(this.db, userId);
      return res.status(200).send({ result });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  updatePassword = async (req, res) => {
    try {
      const { body } = req;
      const session = req.user;
      const user = await this.db.oneOrNone(
        `
      select password from users where user_id = $1
      `,
        [req.user.id]
      );

      const comparePassword = Bcrypt.compareSync(body.password, user.password);
      if (!comparePassword) {
        return res.status(400).send({ message: "Password salah" });
      }

      if (body.password_new !== body.password_confirm) {
        return res
          .status(400)
          .send({ message: "Password konfirmasi tidak sama" });
      }

      // Create md5 for Password
      const salt = Bcrypt.genSaltSync(15);
      body.password_new = Bcrypt.hashSync(body.password_new, salt);

      await this.repository.updatePassword(this.db, session, body);
      return res.status(200).send({ message: "ok" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}

export default UserController;
