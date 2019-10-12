props = ["foo", "bar"]
obj = {kva:2, foo:3, pi:4, bar:5}

function partial(props, obj) {
  var partObj = {}
  for (var prop of props) partObj[prop] = obj[prop]
  return partObj
}
