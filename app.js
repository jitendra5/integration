var express = require('express');
const zipRoute = require('./routes/subjectvisit');
var cors = require('cors')

var app = express();
app.use(express.json());
//app.use(cors())

const corsOptions = {
    //To allow requests from client
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1",
      "http://104.142.122.231",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  };

  
app.use('/', cors(corsOptions), zipRoute);
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});