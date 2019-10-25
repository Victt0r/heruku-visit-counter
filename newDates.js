function dateStr(datetime) {
  var month = String(datetime.getMonth()+1)
  var day = String(datetime.getDate())
  return day.padStart(2, 0)+"."+month.padStart(2, 0)
}

console.log(dateStr(new Date))