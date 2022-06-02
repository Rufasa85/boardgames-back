const express = require('express');
const router = express.Router();

const userRoutes = require("./userController")
router.use("/api/users",userRoutes)

const gameRoutes = require("./gameController")
router.use("/api/games",gameRoutes)

const noteRoutes = require("./noteController")
router.use("/api/notes",noteRoutes)


module.exports = router;