class RepBlock {
    constructor () {
      this.element = this.render()

    }
    render() {
      const div = document.createElement("div")
      Object.assign(div.style, {border:"2px solid"})

      const h3 = document.createElement("h3")
      h3.innerText = "repName"
      const table = document.createElement("table")
      div.append(h3, table)

      return div
    }
}
export default RepBlock
