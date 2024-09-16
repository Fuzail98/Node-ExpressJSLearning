let express = require("express");
let app = express();
let bodyParser = require("body-parser")

require("dotenv").config()

const port = 3001
app.listen(port)

app.use("/public", express.static(__dirname + "/public"))
app.use("/name", bodyParser.urlencoded({extended: false}))

app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

app.get("/", function (req, res) {
  // res.send("Hello Express");
  const absolutePath = __dirname + '/views/index.html'
  res.sendFile(absolutePath)
});

app.get("/json", function (req,res) {
  const casing = process.env.MESSAGE_STYLE

  const response = "Hello json"
  if (casing.includes("uppercase")) {
    const response = "HELLO JSON"
    res.send({"message": response})
  }
  res.send({"message": response})
})

app.get('/now', function(req, res, next) {
  req.time = new Date().toString()
  next();
}, function(req, res) {
  res.send({time: req.time});
});

app.get("/:word/echo", function (req, res) {
  res.send({"echo": req.params.word});
});

app
  .route("/name")
  .get(function (req,res) {
    const {first, last} = req.query
    if (first && last) {
      res.send({"name": `${first} ${last}`})

    }
    res.send({"name": "BAD_REQUEST"})
  })
  .post(function(req, res) {
    const {first, last} = req.body
    if (first && last) {
      res.send({"name": `${first} ${last}`})

    }
    res.send({"name": "BAD_REQUEST"})
  })


module.exports = app;