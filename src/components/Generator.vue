<template>
  <main class="max-w-prose mx-0 md:mx-auto">
    <div class="mx-auto">
      <label class="flex justify-center items-center">
        <input v-model="count" type="number" min="1" step="1" class="form-input block w-24 text-purple-darkest" placeholder="52">
        <button @click="getWords" class="block px-4 py-2 border-l-2 text-base dark:text-purple-darkest bg-purple-darker dark:bg-purple dark:border-purple-darkest">Words</button>
        <button @click="getCharacters" class="block px-4 py-2 border-l-2 text-base dark:text-purple-darkest  bg-purple-darker dark:bg-purple dark:border-purple-darkest rounded-md rounded-l-none">Characters</button>
      </label>
    </div>
    <div id="stats" class="text-purple-darker dark:text-base">
      <ul v-if="stats.ready" class="mt-8">
        <li class="text-sm">Words: {{stats.words}}</li>
        <li class="text-sm">Characters: {{stats.characters}}</li>
        <li class="text-sm">Characters without spaces: {{stats.charactersExcludingSpaces}}</li>
        <li class="text-sm">Paragraphs: {{stats.paragraphs}}</li>
      </ul>
    </div>
    <div id="output"  class="mt-8 text-purple-darkest dark:text-purple">
      <p class="mb-4" v-for="(paragraph, index) in dialogContent" :key="index">
        {{paragraph}}
      </p>
    </div>
  </main>
</template>

<script>
  import { ref, reactive } from "@vue/composition-api"

  export default {
    name: 'Generator',
    setup() {
      const count = ref(52)
      const dialogContent = ref(undefined)
      const stats = reactive({
        ready: false,
        words: 0,
        characters: 0,
        charactersExcludingSpaces: 0,
        paragraphs: 1
      })

      function getWords() {
        retriveDialogData('words', count.value)
      }

      function getCharacters() {
        retriveDialogData('characters', count.value)
      }

      function updateDialog( dialog ) {
        dialogContent.value = dialog
      }

      function updateStats( words, characters, charactersExcludingSpaces, paragraphs ) {
        stats.words = words
        stats.characters = characters
        stats.charactersExcludingSpaces = charactersExcludingSpaces
        stats.paragraphs = paragraphs
        stats.ready = true
      }

      function retriveDialogData( contentType, count) {
        stats.ready = false
        dialogContent.value = ''
        const api = `./dialog/${contentType}/${count}`

        fetch(api)
          .then( response => response.json() )
          .then(
            ( result ) => {
              updateStats(result.words, result.characters, result.charactersExcludingSpaces, result.paragraphs)
              updateDialog(result.dialog)
            },
            ( error ) => { throw new Error(error) })
      }

      return {
        count,
        stats,
        dialogContent,
        getWords,
        getCharacters
      }
    },
  }
</script>