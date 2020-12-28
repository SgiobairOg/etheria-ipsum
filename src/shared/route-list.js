const routeList = ( root ) => {
  return {
    "_links": {
      "project-site": {
        "rel": "describedby",
        "href": "https://www.github.com/SgiobairOg/etheria-ipsum"
      },
      "root": {
        "rel": "latest-version",
        "href": `${root}/dialog`
      },
      "characters": {
        "rel": "latest-version",
        "href": `${root}/dialog/characters/{count}`
      },
      "words": {
        "rel": "latest-version",
        "href": `${root}/dialog/words/{count}`
      } 
    }
  }
}

module.exports = {
  routeList,
}
