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
          placeholder="Search by processor name, user email, user full name"
          v-model="search"
          @keyup.enter="searchTable"
        />
      </div>
    </div>

    <div class="relative overflow-x-auto mt-10">
      <table class="w-full text-sm text-left">
        <thead class="uppercase">
          <tr>
            <th scope="col" class="px-6 py-3">order</th>
            <th scope="col" class="px-6 py-3">creation date</th>
            <th scope="col" class="px-6 py-3">invoice</th>
            <th scope="col" class="px-6 py-3">processor</th>
            <th scope="col" class="px-6 py-3">currency</th>
            <th scope="col" class="px-6 py-3">gross amount</th>
            <th scope="col" class="px-6 py-3">fees</th>
            <th scope="col" class="px-6 py-3">net amount</th>
            <th scope="col" class="px-6 py-3">amount conversion</th>
            <th scope="col" class="px-6 py-3">receive url</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="hover:bg-gray-50"
            v-for="(row, index) in props.paymentsData?.payments"
            :key="index"
          >
            <td class="px-4 py-4">{{ index + 1 }}</td>
            <td class="px-4 py-4 capitalize">{{ convertDate(row.created) }}</td>
            <td class="px-4 py-4">{{ row.invoice }}</td>
            <td class="px-4 py-4">
              <div class="flex justify-start items-center">
                <img
                  :src="urlApi + '/uploads/' + row.processor[0].image"
                  alt=""
                  class="mr-2 w-5"
                />
                <span class="font-bold">{{ row.processor[0].name }}</span>
              </div>
            </td>
            <td class="px-4 py-4">{{ row.currency }}</td>
            <td class="px-4 py-4">{{ row.amount }}</td>
            <td class="px-4 py-4">{{ row.fee }}</td>
            <td class="px-4 py-4">{{ row.net_amount }}</td>
            <td class="px-4 py-4">{{ row.amount_conversion }}</td>
            <td class="px-4 py-4">{{ row.receipt_url }}</td>
          </tr>
        </tbody>
      </table>

      <div class="optionsTable flex justify-between mt-8 mb-10">
        <span>{{ paymentsData.count }} Results</span>
        <div class="flex">
          <button
            class="btnContentHeader1 mr-5"
            v-show="paymentsData.hasPreviousPage"
            @click="previousPage"
          >
            <img
              src="~/assets/playground_assets/arrowleftline4884-80z7.svg?url"
            />
            <span> Previous </span>
          </button>
          <button
            class="btnContentHeader1 mr-5"
            v-show="paymentsData.hasNextPage"
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
import { PaymentsDashboardPagination } from "~/interfaces/paymentsDashboard";
import { Payments } from "~/interfaces/paymentsDashboard";
const props = defineProps({
  paymentsData: {
    type: Object as () => PaymentsDashboardPagination,
    default: {
      Payments: [],
    },
  },
});
const search = ref("");

const emitters = defineEmits([
  "next-page",
  "previous-page",
  "search-table",
  "edit-site-modal",
  "change-active",
  "delete-site",
]);

function searchTable() {
  emitters("search-table", search.value);
}

function nextPage() {
  emitters("next-page", props.paymentsData.nextPage);
}

function previousPage() {
  emitters("previous-page", props.paymentsData.previousPage);
}
function convertDate(isoDate: string) {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}
</script>
