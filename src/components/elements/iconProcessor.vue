<template>
         <img class="icon_processor" :src="data.icon"
         :style="{backgroundColor: data.background}"
          :alt="processor + '_processor'" />
         
</template>

<script setup lang="ts">
import { watch,  reactive } from "vue";
import iconStripeUrl from '~/assets/playground_assets/simpleiconsstripe4861-j2k.svg?url'
import iconPaypalUrl from '~/assets/playground_assets/logospaypal4861-lh1.svg?url'
import iconCoinbaseUrl from '~/assets/playground_assets/coinbaselogo4862-5kf.svg?url'

const props = defineProps({
    processor: {
        type: String,
        default: 'stripe'
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
      if(nuevoValor=="stripe"){
        data.icon = iconStripeUrl
        data.background = "rgb(105, 114, 222)"
      }
      else if(nuevoValor=="paypal"){
        data.icon = iconPaypalUrl
        data.background = "rgba(197, 227, 251, 1)"
      }
      else if(nuevoValor=="coinbase"){
        data.icon = iconCoinbaseUrl
        data.background = "none"
      }
    }
  },
  { immediate: true }
);
</script>

