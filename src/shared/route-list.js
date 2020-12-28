const routeList = ( root ) => {
  return {
    "_links": {
      "project-site": {
        "rel": "describedby",
        "href": "https://www.github.com/SgiobairOg/etheria-ipsum"
      },
      "root": {
        "rel": "latest-version",
        "href": `${root}/`
      },
      "characters": {
        "rel": "latest-version",
        "href": `${root}/characters/{count}`
      },
      "words": {
        "rel": "latest-version",
        "href": `${root}/words/{count}`
      } 
    }
  }
}

module.exports = {
  routeList,
}
