<template>
  <div
    class="blockProcessors flex sm:flex-row sm:justify-between flex-col items-center p-8 border-[#ECEFF2] hover:border-[#d5d7d8]"
    :class="{
      'rounded-t-2xl': border == 'top',
      'rounded-b-2xl': border == 'bottom',
    }"
  >
    <div class="flex flex-row justify-between items-center">
      <div class="mr-4">
        <img
          :src="urlApi + '/uploads/' + processor?.processor_image"
          alt=""
          class="max-w-none w-12 h-12 rounded-2xl"
        />
      </div>
      <div>
        <h2 class="font-bold text-xl text-[#414552]">
          {{ processor?.processor_name }}
        </h2>
        <p class="font-normal text-sm text-[#94969b]">
          {{ processor?.processor_description }}
        </p>
      </div>
    </div>
    <div class="flex justify-between items-center sm:mt-0 mt-5">
      <div v-if="processor?.active" class="status-badge success mr-5">
        <div class="status-image">
          <img
            src="~/assets/playground_assets/fillcheckcirclei215-pa9.svg?url"
          />
        </div>
        <span>Configure</span>
      </div>

      <div v-else class="status-badge secondary mr-5">
        <div class="status-image">
          <img src="~/assets/playground_assets/close-circle-fill.svg?url" />
        </div>
        <span>Not configure</span>
      </div>

      <button class="btnContentHeader1 mr-5" @click="editRow(processor)">
        <img src="~/assets/playground_assets/pencilfill9110-b58h.svg?url" />
        <span> Edit </span>
      </button>

      <button class="btnContentHeader1 mr-5" @click="deleteRow(processor?._id)">
        <img src="~/assets/playground_assets/delete-bin-4-fill.svg?url" />
        <span> Delete </span>
      </button>
      <button
        class="btnContentHeader1 mr-5"
        @click="Connect_processor(processor, processor?.active)"
      >
        <img src="~/assets/playground_assets/arrow-left-right-line.svg?url" />
        <span v-if="processor?.active"> Disconnect </span>
        <span v-else> Connect </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProcessorsDomain } from "~/interfaces/processorsDomain";
const props = defineProps({
  border: {
    type: String,
    default: "center",
  },
  processor: {
    type: Object as () => ProcessorsDomain,
  },
});
const emitters = defineEmits(["connect-processor", "delete-row", "edit-row"]);
function Connect_processor(row?: ProcessorsDomain, active?: boolean) {
  emitters("connect-processor", row, active);
}
function deleteRow(id?: string) {
  emitters("delete-row", id);
}
function editRow(row?: ProcessorsDomain) {
  emitters("edit-row", row);
}
</script>
