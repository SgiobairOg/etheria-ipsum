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
  const targetCharacterCountInt = parseInt(req.pathParameters.count)

  if(!targetCharacterCountInt || isNaN(targetCharacterCountInt) || targetCharacterCountInt < 1) {
    return {
      statusCode: 400,
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'text/html; charset=utf8'
      },
      body: JSON.stringify({ error: `Character count is required to be a positive integer value. For example '../characters/42'`})
    }
  }

  do {
    let currentLine
    const remainingCharacterCount = targetCharacterCountInt - 1 - result.characters
    if (dialogData.characterLengthIndex[remainingCharacterCount]) {
      currentLine = randomItem(dialogData.characterLengthIndex[remainingCharacterCount])
    } else {
      currentLine = randomItem(dialogData.lines)
    }

    result.dialog += currentLine.content + ' '
    result.words += currentLine.words
    result.characters += 1 + currentLine.characters
    result.charactersExcludingSpaces += currentLine.charactersExcludingSpaces
  } while ( targetCharacterCountInt > result.characters )

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: JSON.stringify(result)
  }
}