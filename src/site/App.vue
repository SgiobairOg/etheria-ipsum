<template>
  <div class="bg-base dark:bg-purple-darkest min-h-screen grid grid-rows-layout grid-cols-1 gap-y-8 justify-center py-8 px-8">
    <Header />
    <Generator />
    <Footer />
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  import Generator from './components/Generator.vue';

  export default {
    name: 'App',
    components: {
      Header,
      Footer,
      Generator
    }
  };
</script>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>