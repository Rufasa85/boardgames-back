const express = require("express");
const router = express.Router();
const { User, Game, Note } = require("../models");
const {withAuth} = require("../utils/tokenAuth")


router.get("/", (req, res) => {
  Game.findAll()
    .then((games) => {
      res.json(games);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
router.get("/:id", (req, res) => {
  Game.findByPk(req.params.id, {
    include: [Note],
  })
    .then((game) => {
      if (!game) {
        return res.status(404).json({ msg: "no record found!" });
      }
      res.json(game);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

router.post("/",withAuth, (req, res) => {
  //TODO: protecc route, get UserId from token
  console.log(req.user)
  Game.create({
      title:req.body.title,
      description:req.body.description,
      playerCount:req.body.playerCount,
      weight:req.body.weight,
      UserId:req.user
  })
    .then((newGame) => {
      res.json(newGame);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

router.put("/:id", withAuth,(req, res) => {
  Game.update(req.body, {
    where: {
      id: req.params.id,
      UserId:req.user
    },
  })
    .then((updatedGame) => {
      if (!updatedGame[0]) {
        return res.status(404).json({ msg: "no such game" });
      }
      res.json(updatedGame);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

router.delete("/:id", withAuth,(req, res) => {
  Game.destroy({
    where: {
      id: req.params.id,
      UserId:req.user
    },
  })
    .then((delGame) => {
      if (!delGame) {
        return res.status(404).json({ msg: "no such game" });
      }
      res.json(delGame);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

module.exports = router;
