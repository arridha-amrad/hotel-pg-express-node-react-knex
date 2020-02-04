const express = require("express");
const router = express.Router();
const knex = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { MY_CUSTOM_SECRET_KEY } = require("../../config");
const auth = require("../middleware/auth");
const uuidv4 = require("uuid/v4");

// get login user
router.get("/", auth, async (request, response) => {
  try {
    const data = await knex("users")
      .select("username", "email", "role")
      .where("id", id);
    response.send(data[0]);
  } catch (err) {
    console.log(err);
  }
});

router.post("/signup", async (req, res) => {
  let { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    await knex("users")
      .insert({
        id: uuidv4(),
        username: username,
        email: email,
        password,
        role: "receptionist",
        confirmed: false,
        resetpasswordlink: ""
      })
      .returning("*");
    res.status(200).json({
      msg: "Registrasi berhasil. Silahkan tunggu untuk konfirmasi email anda"
    });
  } catch (err) {
    console.log(err);
    if (err.code === "23505") {
      res.status(400).json({ msg: `Email ${email} sudah teregistrasi` });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await knex("users").where("email", email);
    // console.log(user[0]);
    if (!user) {
      res.status(400).json({ msg: "Email anda tidak teregistrasi" });
    } else if (user && user[0].confirmed === false) {
      res
        .status(400)
        .json({ msg: "Silahkan konfirmasi email anda terlebih dahulu" });
    } else {
      const match = await bcrypt.compare(password, user[0].password);
      if (!match) res.status(400).json({ msg: "Invalid email and password" });
      const token = jwt.sign(
        {
          id: user[0].id
        },
        MY_CUSTOM_SECRET_KEY,
        {
          expiresIn: 360000
        }
      );
      res.status(200).json({
        token
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
