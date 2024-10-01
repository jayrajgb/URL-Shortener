const express = require('express')
const { handleGenerateUrl, handleGetUrl, handleGetAllUrls } = require('../controllers/url')

const urlRouter = express.Router();

urlRouter.route("/")
.get(handleGetAllUrls)
.post(handleGenerateUrl)

urlRouter.get("/:id", handleGetUrl)

module.exports = urlRouter;