const express = require("express");
const {URL} = require("../models/url");
const { restrictTo } = require("../middleware/auth");

const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
    const urls = await URL.find({});
    res.render("home", {urls})
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const urls = await URL.find({ createdBy: req.user.id });
    res.render("home", {urls});
});

router.get("/signup", async (req, res) => {
    res.render("signup");
});

router.get("/login", async (req, res) => {
    res.render("login");
});

module.exports = router;