import { mainDb } from "../../lib/database";
import Bcrypt from "bcrypt";
import { generateToken } from "../../lib/generateToken";

class AuthController {
  constructor() {
    this.db = mainDb;
  }

  register = async (req, res) => {
    try {
      const { body } = req;
      // Check Email from DB
      const checkEmail = await this.db.oneOrNone(
        `
            SELECT email FROM users WHERE email = $1
        `,
        body.email
      );

      // Check Username from DB
      const checkUsername = await this.db.oneOrNone(
        `
            SELECT username FROM users WHERE username = $1
        `,
        body.username
      );

      // Check Email && Username if exists
      if (checkEmail) {
        return res.status(400).send({ message: "Email sudah terdaftar!" });
      } else if (checkUsername) {
        return res.status(400).send({ message: "Username sudah digunakan!" });
      }

      // Create md5 for Password
      const salt = Bcrypt.genSaltSync(15);
      body.password = Bcrypt.hashSync(body.password, salt);

      // Insert data to Database
      await this.db.query(
        `
        INSERT INTO users (username, email, password, profile_pic, bio ,created_at)
        VALUES ($<username>, $<email>, $<password>, null, null, NOW())
      `,
        body
      );
      return res.status(200).send({ message: "Berhasil mendaftarkan akun!" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { body } = req;

      // Check Email from DB
      const checkUser = await this.db.oneOrNone(
        `
                SELECT * FROM users WHERE email = $1
            `,
        body.email
      );
      // Check Email if not exists
      if (!checkUser) {
        return res.status(400).send({
          message: "Email yang anda masukan salah atau belum terdaftar!",
        });
      }
      const comparePassword = Bcrypt.compareSync(
        body.password,
        checkUser.password
      );
      if (!comparePassword) {
        return res
          .status(400)
          .send({ message: "Email atau Password yang anda masukan salah!" });
      }

      const token = await generateToken(checkUser);
      return res
        .status(200)
        .send({ message: "Login berhasil", user: checkUser, token });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
}

export default AuthController;
