import { mainDb } from "../../lib/database";
import UserRepository from "./user-repository";

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
}

export default UserController;
