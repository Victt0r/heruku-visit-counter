module.exports = async function (request, response) {
  
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
    require("fs").readFile(endsPath, { encoding: 'utf-8' }, (err, html) => {
      if (err) { return console.log(err) }
      response.end(html)
    })
    return
  }

  if (request.url == '/activities') {
    const endsPath = require("path").join(__dirname, "activities.html")
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
        handle("endeavors", "insertOne", ["name", "details", "deadline"], doc=> 
          end({id: doc.insertedId.toString()}))
        return 
      }

      if (request.url == '/get'){
        handle("endeavors", "find", [], 
          cur=> cur.toArray().then(arr=> end(arr)))
        return
      }

      if (request.url == '/update'){
        handle("endeavors", "updateOne", ["_id"], 
          ["name", "details", "deadline"], result=> {
          if (result.modifiedCount) endOk()
          else endFail()
          })
        return 
      }

      if (request.url == '/delete') {
        handle("endeavors", "deleteOne", ["_id"], (resp, err)=> {
          if (resp || resp === undefined && err === undefined) endOk()
          else endFail()
        })
        return
      }
    }

    if (request.url.startsWith('/activity/')) {
      request.url = request.url.replace("/activity", "")

      if (request.url == '/add'){ 
        handle("activities", "insertOne", ["name", "measure", "diff"], doc=> 
          end({id: doc.insertedId.toString()}))
        return 
      }

      if (request.url == '/get'){
        handle("activities", "find", [], cur=> cur.toArray().then(arr=> end(arr)))
        return
      }

      if (request.url == '/update'){
        handle("activities", "updateOne", ["_id"], ["name", "measure", "diff"],
          result=> result.modifiedCount? endOk() : endFail())
        return 
      }

      if (request.url == '/delete') {
        handle("activities", "deleteOne", ["_id"], (resp, err)=>
          (resp || resp === undefined && err === undefined)? endOk() : endFail()
        )
        return
      }
    }
// Quests
// add quests
    if (request.url.startsWith('/quest/')) {
      request.url = request.url.replace("/quest", "")
      if (request.url == '/add') {
        const pkg = JSON.parse(decodeURI(request.headers.pkg))
        const quest = {...pkg}
        pkg._id = require("mongodb").ObjectID(pkg.actId)  
        const {diff} = await db.collection("activities").findOne({_id: pkg._id})
        quest.pledge = (quest.term-quest.fora)*diff
        quest.reward = quest.term*diff 
        var questend = new Date(quest.start)
        questend.setDate(quest.term - 1 + questend.getDate())
        quest.end = JSON.stringify(questend).match(/[\w-]{10}/)[0]
        quest.status = JSON.stringify(new Date)
          .match(/[\w-]{10}/)[0]==quest.start? "ongoing":"future"
          
        db.collection("quest").insertOne(quest, (err, result) =>{
          if (err) console.log(err)
          response.end(JSON.stringify(quest._id))
          // console.log("Запись добавлена ​​как" + " " + quest._id)
        })
        // написать ответ клиенту айдишником,обработка ответа ( дать юзеру ссылку для перехода на страницу квеста)
        return 
      }
    }
    
    function end(obj) { response.end(JSON.stringify(obj)) }
    function endOk(obj={}) { end({success:1, ...obj}) }
    function endFail(obj={}) { end({success:0, ...obj}) }

    function handle(coll, method, filterProps, updProps, cb) {
      if (typeof updProps == "function") cb = updProps, updProps = []

      const pkg = JSON.parse(decodeURI(request.headers.pkg))
      pkg._id = require("mongodb").ObjectID(pkg.id)
      // const filter = filterProps.reduce((obj, prop) =>
      //   ({...obj, [prop]: pkg[prop]}), {})
      const filter = partial(filterProps, pkg)
      const upd = updProps.length? [{$set: partial(updProps, pkg)}] : []

      db.collection(coll)[method](filter, ...upd, (err, result) =>{
        if (err) console.log(err)
        cb(result, err)  
      })
    }
  }

  response.end(request.url + " is just wrong")
}

function partial(props, obj) {
  var partObj = {}
  for (var prop of props) partObj[prop] = obj[prop]
  return partObj
}


