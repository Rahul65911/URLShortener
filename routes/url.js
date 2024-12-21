const express = require("express");
const { handleGenerateShortURL, handleGetIdRequest, handleGetAnalyticsReq } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateShortURL);

router.get("/:shortId", handleGetIdRequest);

router.get("/analytics/:shortId", handleGetAnalyticsReq)

module.exports = router;