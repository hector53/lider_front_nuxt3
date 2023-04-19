<template>
  <div class="userItemSettings flex  items-center mt-6 sm:p-4 p-2  " style="font-family: IBM Plex Sans;">
    <div class="flex justify-between items-center">
      <div style="background-color: rgba(246, 248, 250, 1);" class="p-3">
        <slot name="iconLeft">
            <img src="~/assets/playground_assets/user6line9110-khwm.svg?url" alt="" />
        </slot>
      </div>
      <div class="pl-5">
        <h3 class="text-xl sm:w-60 w-48 break-words ">{{title}}</h3>
        <span style="color: rgba(148, 150, 155, 1)">{{subtitle}}</span>
      </div>
    </div>
    
    
        <slot name="iconRight">
            
        </slot>
    
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        default: 'Julian'
    }, 
    subtitle: {
        type: String,
        default: 'Perez'
    }, 
});
</script>
