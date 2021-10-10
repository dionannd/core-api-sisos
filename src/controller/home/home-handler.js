import { mainDb } from "../../lib/database";
import HomeRepository from "./home-repository";

class HomeController {
  constructor() {
    this.db = mainDb;
    this.repository = new HomeRepository();
  }

  getUserPosting = async (req, res) => {
    try {
      const { body } = req;
      const session = req.user;
      const data = await this.repository.getUserPosting(this.db, session, body);
      return res.status(200).send({ data });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}

export default HomeController;
