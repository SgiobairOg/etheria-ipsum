const { routeList } = require('@architect/shared/route-list')
const { dialog } = require('@architect/shared/etheria-ipsum-dialog')
const randomItem = require('random-item')

const dialogData = dialog
const ROOT = process.env.ROOT || 'http://localhost:3333'
const PARAGRAPH_BREAK = '||X||'

exports.handler = async function http (req) {
  const result = {
    dialog: '',
    words: 0,
    characters: 0,
    charactersExcludingSpaces: 0,
    paragraphs: 0,
    self: req.url,
    ...routeList(ROOT),
  }
  const targetCharacterCountInt = parseInt(req.pathParameters.count)

  if(!targetCharacterCountInt || isNaN(targetCharacterCountInt) || targetCharacterCountInt < 1) {
    return {
      statusCode: 400,
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'application/json; charset=utf8'
      },
      body: JSON.stringify({ error: `Character count is required to be a positive integer value. For example '../characters/42'`})
    }
  }

  let lineCount

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

    lineCount += 1

    if(lineCount === randomItem([5,6,7,8]) || lineCount >= 8) {
      result.dialog += PARAGRAPH_BREAK
      result.characters += 1
      result.paragraphs += 1
      lineCount = 0
    }
  } while ( targetCharacterCountInt > result.characters )

  result.paragraphs += 1
  result.dialog.trim()
  result.dialog = result.dialog.split(PARAGRAPH_BREAK)

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json; charset=utf8'
    },
    body: JSON.stringify(result)
  }
}