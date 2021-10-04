import { mainDb } from "../../lib/database";
import CommentRepository from "./comment-repository";

class CommentController {
  constructor() {
    this.db = mainDb;
    this.repository = new CommentRepository();
  }

  createComment = async (req, res) => {
    try {
      const { body } = req;
      const session = req.user;
      await this.repository.createComment(this.db, session, body);
      return res.status(200).send({ message: "ok" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  deleteComment = async (req, res) => {
    try {
      await this.repository.deleteComment(this.db, req.params.id);
      return res.status(200).send({ message: "ok" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}

export default CommentController;
