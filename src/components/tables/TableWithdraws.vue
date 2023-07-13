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
            <th scope="col" class="px-4 py-3 text-center">Creation date</th>
            <th scope="col" class="px-4 py-3 text-center">Status</th>
            <th scope="col" class="px-4 py-3 text-center">Site</th>
            <th scope="col" class="px-4 py-3 text-center">Wallet type</th>
            <th scope="col" class="px-4 py-3 text-center">Wallet address</th>
            <th scope="col" class="px-4 py-3 text-center">Amount</th>
            <th scope="col" class="px-4 py-3 text-center">Txid</th>
            <th scope="col" class="px-4 py-3 text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="hover:bg-gray-50"
            v-for="(row, index) in props.withdraws.withdraws"
            :key="index"
          >
            <td class="px-4 py-4 capitalize text-center">
              {{ convertDate(row.created) }}
            </td>
            <td class="px-4 py-4 capitalize">
              <block-status-withdraws
              @click-status="clickStatus(row)"
                :status="row.status"
              ></block-status-withdraws>
            </td>
            <td class="px-4 py-4 text-center">{{ row.site }}</td>
            <td class="px-4 py-4">
             <wallet-type :wallet="row.wallet" ></wallet-type>
            </td>

            <td class="px-4 py-4 text-center">
              <div class="flex justify-center items-center">
                <span class="mr-3">{{ convertWallet(row.wallet.wallet) }}</span>
                <div class="flex justify-center items-center">
                
                  <img
                    class="cursor-pointer"
                    @click="copiarWallet(row.wallet.wallet)"
                    src="~/assets/playground_assets/file-copy-2-fill.svg?url"
                  />
                </div>
              </div>
            </td>
            <td class="px-4 py-4 text-center"><span class="font-bold">${{ row.amount }}</span> <span class="uppercase grayCurrency">{{ row.currency  }}</span></td>
            <td class="px-4 py-4 text-center">
              <div class="flex justify-center items-center">
                <span class="mr-3">{{ row.txid }}</span>
                <div class="flex justify-center items-center">
                
                  <img @click="copiarWallet(row.txid)"
                    class="mr-2 cursor-pointer"
                    src="~/assets/playground_assets/links-line.svg?url"
                  />
                </div>
              </div>
            </td>
            <td class="px-4 py-4">
              <div class="flex justify-center items-center">
                <button
                  class="btnContentHeader1 mr-5"
                  @click="viewDetails(row)"
                >
                  <img
                    src="~/assets/playground_assets/eye-fill.svg?url"
                  />
                  <span> View details </span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="optionsTable flex justify-between mt-8 mb-10">
        <span>{{ withdraws.count }} Results</span>
        <div class="flex">
          <button
            class="btnContentHeader1 mr-5"
            v-show="withdraws.hasPreviousPage"
            @click="previousPage"
          >
            <img
              src="~/assets/playground_assets/arrowleftline4884-80z7.svg?url"
            />
            <span> Previous </span>
          </button>
          <button
            class="btnContentHeader1 mr-5"
            v-show="withdraws.hasNextPage"
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

import { showToast } from "~/composables/toastLiderPro";
import { WithdrawsUserPagination, WithdrawUser } from "~/interfaces/withdraws";
const props = defineProps({
  withdraws: {
    type: Object as () => WithdrawsUserPagination,
    default: {
      withdraws: [],
    },
  },
});
const search = ref("");

const emitters = defineEmits([
  "next-page",
  "previous-page",
  "search-table",
  "view-details-modal",
  "click-status"
]);

function convertWallet(wallet: string  | any) {
  let str = wallet;
  // Obtener los primeros y últimos caracteres del string
  let firstChars = str.substring(0, 6); // "1LMWkh"
  let lastChars = str.substring(str.length - 6); // "qEN2VE"
  // Concatenar los primeros y últimos caracteres con ".."
  let result = firstChars + "..." + lastChars; // "1LMWkh..qEN2VE"
  return result;
}

function copiarWallet(wallet: string | any) {
   
  navigator.clipboard
    .writeText(wallet) // Copiar al portapapeles
    .then(() => {
      showToast("Copy successfully", "bottom", 3000)
    })
    .catch((error) => {
      console.error("Error al copiar la wallet:", error);
    });
}

function convertDate(isoDate: string) {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }
function viewDetails(row: WithdrawUser) {
  emitters("view-details-modal", row);
}

function searchTable() {
  emitters("search-table", search.value);
}

function nextPage() {
  emitters("next-page", props.withdraws.nextPage);
}

function previousPage() {
  emitters("previous-page", props.withdraws.previousPage);
}
function clickStatus(row: WithdrawUser){
  emitters("click-status", row);
}
</script>
