import RepBlock from "./RepBlock.js"

class Ribbon {
  constructor (container, read) {
    container.append(this.render())
    this.blocks = []
    const readAndBuild = ()=> {
      read().then(arrData=> {
        for (const objData of arrData) this.blocks.push(new RepBlock(objData))
        this.blocks.forEach(block=> this.element.append(block.element))
      }).catch(err=> {
        console.log(err)
        setTimeout(readAndBuild, 1000)
      })
    }
    readAndBuild()
  }
  render() {
    const div = document.createElement("div")
    Object.assign(div.style, {textAlign:"center", border:"2px solid"})
    return this.element = div
  }

}
export default Ribbon
