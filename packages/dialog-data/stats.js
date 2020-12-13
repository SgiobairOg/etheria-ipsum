const fs = require('fs');
const lineReader = require('line-reader');
const { parseLinesWithDelay } = require('./src/utils/utils');

const dialog = {
  lines: [],
};

let lineIndex = 0;

const convertLineToJson = (line) => {
  console.log(line);
  if (dialog.lines
    .filter(l => !l.content || l.content === line).length > 0) {
    console.log('Line already exists');
    return;
  }

  console.log('Line does not exist');

  lineIndex += 1;
  console.log(lineIndex);

  const characters = line.trim().length;
  const charactersExcludingSpaces = line.trim().replace(/\s/g, '').length;
  const words = line.trim().split(/\s+/).length;

  dialog.lines.push({
    characters,
    charactersExcludingSpaces,
    words,
    content: JSON.stringify(line),
  });

  console.log(characters, charactersExcludingSpaces, words);

  return;
};

(async () => {
  lineReader.open('./data/dialog.txt', async (err, reader) => {
    if (err) throw err;

    await parseLinesWithDelay(reader, convertLineToJson, 50);
    console.log('Writing file...');
    await fs.writeFileSync('./data/dialog.json', JSON.stringify(dialog));
    console.log('Done.');
  });
})();
