// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";
const iconFavicon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALySURBVHgBtZZNTttQEIBnxknahhYFCZC6CydoOAHhBIRFJZQNiVRQd8AJCDdIdoggYTaA1AXmBIQT4J6AsKoERbXUgiCx33Qmfw0kBgTuyAv76Xm+N/8P4REp5M5SsZH3BTI4A4gZAE4bw7PbBxO15fxPZkQPDLtMfOQHvmMffKyH6cIwQCI5usIIq8icYoYagflukFzLNGubolBBQ5TZd6a5MQw4ACrkLzIJsA5FSwrBVJI3f8plZ8p7uG8YqKOyDsxrW/vjTihIIXG0jtUdFjeLevKH7uNmMF/9NumGgzrCUBDYbvcz1oMs/EgrhA0fbe+PF9qnvlpX98lP8rBLHByRFXjwHEGwvyxcnms874ESlBBLoF4ViFoRf/dB3ZdBDnffU0JEO4Xcr2nbGfNivZNLTCxuzLagydFjMSHFEMxu7U268GLhdCLpr8pLiTorBQ18O5uu1mVDhgRafRWkK7giVqVwKX8hENoh05y6VWsofiagja29idJjvz+ZDH3CYIpEQHNaJ2pNnKysrHuNm1gZIhRhzJBUdxqRT1oLSIuSdScaPIhQGDBLUlwZSd16a4EFShBBXAZQKRqkt6ERS4okovfchIBp+A9CotgDpkwbIp3YQAYiFomRKzEKNBE+6ULAfIKEM5r3EKUYcy5ZRzVEyKpy/03M1uLoVHOEwg41E5ajcVLltj3mifsqWs1Lny+icqHXvI071K9cO7h2BLHQxbh1qN/wauGK1mUrvRsJ6QSMnnTwQ/2+i1vzehJtR9r7XgxkrJPxbX3tDb6voiyg+Km8OtW98aKuLecvS5IxK7KpM87ZRfYrYaN8gANmutuYewW72ZrzRsdETqw47bpR7gjTbExR3OlJ4mR9iKXhGaL/9Hf/gTuDWmZQhiCypDiWG6axO+yyEWaReMATyHx3soaC/im6LEkhLwow3XVbQHDuX8dsDW7YLejdze+1YdM4FKSyKiP9+u1IDonmZGtaB2L/vU5vPMxc1+7/1Lj/C0FfnDyLRPxKAAAAAElFTkSuQmCC";
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-icon",
    "@tailvue/nuxt",
    "@nuxtjs/apollo",
  ],
  //@ts-ignore
  apollo: {
    autoImports: true,
    clients: {
      default: {
        //httpEndpoint: 'http://localhost:4000/graphql',
        httpEndpoint: "https://backend.lider.io/graphql",
        tokenName: "tokenGraphql",
        tokenStorage: "cookie",
        authType: "Bearer",
        authHeader: "Authorization",
      },
    },
  },

  srcDir: "src",
  dir: {
    assets: "src/assets",
  },
  vite: {
    plugins: [svgLoader()],
  },
  components: [
    // Incluir la carpeta 'ui' dentro de la búsqueda de componentes
    "~/components/layoutDefault",
    "~/components/elements",
    "~/components/tables",
  ],

  css: ["@/assets/css/main.scss"],

  runtimeConfig: {
    jwtSecret:
      '.BTF#Vziz7S%e3jx,nTTb"~!7TQf,{&A}!Ew4TzZvuJ`W%jc`W0S"f+,0Y32m.K', // can be overridden by NUXT_API_SECRET environment variable
  },

  app: {
    head: {
      link: [{ rel: "icon", type: "image/png", href: iconFavicon }],
    },
  },
});
