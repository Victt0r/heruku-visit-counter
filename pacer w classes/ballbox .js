import ReportManager from "./ReportManager.js"
ReportManager.greet()

var ball1 = {size: "s", color: "green", material: "plastic" }
var ball2 = {size: "m", color: "blue", material: "wood" }
var ball3 = {size: "xl", color: "black", material: "paper" }


function makeBall(size, color, material) {
  return {size, color, material}
}

var ball4 = makeBall("l", "red", "iron")

function Ball(size, color, material) {
  this.size = size
  this.color = color
  this.material = material
}

var ball5 = new Ball("xs", "yellow", "gold")

console.log({ball1, ball2, ball3, ball4, ball5})

Ball.prototype.jump = function() {
  console.log(`the ${this.color} ${this.material} ball is jumping`)
}

Object.setPrototypeOf(ball4, Ball.prototype)
ball5.jump()
ball4.jump()

class Box {
  constructor(width, height, length) {
    this.width = width
    this.height = height
    this.length = length
    this.content = []
  }
  putIn(item) {
    if (item.width<this.width && item.height<this.height &&     
        item.length<this.length) {
          this.content.push(item)
          console.log(this)
        }
    else throw new Error("item is too big")
  } 
  takeOut(item) {
    if (this.content.includes(item)) {
      this.content = this.content.filter(el=> el!==item ) 
        console.log(box1)
      }
    else throw new Error("no such item")
  }
}



var box1 = new Box(20, 10, 20)
var box2 = new Box(40, 20, 40)
var item0 = {width: 10, height: 5, length: 10}

box1.putIn(item0)
box2.putIn(box1)

Object.assign(window, {Box, box1, box2, item0, Ball})
