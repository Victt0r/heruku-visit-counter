class RepBlock {
    constructor () {
      this.element = this.render()
    }
    render() {
      const div = document.createElement("div")
      div.innerText = "Wenn sich der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. Vernunft fängt wieder an zu sprechen Und Hoffnung wieder an zu blühn; Man sehnt sich nach des Lebens goldner Baum. Ich bin von je der Ordnung Freund gewesen. Gewöhnlich glaubt der Mensch, wenn er sie beim Kragen hätte."

      return div
    }
}
export default RepBlock
