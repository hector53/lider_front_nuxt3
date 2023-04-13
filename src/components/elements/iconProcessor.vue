<template>
         <img class="icon_processor" :src="`/_nuxt/assets/playground_assets/${data.icon}`"
         :style="{backgroundColor: data.background}"
          :alt="processor + '_processor'" />
</template>

<script setup lang="ts">
import { watch,  reactive } from "vue";
const props = defineProps({
    processor: {
        type: String,
        default: 'Stripe'
    }, 
});
const data = reactive({
    icon: "simpleiconsstripe4861-j2k", 
    background: "rgb(105, 114, 222)"
})
watch(
  () => props.processor,
  async (nuevoValor, valorAnterior) => {
    // console.log("prop data cambio ", nuevoValor, valorAnterior);
    if (nuevoValor != undefined && nuevoValor != valorAnterior) {
      if(nuevoValor=="Stripe"){
        data.icon = "simpleiconsstripe4861-j2k.svg"
        data.background = "rgb(105, 114, 222)"
      }
      else if(nuevoValor=="Paypal"){
        data.icon = "logospaypal4861-lh1.svg"
        data.background = "rgba(197, 227, 251, 1)"
      }
    }
  },
  { immediate: true }
);
</script>

