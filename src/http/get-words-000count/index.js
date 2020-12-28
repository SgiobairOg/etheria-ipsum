const { routeList } = require('@architect/shared/route-list')
const { dialog } = require('@architect/shared/etheria-ipsum-dialog')
const randomItem = require('random-item')

const dialogData = dialog
const ROOT = process.env.ROOT || 'http://localhost:3333'

exports.handler = async function http (req) {
  const result = {
    dialog: '',
    words: 0,
    characters: 0,
    charactersExcludingSpaces: 0,
    self: req.url,
    ...routeList(ROOT),
  }
  console.log(result)
  const targetWordCountInt = parseInt(req.pathParameters.count)

  if(!targetWordCountInt || isNaN(targetWordCountInt) || targetWordCountInt < 1) {
    reply.code(400)
    return { error: `Word count is required to be a positive integer value. For example '../words/42'`}
  }

  do {
    let currentLine
    const remainingWordCount = targetWordCountInt - result.words
    if (dialogData.wordLengthIndex[remainingWordCount]) { 
      currentLine = randomItem(dialogData.wordLengthIndex[remainingWordCount])
    } else {
      currentLine = randomItem(dialogData.lines.filter(line => line.content.length <= remainingWordCount)) 
    }

    result.dialog += currentLine.content + ' '
    result.words += currentLine.words
    result.characters += 1 + currentLine.characters
    result.charactersExcludingSpaces += currentLine.charactersExcludingSpaces
  } while ( targetWordCountInt > result.words )

  result.dialog.trim()

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: JSON.stringify(result)
  }
}