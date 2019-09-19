
  a = 333

const PORT = process.env.PORT || 3000,
  http = require("http"),
  requestHandler = require("./requestHandler"),
  fs = require("fs"),
  path = require("path"),
  templatePath = path.join(__dirname, "indexTemplate.html"),

  mongoConnectStr = 'mongodb+srv://user1:N134bmOcJYMqRX4D' +
    '@cluster007-gphrw.gcp.mongodb.net/test?retryWrites=true&w=majority',
  MongoClient = require("mongodb").MongoClient,
  mongoClient = new MongoClient(mongoConnectStr,
    { useNewUrlParser: true, useUnifiedTopology: true })

// var template = "", count = 0, db, countColl

fs.readFile(templatePath, { encoding: 'utf-8' }, (err, html) =>
  template = html)

mongoClient.connect(async function (err, client) {
  if (err) { return console.log(err) }
  // тут взаимодействие с базой данных
  db = client.db("counter_db")
  countColl = db.collection("counter_coll")
  todoColl = db.collection("todos")
  console.log("dbconected")
  count = (await countColl.findOne({ id: 1 })).count
})
// objectToCreateServers = require('http')
// functionToHandleRequests = function (request, response) { ... }
// server = objectToCreateServers.createServer(functionToHandleRequests)
// server.listen(port)


http.createServer(requestHandler)
  .listen(PORT, () => console.log("Server started on port 3000"))


setInterval(function () {
  http.get("http://heruku-visit-counter.herokuapp.com/count")
}, 29 * 60000); // every 29 minutes 

