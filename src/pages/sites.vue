<template>
  <div>
    <BlockContentHeader>
      <template #title> Your sites</template>
      <template #options>
        
        <button class="btnContentHeader1 mr-5" >
          <img
            src="~/assets/playground_assets/usersharedline7476-sslo.svg?url"
          />
          <span> New </span>
        </button>
        <button class="btnContentHeader1 mr-5">
          <img src="~/assets/playground_assets/printerfill4860-fxck.svg?url" />
          <span> Print </span>
        </button>
        <button class="btnContentHeader1">
          <img src="~/assets/playground_assets/downloadfill4860-dq2w.svg?url" />
          <span> Download Report </span>
        </button>
      </template>
    </BlockContentHeader>
    <table-sites></table-sites>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Lider | Sites',
  meta: [
    { name: 'description', content: 'Sites page.' }
  ],
})
</script>

<style scoped></style>
