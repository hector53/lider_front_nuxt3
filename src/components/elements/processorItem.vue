<template>
  <div
    class=" inline-flex justify-start items-center mb-3 rounded p-1"
    :class="{ 'bg-[#91ffa752]': props.active, 'bg-[#ff4c6e47]': props.active == false }"
  >
    <img :src="urlApi + '/uploads/' + props.image" alt="" class="mr-2 w-5" />
    <span>{{ props.name }}</span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
  },
});

onMounted(async () => {
console.log("active", props.active)
})
</script>

<style scoped></style>
