const Layout = `
  <header class="">
    <h1 class="text-center uppercase font-title text-6xl text-purple-darker dark:text-orange-darkest">Etheria Ipsum</h1>
    <p class="text-center text-purple">"Ah, I love recounting the epic tales of my placeholder text. My HEROIC placeholder text. Placeholder text for the ages! Narration!" - Sea Hawk </p>
  </header>
  <main class="max-w-prose mx-auto">
    <div id="inputs" class="flex">
      <label>Amount
        <input type="number" min="1" step="1" name="amount" />
      </label>
      <label>Type
        <select name="type">
          <option value="words">Words</option>
          <option value="characters">Characters</option>
        </select>
      </label>
      <button name="generate" 
    </div>
    <div id="oputputs">
    </div>
  </main>
  <footer class="max-w-prose mx-auto">
    <p class="text-xs text-gray-600 dark:text-base">The dialog used to generate these snippets is sourced from the <a class="text-rose visited:text-orange-darkest hover:text-purple-darker active:text-orange" href="https://she-raandtheprincessesofpower.fandom.com/">She-Ra Fandom Wiki</a> and is used under Fandom's <a class="text-rose visited:text-orange-darkest hover:text-purple-darker active:text-orange" href="https://fandom.com/licensing">CC-BY-SA</a> license. If you enjoy using this tool consider helping to expand and maintain the episode transcripts in the wiki.</a></p>
  </footer>
`

module.exports = {
  Layout
}