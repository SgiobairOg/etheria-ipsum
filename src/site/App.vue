<template>
  <div class="bg-base dark:bg-purple-darkest min-h-screen grid grid-rows-layout grid-cols-1 gap-y-8 justify-center py-8 px-8">
    <Header />
    <Generator />
    <Footer />
  </div>
</template>

<script>
  const Header = () => import('./components/Header.vue')
  const Footer = () => import('./components/Footer.vue')
  const Generator = () => import('./components/Generator.vue')

  export default {
    name: 'App',
    components: {
      Header,
      Footer,
      Generator
    }
  };
</script>
