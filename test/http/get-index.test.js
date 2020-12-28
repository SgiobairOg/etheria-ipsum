let test = require('tape')
let tiny = require('tiny-json-http')
let sandbox = require('@architect/sandbox')
let url = 'http://localhost:6666'

/**
 * Sandbox / http test
 * - Demonstrates execising basic web integration tests using the local dev server
 */
test('Set up env', t => {
  t.plan(1)
  t.ok(sandbox, 'sandbox loaded')
})

test('Start sandbox', async t => {
  t.plan(1)
  let result = await sandbox.start()
  t.ok(result, 'Sandbox started!')
})

test('get /', async t => {
  t.plan(1)
  try {
    let result = await tiny.get({url})
    t.ok(result, 'Got result:', console.log(JSON.stringify(result.body).substring(0,50) + '...'))
  } catch (err) {
    t.fail(err)
  }
})

test('/ result contains "_links" property', async t => {
  t.plan(1)
  try {
    let result = await tiny.get({url})
    t.ok(result, 'Got result:', console.log(JSON.stringify(result.body._links).substring(0,50) + '...'))
  } catch (err) {
    t.fail(err)
  }
})

test('Shut down sandbox', async t => {
  t.plan(1)
  let result = await sandbox.end()
  t.equal(result, 'Sandbox successfully shut down')
})