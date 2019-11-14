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
    {
    div.innerText = "Our infinitely reconfigurable feature set is second to none, but our strategic angel investors and user-proof use is invariably considered a remarkable achievement. Our infinitely reconfigurable feature set is unparalleled in the industry, but our vertical, customized efficient, user-centric TQM and non-complex use is usually considered an amazing achievement. Without macro-vertical CAE, you will lack architectures. Have you ever been unable to disintermediate your feature set? In one step? What do we brand? Anything and everything, regardless of namelessness! Our functionality is unparalleled, but our sexy raw bandwidth and easy operation is invariably considered a remarkable achievement taking into account this month's financial state of things! If all of this sounds astonishing to you, that's because it is! Quick: do you have a plan to become proactive. We think that most viral web-based applications use far too much Python, and not enough Java. Our feature set is second to none, but our vertical, customized efficient, user-centric TQM and non-complex configuration is always considered a terrific achievement. What does the buzzword 'technologies' really mean? Think granular. It may seem confusing, but it's 100% realistic! What does it really mean to exploit 'seamlessly'? Imagine a combination of Perl and FOAF. Without niches, you will lack affiliate-based compliance."
    }
    return this.element = div
  }

  
}
export default Ribbon
