const express = require("express");
const router = express.Router();
const knex = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const uuidv4 = require("uuid/v4");
const { generateToken } = require("../helper");

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
    // console.log(user);
    if (user.length < 1) {
      return res.status(400).json({ msg: "Email anda tidak teregistrasi" });
    } else if (user && user[0].confirmed === false) {
      return res
        .status(400)
        .json({ msg: "Silahkan konfirmasi email anda terlebih dahulu" });
    } else {
      const match = await bcrypt.compare(password, user[0].password);
      if (!match)
        return res.status(400).json({ msg: "Invalid email and password" });
      const token = generateToken(user[0].id);
      res.status(200).json({
        token
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
