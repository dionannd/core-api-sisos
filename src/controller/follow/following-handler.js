import { mainDb } from "../../lib/database";
import FollowRepository from "./follow-repository";

class FollowController {
  constructor() {
    this.db = mainDb;
    this.repository = new FollowRepository();
  }

  followUser = async (req, res) => {
    try {
      const { body } = req;
      const session = req.user;
      await this.repository.followUser(this.db, session, body);
      res.status(200).send({ message: "ok" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  deleteFollowUser = async (req, res) => {
    try {
      await this.repository.deleteFollowUser(this.db, req.params.id);
      return res.status(200).send({ message: "ok" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}

export default FollowController;
