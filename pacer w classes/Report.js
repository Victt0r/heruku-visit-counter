class Report {
  constructor (rep) {
    this.element = this.render(rep)
    
  }
  render({ date, reward }) {
    const tr = document.createElement("tr")
    const tdDate = document.createElement("td")
    const tdReward = document.createElement("td")
    const tdDone = document.createElement("td")
    const tdFail = document.createElement("td")
    const btnDone = document.createElement("button")
    const btnFail = document.createElement("button")
    btnDone.innerText = "Done"
    btnFail.innerText = "Fail"
    tdDate.innerText = date
    tdReward.innerText = reward
    tdDone.append(btnDone)
    tdFail.append(btnFail)
    tr.append(tdDate, tdReward, tdDone, tdFail )
    return tr
  }
}
export default Report
