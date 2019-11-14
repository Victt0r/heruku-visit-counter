import Score from "./Score.js"

class ReportManager {
  constructor(container) {
    container.append(this.render())
    this.score = new Score(this.element)
    this.ribbon = new Ribbon()
  }

  render() {
    const section = document.createElement("section")
    section.className = "repman"
    section.innerText = "hello"
    return this.element = section
  }
}
export default ReportManager