const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const knex = require("../database");

router.get("/", async (req, res) => {
  try {
    const customer = await knex
      .queryBuilder()
      .select("*")
      .table("customers")
      .orderBy("checkin", "desc");
    res.send(customer);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", auth, async (req, res) => {
  const { name, asal, noid, identitas, durasi } = req.body;
  try {
    const receptionist = await knex("users").where("id", id);
    await knex("customers").insert({
      name,
      asal,
      noid,
      identitas,
      checkin: new Date().toISOString(),
      checkout: "-",
      ci_receptionist: receptionist[0].username,
      co_receptionist: "-",
      durasi,
      credit: parseInt(durasi) * 100000
    });
    res.status(200).json({ msg: "Checkin berhasil" });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", auth, async (req, res) => {
  const cid = req.params.id;
  try {
    const receptionist = await knex("users").where("id", id);
    if (receptionist.length < 1) {
      return res.status(400).json({ err: "Receptionist un authorized" });
    }
    const customer = await knex("customers")
      .where("id", cid)
      .update({
        checkout: new Date().toISOString(),
        co_receptionist: receptionist[0].username
      });
    // console.log(customer);
    if (customer === 0) {
      return res.status(400).json({ err: "Customer not found" });
    }
    res.status(200).json({ msg: "Checkout success" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
