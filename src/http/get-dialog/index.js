const { routeList } = require('@architect/shared/route-list')

const ROOT = process.env.API_ROOT || 'http://localhost:3333'

exports.handler = async function http (req) {
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json; charset=utf8'
    },
    body: JSON.stringify({
      "message": "Welcome to the Etheria-Ipsum API. This API provides dialog data from She-Ra and the Princesses of Power in response to requests for a number and measure of content. For more information, including sources, visit the 'project-site' link.",
      ...routeList(ROOT)
    }),
  }
}