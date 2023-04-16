// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader"
export default defineNuxtConfig({
 
  srcDir: "src",
  dir:{
    assets: 'src/assets'
  },
  vite: {
    plugins: [svgLoader()],
    
  },
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
