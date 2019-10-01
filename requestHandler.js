async function requestHandler(request, response) {
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
  if (request.url == '/favicon.ico') return response.end('')

  if (request.url == '/') {
    const todoHTML = (await todoColl.find().toArray())
      .reduce((html, doc) => html + "<span>" + doc.todo + "</span><br>", "")
    countColl.updateOne({ id: 1 }, { $set: { count: ++count } })
    return response.end(template.replace("${++count}", count)
      .replace("${todoHTML}", todoHTML))
  }

  if (request.url == '/endeavors') {
    const endsPath = require("path").join(__dirname, "endeavors.html")
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    require("fs").readFile(endsPath, { encoding: 'utf-8' }, (err, html) => {
      if (err) { return console.log(err) }
      response.end(html)
    })
    return
  }

  if (request.url.startsWith('/api/')) {
    request.url = request.url.replace("/api", "")
    if (request.url == '/count') {
      countColl.updateOne({ id: 1 }, { $set: { count: ++count } })
      db.collection("logs").insertOne({date: new Date})
      return response.end(String(count))
    }
    if (request.url.startsWith('/todo/')) {
      request.url = request.url.replace("/todo", "")
      
      if (request.url.startsWith('/add')) {
        const todo = decodeURI(request.url.slice(5))
        todoColl.insertOne({ todo })
        return response.end("")
      }
      
      if (request.url.startsWith('/remove')) {
        const todo = decodeURI(request.url.slice(8))
        todoColl.deleteOne({ todo })
        return response.end("")
      }
      
      if (request.url.startsWith('/update')) {
        const str = decodeURI(request.url.slice(8))
        const [oldTodo, todo] = str.split("/")
        todoColl.updateOne({ todo: oldTodo }, { $set: { todo } })
        return response.end("")
      }
    }
    if (request.url.startsWith('/endeavor/')) {
      request.url = request.url.replace("/endeavor", "")
      if (request.url == '/add'){
        const name = decodeURI(request.headers.endeavor)
        const details = decodeURI(request.headers.details)
        const deadline = request.headers.deadline
        db.collection("endeavors")
          .insertOne({name, details, deadline}, (err, doc)=> 
            response.end(doc.insertedId.toString()))
        return 
      }

      if (request.url == '/get'){
        const endevGet = (await db.collection("endeavors").find().toArray())
        return response.end(JSON.stringify(endevGet))
      }

      if (request.url == '/update'){
        const name = decodeURI(request.headers.endeavor)
        const details = decodeURI(request.headers.details)
        const deadline = request.headers.deadline
        db.collection("endeavors").updateOne({_id: require("mongodb")
          .ObjectID(request.headers.id)}, {$set: {name, details, deadline}},
            (err, result)=> {
              if (result.modifiedCount) 
                response.end(JSON.stringify({success:1}))
              else response.end(JSON.stringify({success:0}))
            }
          )
        return 
      }

      if (request.url == '/delete') {
        db.collection("endeavors")
          .deleteOne({_id: require("mongodb").ObjectID(request.headers.id)},
            (err, resp)=> {
              if (resp || resp == undefined && err == undefined) 
                response.end(JSON.stringify({success:1}))
              else response.end(JSON.stringify({success:0}))
            }
          )
        return
      }
    }

  }
  response.end(request.url + " is just wrong")
}

module.exports = requestHandler

