import RepBlock from "./RepBlock.js"

class Ribbon {
  constructor (container) {
    container.append(this.render())
    this.blocks = []
    for (let i=0; i<3; ++i) this.blocks.push(new RepBlock)
    this.blocks.forEach(block=> this.element.append(block.element))
  }
  render() {
    const div = document.createElement("div")
    Object.assign(div.style, {textAlign:"center", border:"2px solid"})
    return this.element = div
  }

  
}
export default Ribbon
