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
        // take headers
        // const name = decodeURI(request.headers.endeavor)
        // const details = decodeURI(request.headers.details)
        // const deadline = request.headers.deadline
        const { name, details, deadline } = 
          JSON.parse(decodeURI(request.headers.pkg))
        // db request
        db.collection("endeavors").insertOne({name, details, deadline}, 
          // db response callback
          (err, doc)=> {
            if (err) console.log(err)
            response.end(doc.insertedId.toString())
          }
        )
        return 
      }

      if (request.url == '/get'){
        // db request
        db.collection("endeavors").find({}, 
          // db response callback
          (err, cur)=> {
            if (err) console.log(err)
            cur.toArray().then(arr=> response.end(JSON.stringify(arr)))
          }
        )
        return
      }

      if (request.url == '/update'){
        // ***handle({head: {name: "endeavor", details: ""}})
        // take headers
        // const name = decodeURI(request.headers.endeavor)
        // const details = decodeURI(request.headers.details)
        // const deadline = request.headers.deadline
        // const id = request.headers.id
        const { name, details, deadline, id } = 
          JSON.parse(decodeURI(request.headers.pkg))
        const _id = require("mongodb").ObjectID(id)
        // db request
        db.collection("endeavors")
          .updateOne({_id}, {$set: {name, details, deadline}},
            // db response callback
            (err, result)=> {
              if (err) console.log(err)
              if (result.modifiedCount) 
                response.end(JSON.stringify({success:1}))
              else response.end(JSON.stringify({success:0}))
            }
          )
        return 
      }

      if (request.url == '/delete') {
        // take headers
        // const id = request.headers.id
        const { id } = JSON.parse(decodeURI(request.headers.pkg))
        const _id = require("mongodb").ObjectID(id)
        // db request
        db.collection("endeavors")
          .deleteOne({_id},
            // db response callback
            (err, resp)=> {
              if (err) console.log(err)
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

