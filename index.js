var count = 0
require("http").createServer(
  (request, response) => {
    if (request.url == '/favicon.ico') return response.end('')
    if (request.url == '/') 
      return response.end(`You are the visitor number ${++count}.`)
    if (request.url == '/count') return response.end(String(++count))
  }
).listen(3000)

