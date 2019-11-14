class Report {
  constructor () {

  }
  render() {
    const tr = document.createElement("tr")
    const tdDate = document.createElement("td")
    tdDate.innerText = "17.03"
    tr.append(tdDate)
  }
}
export default Report
