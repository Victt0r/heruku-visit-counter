class Score {
  constructor (container) {
    container.append(this.render())
  }
  render() {
    const div = document.createElement("div")

    Object.assign(div.style, {width:"49px", height:"49px", 
      textAlign:"center", lineHeight:"49px", border:"1px solid", 
        borderRadius:"50%"})
        
    div.innerText = 9
    return div
  } 
} 
export default Score