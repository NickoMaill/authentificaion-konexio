function cors(_req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, include");
    res.header('Access-Control-Allow-Credentials', true);
    next();
  }
module.exports = cors