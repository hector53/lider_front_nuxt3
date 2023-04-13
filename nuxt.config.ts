// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src",
  
  components: [
    // Incluir la carpeta 'ui' dentro de la búsqueda de componentes
    '~/components/layoutDefault','~/components/elements', '~/components/tables'
  ],
  modules: [
    "@nuxtjs/tailwindcss",
    '@nuxtjs/google-fonts'
  ],

  css: [
    '@/assets/css/main.scss'
  ],
});
