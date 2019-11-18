import Report from "./Report.js"

class RepBlock {
    constructor ({ actName, reports }) {
      this.name = actName
      this.element = this.render()
      this.reports = []
      for (const rep of reports) this.reports.push(new Report(rep))
      this.reports.forEach(report=> this.table.append(report.element))
    }
    render() {
      const div = document.createElement("div")
      Object.assign(div.style, {border:"2px solid"})

      const h3 = document.createElement("h3")
      h3.innerText = this.name
      this.table = document.createElement("table")
      div.append(h3, this.table)

      return div
    }
}
export default RepBlock
