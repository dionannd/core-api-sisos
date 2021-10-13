import { mainDb } from "../../lib/database";
import PostingRepository from "./posting-repository";

class PostingController {
  constructor() {
    this.db = mainDb;
    this.repository = new PostingRepository();
  }

  getUserPosting = async (req, res) => {
    try {
      const session = req.user.id;
      const result = await this.repository.getPosting(this.db, session);
      const mapResult = result.map((item) => {
        return {
          ...item,
          profil_pic: `http://localhost:8000/image/${item.profil_pic}`,
          image: `http://localhost:8000/image_posting/${item.image}`,
        };
      });
      return res.status(200).send({ data: mapResult });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  createPosting = async (req, res) => {
    try {
      const session = req.user;
      const { body, file } = req;
      const result = await this.repository.createPosting(
        this.db,
        session,
        body,
        file
      );

      return res.status(200).send({ message: "ok", data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  };

  getDetail = async (req, res) => {
    try {
      const { id } = req.params;
      const { detail, comments } = await this.repository.getDetailPosting(
        this.db,
        id
      );
      detail.profil_pic = `http://localhost:8000/image/${detail.profil_pic}`;
      const mapComments = comments.map((item) => {
        return {
          ...item,
          profil_pic: `http://localhost:8000/image/${item.profil_pic}`,
        };
      });
      return res.status(200).send({ detail, comments: mapComments });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}

export default PostingController;
