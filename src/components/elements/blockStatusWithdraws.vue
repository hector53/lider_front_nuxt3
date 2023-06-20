<template>
  <div class="flex justify-center items-center" @click="clickStatus">
    <div v-if="status == 0" class="statusBadge pending">
        <img src="~/assets/playground_assets/time-fill.svg?url" />
      <span>Pending</span>
    </div>

    <div v-if="status == 1" class="statusBadge approved">
        <img src="~/assets/playground_assets/fillcheckcirclei215-pa9.svg?url" />
      <span>Approved</span>
    </div>

    <div v-if="status == 2" class="statusBadge inProgress">
        <img src="~/assets/playground_assets/contrast-line.svg?url" />
      <span>In progress</span>
    </div>

    <div v-if="status == 3" class="statusBadge blocked">
        <img src="~/assets/playground_assets/close-circle-fill_red.svg?url" />
      <span>Blocked</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  status: {
    type: Number,
    default: 0
  },
});
const emitters = defineEmits(["click-status"]);

function clickStatus(){
  emitters("click-status");
}
</script>

<style scoped></style>
