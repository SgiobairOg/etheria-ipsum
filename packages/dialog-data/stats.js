const fs = require('fs');
const lineReader = require('line-reader');
const { parseLinesWithDelay } = require('./src/utils/utils');

class DialogIndex extends Object {
  appendOrCreate (key, value) {
    const collection = this;

    if (!collection[key])
      collection[key] = [];

    if (!collection[key].includes(value))
      collection[key].push(value);
  }
};

const dialog = {
  lines: [],
  characterLengthIndex: new DialogIndex(),
  wordLengthIndex: new DialogIndex(),
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

  const lineData = {
    characters,
    charactersExcludingSpaces,
    words,
    content: line,
  };

  dialog.lines.push(lineData);

  dialog.characterLengthIndex.appendOrCreate(characters, lineData);

  dialog.wordLengthIndex.appendOrCreate(words, lineData);

  console.log(characters, charactersExcludingSpaces, words);

  return;
};

(async () => {
  lineReader.open('./data/dialog.txt', async (err, reader) => {
    if (err) throw err;

    await parseLinesWithDelay(reader, convertLineToJson, 50);
    console.log('Character length index:', dialog.characterLengthIndex);
    console.log('Word length index:', dialog.wordLengthIndex);
    console.log('Writing file...');
    fs.writeFileSync('./data/dialog.json', JSON.stringify(dialog));
    console.log('Done.');
  });
})();
