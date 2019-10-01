function updateEndeavors(endeavors) {
  nameEnds.value = endeavors.children[0].innerText
  detail.value = endeavors.children[1].innerText
  deadline.value = endeavors.children[2].innerText
  save.classList.remove("hidden")
  // убрать кнопку "создать Стр"
  save.onclick = function () {
    nameEnds.value = nameEnds.value.trim()
    fetch(location.origin + "/api/endeavor/update", {
      headers: {
        id: endeavors.id,
        endeavor: encodeURI(nameEnds.value),
        details: encodeURI(detail.value),
        deadline: deadline.value
      }
    }).then(response => response.json())
      .then(status => {
        if (status.success) {
          endeavors.children[0].innerText = nameEnds.value
          endeavors.children[1].innerText = detail.value
          endeavors.children[2].innerText = deadline.value
          nameEnds.value = detail.value = deadline.value = ""
          save.classList.add("hidden")
        }
      })
  }
}