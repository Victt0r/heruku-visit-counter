const arrDummy = [
  {
    actName: "run, 4km",
    reports: [
      { date: "2019-11-05", reward: 3 },
      { date: "2019-11-04", reward: 3 },
      { date: "2019-11-06", reward: 3 },
      { date: "2019-11-07", reward: 4 },
    ]
  },
  {
    actName: "drink 4 glasses ",
    reports: [
      { date: "2019-11-05", reward: 2 },
      { date: "2019-11-04", reward: 2 },
      { date: "2019-11-06", reward: 2 },
      { date: "2019-11-07", reward: 4 },
    ]
  }
]

export default function () {
  return new Promise((resolve, reject)=> {
    setTimeout(()=>{
      if (Math.random()<.3) reject(new Error("fail"))
      else resolve(arrDummy)
    }, 600)
  })
}
