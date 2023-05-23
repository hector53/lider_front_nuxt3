<template>
  <div
    class="tableDashboard container max-w-8xl py-3 mt-7 mx-auto flex flex-col"
  >
    <div class="optionsTable flex justify-between">
      <div class="flex">
        <button class="btnContentHeader1 mr-5">
          <img src="~/assets/playground_assets/calendarline4865-l7i.svg?url" />
          <span> Date range </span>
        </button>
        <button class="btnContentHeader1 mr-5">
          <img src="~/assets/playground_assets/flagline4865-rck.svg?url" />
          <span> Status </span>
        </button>
      </div>

      <div class="input-search-tables">
        <img src="~/assets/playground_assets/search2line4865-uffr.svg?url" />
        <input
          type="search"
          class="search-input"
          placeholder="Search by email or name"
          v-model="search"
          @keyup.enter="searchTable"
        />
      </div>
    </div>

    <div class="relative overflow-x-auto mt-10">
      <table class="w-full text-sm text-left">
        <thead class="uppercase">
          <tr>
            <th scope="col" class="px-4 py-3 text-lef">Name</th>
            <th scope="col" class="px-4 py-3 text-center">Type</th>
            <th scope="col" class="px-4 py-3 text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="hover:bg-gray-50"
            v-for="(row, index) in props.templates.templates"
            :key="index"
          >
            <td class="px-4 py-4 capitalize">{{ row.name }}</td>
            <td class="px-4 py-4 text-center">
              <span  v-if="row.type == 1">Individual</span>
              <span  v-if="row.type == 2">Multiple</span>
              <span  v-if="row.type == 3">Success</span>
            </td>
            <td class="px-4 py-4">
              <div class="flex justify-end items-center">
                <button class="btnContentHeader1 mr-5" @click="editModal(row)">
                  <img
                    src="~/assets/playground_assets/pencilfill9110-b58h.svg?url"
                  />
                  <span> Edit </span>
                </button>
                <button
                  class="btnContentHeader1 mr-5"
                  @click="deleteTemplate(row._id)"
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

      <div class="optionsTable flex justify-between mt-8 mb-10">
        <span>{{ templates.count }} Results</span>
        <div class="flex">
          <button
            class="btnContentHeader1 mr-5"
            v-show="templates.hasPreviousPage"
            @click="previousPage"
          >
            <img
              src="~/assets/playground_assets/arrowleftline4884-80z7.svg?url"
            />
            <span> Previous </span>
          </button>
          <button
            class="btnContentHeader1 mr-5"
            v-show="templates.hasNextPage"
            @click="nextPage"
          >
            <img
              src="~/assets/playground_assets/arrowrightline4884-9q.svg?url"
            />
            <span> Next </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TemplatePagination } from "~/interfaces/templates";
import { Template } from "~/interfaces/templates";
const props = defineProps({
  templates: {
    type: Object as () => TemplatePagination,
    default: {
      templates: [],
    },
  },
});
const search = ref("");
const emitters = defineEmits([
  "next-page",
  "previous-page",
  "search-table",
  "edit-modal",
  "delete-template",
]);

function deleteTemplate(id: string | undefined) {
  emitters("delete-template", id);
}

function editModal(row: Template) {
  emitters("edit-modal", row);
}

function searchTable() {
  emitters("search-table", search.value);
}

function nextPage() {
  emitters("next-page", props.templates.nextPage);
}

function previousPage() {
  emitters("previous-page", props.templates.previousPage);
}
</script>

<style scoped></style>
