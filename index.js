var count = 0
const PORT = process.env.PORT || 3000
const http = require("http")

mongoConnectStr = 'mongodb+srv://user1:N134bmOcJYMqRX4D@cluster007-gphrw.gcp.mongodb.net/test?retryWrites=true&w=majority'

var db, coll

const MongoClient = require("mongodb").MongoClient
const mongoClient = new MongoClient(mongoConnectStr, { useNewUrlParser: true });
mongoClient.connect(async function (err, client) {

  if (err) {
    return console.log(err);
  }
  // тут взаимодействие с базой данных
  db = client.db("counter_db")
  coll = db.collection("counter_coll")
  count = (await coll.findOne({ id: 1 })).count

})

http.createServer(
  (request, response) => {
    if (request.url == '/favicon.ico') return response.end('')
    if (request.url == '/') {
      response.end(`You are the visitor number ${++count}.`)
      coll.updateOne({ id: 1 }, { $set: { count: count } })
    }
    if (request.url == '/count') {
      response.end(String(++count))
      coll.updateOne({ id: 1 }, { $set: { count: count } })
    }

  }
).listen(PORT)



setInterval(function () {
  http.get("http://heruku-visit-counter.herokuapp.com/count")
}, 29 * 60000); // every 29 minutes 
