const { routeList } = require('./../utility/routeList.js')
const { dialog } = require('@sgiobairog/etheria-ipsum-dialog-data')
const randomItem = require('random-item')

const dialogData = dialog 

async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { 
      hello: 'Welcome to the Etheria Ipsum API',
      routes: routeList
    }
  })

  fastify.get(
    '/words/:count',
    {
      schema: {
        querystring: {
          count: { type: 'integer' }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              dialog: { type: 'string' },
              words: { type: 'integer' },
              characters: { type: 'integer' },
              charactersExcludingSpaces: { type: 'integer' },
              self: { type: 'string' },
              routes: { type: 'array' }
            }
          },
          400: {
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          },
          500: {
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          },
        },
      },
    },
    async (request, reply) => {
      const result = {
        dialog: '',
        words: 0,
        characters: 0,
        charactersExcludingSpaces: 0,
        self: request.url,
        routes: routeList,
      }
      console.log(result)
      const targetWordCountInt = parseInt(request.params.count)

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
      return result
    })

  fastify.get(
    '/characters/:count',
    {
      schema: {
        querystring: {
          count: { type: 'integer' }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              dialog: { type: 'string' },
              words: { type: 'integer' },
              characters: { type: 'integer' },
              charactersExcludingSpaces: { type: 'integer' },
              self: { type: 'string' },
              routes: { type: 'array' }
            }
          },
          400: {
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          },
          500: {
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          },
        },
      },
    },
    async (request, reply) => {
      const result = {
        dialog: '',
        words: 0,
        characters: 0,
        charactersExcludingSpaces: 0,
        self: request.url,
        routes: routeList,
      }
      const targetCharacterCountInt = parseInt(request.params.count)

      if(!targetCharacterCountInt || isNaN(targetCharacterCountInt) || targetCharacterCountInt < 1) {
        reply.code(400)
        return { error: `Character count is required to be a positive integer value. For example '../characters/42'`}
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

      return result
    })
}

module.exports = {
  routes
}