const testingRoutes = require("./testing");

module.exports = (app) => {
  app.use("/testing", testingRoutes);
};
