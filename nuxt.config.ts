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

  runtimeConfig: {
    jwtSecret: '.BTF#Vziz7S%e3jx,nTTb"~!7TQf,{&A}!Ew4TzZvuJ`W%jc`W0S"f+,0Y32m.K', // can be overridden by NUXT_API_SECRET environment variable
  },

  
  
});
