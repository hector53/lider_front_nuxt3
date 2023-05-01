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
          :src="urlApi + '/uploads/' + processor?.image"
          alt=""
          class="max-w-none w-12 h-12 rounded-2xl"
        />
      </div>
      <div>
        <h2 class="font-bold text-xl text-[#414552]">{{ processor?.name }}</h2>
        <p class="font-normal text-sm text-[#94969b]">
          {{ processor?.description }}
        </p>
      </div>
    </div>
    <div class="flex justify-between items-center sm:mt-0 mt-5">
      <span
        v-if="processor?.active"
        class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
      >
        <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
        Configure
      </span>
      <span
        v-else
        class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
      >
        <span class="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
        Not configure
      </span>

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
        @click="Connect_processor(processor?._id, processor?.active)"
      >
        <img src="~/assets/playground_assets/arrow-left-right-line.svg?url" />
        <span v-if="processor?.active"> Disconnect </span>
        <span v-else> Connect </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ProcessorInterface {
  _id?: string;
  name: string;
  description: string;
  fee: number;
  image: string;
  active: boolean;
  created: string;
  updated: string;
}
const props = defineProps({
  border: {
    type: String,
    default: "center",
  },
  processor: {
    type: Object as () => ProcessorInterface,
  },
});
const emitters = defineEmits(["connect-processor", "delete-row", "edit-row"]);
function Connect_processor(id?: string, active?: boolean) {
  emitters("connect-processor", id, active);
}
function deleteRow(id?: string) {
  emitters("delete-row", id);
}
function editRow(row?: ProcessorInterface) {
  emitters("edit-row", row);
}
</script>
