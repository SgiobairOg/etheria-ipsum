const routeList = []

const routeListHook = (routeData) => { 
  routeList.push({ url: routeData.url})
}

module.exports = {
  routeListHook,
  routeList,
}
