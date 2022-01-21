module.exports = app => {
  const { authJwt } = require("../middleware");
  const controller = require("../controllers/user.controller");

  var router = require("express").Router();

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/api/users/all", controller.all);

  router.get("/api/users/user", [authJwt.verifyToken], controller.user);

  router.get(
    "/api/users/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.mod
  );

  router.get(
    "/api/users/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.admin
  );

  app.use("/api/users", router);
};
