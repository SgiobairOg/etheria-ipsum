const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

exports.sleep = sleep;

/**
 * Processes each line of a file with a given delay
 * @param {any} reader a readline interface
 * @param {any} handler a handler to apply to each line
 * @param {number} delay a helay in milliseconds
 */
exports.parseLinesWithDelay = async (reader, handler, delay) => {
  do {
    reader.nextLine(async (err, line) => {
      try {
        if (err) throw err;
        handler(line);
      } catch (err) {
        throw err;
      }
    });
    await sleep(delay);
  } while (reader.hasNextLine());

  await reader.close(function (err) {
    if (err) throw err;
    console.log('Closing...');
  });
};
