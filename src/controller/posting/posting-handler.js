import { mainDb } from "../../lib/database";
import PostingRepository from "./posting-repository";

class PostingController {
  constructor() {
    this.db = mainDb;
    this.repository = new PostingRepository();
  }

  createPosting = async (req, res) => {
    try {
      const session = req.user;
      const { body } = req;
      const result = await this.repository.createPosting(
        this.db,
        session,
        body
      );

      return res.status(200).send({ message: "ok", data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  };
}

export default PostingController;
