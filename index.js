// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/1451001600000", function (req, res) {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});

app.get("/api/:date", function (req, res) {
  // If no date is passed, send current time
  if (!req.params.date) {
    const currentDate = new Date();
    res.json({
      unix: currentDate.toTimeString(),
      utc: currentDate.toTimeString(),
    });
  }

  // Check for date
  const newDate = req.params.date;
  const regEx =
    /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/gm;

  // If incorrect throw error
  if (!regEx.test(newDate)) {
    res.json({ error: "Invalid Date" });
  }

  // Otherwise send json
  else {
    const mydate = new Date(newDate);
    const dates = mydate.toDateString().split(" ");
    const time = mydate.toTimeString().split(" ");
    const string = `${dates[0]}, ${dates[2]} ${dates[1]} ${dates[3]} ${time[0]} GMT`;
    res.json({ unix: mydate.getTime(), utc: string });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
