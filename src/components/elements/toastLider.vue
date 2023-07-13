



<template>
  <transition name="fade">
    <div
      v-show="dataToast.toast.show"
      class="toastLider"
      :class="dataToast.toast.position"
    >
      <img src="~/assets/playground_assets/checkbox-circle-fill.svg?url" />
      <span>{{ dataToast.toast.message }}</span>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { dataToast, disableToast } from "~/composables/toastLiderPro";
watch(
  () => dataToast.toast.show,
  async (newVal, valorAnterior) => {
    console.log("new val", newVal)
    if (newVal) {
      if (dataToast.toast.duration > 0) {
        setTimeout(() => {
          disableToast()
          console.log("toastLiderPro", dataToast.toast)
        }, dataToast.toast.duration);
      }
    }
  }
);
</script>
