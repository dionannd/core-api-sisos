import { mainDb } from "../../lib/database";
import LikeRepository from "./like-repository";

class LikeController {
  constructor() {
    this.db = mainDb;
    this.repository = new LikeRepository();
  }

  postingLike = async (req, res) => {
    try {
      const { body } = req;
      const session = req.user;
      await this.repository.postingLike(this.db, session, body);
      return res.status(200).send({ message: "ok" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  deletePostingLike = async (req, res) => {
    try {
      await this.repository.deletePostingLike(this.db, req.params.id, req.user);
      return res.status(200).send({ message: "ok" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  commentLike = async (req, res) => {
    try {
      const { body } = req;
      const session = req.user;
      await this.repository.commentLike(this.db, session, body);
      return res.status(200).send({ message: "ok" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  deleteCommentLike = async (req, res) => {
    try {
      await this.repository.deleteCommentLike(this.db, req.params.id);
      return res.status(200).send({ message: "ok" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}

export default LikeController;
