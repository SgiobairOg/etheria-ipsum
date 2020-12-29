<template>
  <main class="max-w-prose mx-0 md:mx-auto">
    <div class="mx-auto">
      <label class="flex justify-center items-center">
        <input v-model="count" class="form-input block w-24 text-purple-darkest" placeholder="20">
        <button @click="getWords" class="block px-4 py-2 border-l-2 text-base dark:text-purple-darkest bg-purple-darker dark:bg-purple dark:border-purple-darkest">Words</button>
        <button @click="getCharacters" class="block px-4 py-2 border-l-2 text-base dark:text-purple-darkest  bg-purple-darker dark:bg-purple dark:border-purple-darkest rounded-md rounded-l-none">Characters</button>
      </label>
    </div>
    <div id="stats" class="text-purple-darker dark:text-base">
      <ul v-if="stats.ready" class="mt-8">
        <li class="text-sm">Words: {{stats.words}}</li>
        <li class="text-sm">Characters: {{stats.characters}}</li>
        <li class="text-sm">Characters without spaces: {{stats.charactersExcludingSpaces}}</li>
      </ul>
    </div>
    <div id="output"  class="mt-8 text-purple-darkest dark:text-purple">
      {{dialogContent}}
    </div>
  </main>
</template>

<script>
  import { ref, reactive } from "@vue/composition-api";

  export default {
    name: 'Generator',
    setup() {
      const count = ref(20)
      const dialogContent = ref(undefined)
      const successMessage = ref('')
      const stats = reactive({
        ready: false,
        words: 0,
        characters: 0,
        charactersExcludingSpaces: 0
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

      function updateStats( words, characters, charactersExcludingSpaces ) {
        stats.words = words
        stats.characters = characters
        stats.charactersExcludingSpaces = charactersExcludingSpaces
        stats.ready = true
      }

      function retriveDialogData( contentType, count) {
        const axios = () => import("axios");
        stats.ready = false
        const api = `./dialog/${contentType}/${count}`

        axios
          .get(api)
          .then(
            ( result ) => {
              updateStats(result.data.words, result.data.characters, result.data.charactersExcludingSpaces) 
              updateDialog(result.data.dialog)
            }, 
            ( error ) => console.error(error))
      }

      return {
        count,
        stats,
        dialogContent,
        getWords,
        getCharacters
      }
    },
  };
</script>