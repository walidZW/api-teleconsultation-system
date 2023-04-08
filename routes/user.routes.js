const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/all", controller.allAccess);

  app.get("/patient", [authJwt.verifyToken], controller.patientBoard);

  app.get(
    "/doctor",
    [authJwt.verifyToken, authJwt.isDoctor],
    controller.doctorBoard
  );

  app.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};