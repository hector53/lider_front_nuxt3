<template>
  <div
    class="tableDashboard container max-w-8xl py-3 mt-7 mx-auto flex flex-col"
  >
    <div class="relative overflow-x-auto mt-10">
      <table class="w-full text-sm text-left">
        <thead class="uppercase">
          <tr>
            <th scope="col" class="px-6 py-3 text-lef">Processor</th>
            <th scope="col" class="px-6 py-3 text-lef">Status</th>
            <th scope="col" class="px-6 py-3 text-center">Public key</th>
            <th scope="col" class="px-6 py-3 text-center">Private key</th>
            <th scope="col" class="px-6 py-3 text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="hover:bg-gray-50"
            v-for="(row, index) in props.rows"
            :key="index"
          >
            <td class="px-6 py-4 capitalize">
              <div class="flex justify-start items-center">
                <img
                  :src="urlApi + '/uploads/' + row.processor_image"
                  alt=""
                  class="mr-2 w-5"
                />
                <span class="font-bold">{{ row.processor_name }}</span>
              </div>
            </td>
            <td class="px-6 py-4 capitalize">
              <span
                v-if="row.active"
                class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                Active
              </span>

              <span
                v-else
                class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
              >
                <span class="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                Disable
              </span>
            </td>
            <td class="px-6 py-4">{{ row.public_key }}</td>
            <td class="px-6 py-4">{{ row.private_key }}</td>
            <td class="px-6 py-4">
              <div class="flex justify-center items-center">
                <toggle-check
                  :checked="row.active"
                  @change="changeStatusProcessor(row._id, row.active)"
                  class="mr-5"
                ></toggle-check>
                <button class="btnContentHeader1 mr-5" @click="editRow(row)">
                  <img
                    src="~/assets/playground_assets/pencilfill9110-b58h.svg?url"
                  />
                  <span> Edit </span>
                </button>
                <button
                  class="btnContentHeader1 mr-5"
                  @click="deleteRow(row._id)"
                >
                  <img
                    src="~/assets/playground_assets/delete-bin-4-fill.svg?url"
                  />
                  <span> Delete </span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProcessorsDomain } from "~/interfaces/processorsDomain";
const props = defineProps({
  rows: {
    type: Array as () => ProcessorsDomain[],
  },

});
const emitters = defineEmits([
  "change-status-processor",
  "delete-row",
  "edit-row",
]);

function changeStatusProcessor(id?: string, active?: boolean) {
  emitters("change-status-processor", id, active);
}
function deleteRow(id?: string) {
  emitters("delete-row", id);
}
function editRow(row: ProcessorsDomain) {
  emitters("edit-row", row);
}
</script>
