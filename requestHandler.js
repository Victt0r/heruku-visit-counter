async function requestHandler(request, response) {
  console.log(a)
  if (request.url == '/favicon.ico') return response.end('')

  if (request.url == '/') {
    const todoHTML = (await todoColl.find().toArray())
      .reduce((html, doc) => html + "<span>" + doc.todo + "</span><br>", "")
    countColl.updateOne({ id: 1 }, { $set: { count: ++count } })
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    return response.end(template.replace("${++count}", count)
      .replace("${todoHTML}", todoHTML))

  }

  if (request.url == '/count') {
    countColl.updateOne({ id: 1 }, { $set: { count: ++count } })
    return response.end(String(count))
  }

  if (request.url.startsWith('/addtodo')) {
    const todo = decodeURI(request.url.slice(9))
    todoColl.insertOne({ todo })
    return response.end("")
  }

  if (request.url.startsWith('/removetodo')) {
    const todo = decodeURI(request.url.slice(12))
    todoColl.deleteOne({ todo })
    return response.end("")
  }

  if (request.url.startsWith('/updtodo')) {
    const str = decodeURI(request.url.slice(9))
    const [oldTodo, todo] = str.split("/")
    todoColl.updateOne({ todo: oldTodo }, { $set: { todo } })
    return response.end("")
  }
  response.end(request.url + " is just wrong")
}
module.exports = requestHandler

