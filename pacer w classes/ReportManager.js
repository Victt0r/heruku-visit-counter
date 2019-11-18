import Score from "./Score.js"
import Ribbon from "./Ribbon.js"
import read from "./reportObjDummy.js"


class ReportManager {
  constructor(container) {
    container.append(this.render())
    this.score = new Score(this.element)
    this.ribbon = new Ribbon(this.element, read)

  }

  render() {
    const section = document.createElement("section")
    section.className = "repman"
    section.innerText = "hello"
    return this.element = section
  }
}
export default ReportManager