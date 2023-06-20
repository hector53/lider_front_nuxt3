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
            <th scope="col" class="px-4 py-3 text-lef">Creation date</th>
            <th scope="col" class="px-4 py-3 text-center">Status</th>
            <th scope="col" class="px-4 py-3 text-center">Wallet type</th>
            <th scope="col" class="px-4 py-3 text-center">Wallet address</th>
            <th scope="col" class="px-4 py-3 text-center">User</th>
            <th scope="col" class="px-4 py-3 text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="hover:bg-gray-50"
            v-for="(row, index) in props.wallets?.wallets"
            :key="index"
          >
            <td class="px-4 py-4 capitalize">{{ convertDate(row.created) }}</td>
            <td class="px-4 py-4 capitalize">
              <div v-if="row.active" class="status-badge success">
                <div class="status-image">
                  <img
                    src="~/assets/playground_assets/fillcheckcirclei215-pa9.svg?url"
                  />
                </div>
                <span>Active</span>
              </div>

              <div v-else class="status-badge error">
                <div class="status-image">
                  <img
                    src="~/assets/playground_assets/fillprohibiti215-rxr9.svg?url"
                  />
                </div>
                <span>Disable</span>
              </div>
            </td>
            <td class="px-4 py-4 text-center">
              <div
                v-if="row.type == 1"
                class="flex justify-center items-center"
              >
                <img
                  :src="urlApi + '/uploads/icons/bank.png'"
                  alt=""
                  class="mr-2 w-5"
                />
                <span>Bank transfer</span>
              </div>
              <div v-if="row.type == 2" class="">
                <div class="flex justify-center items-center">
                  <img
                    :src="urlApi + '/uploads/icons/' + row.typeEwallet + '.png'"
                    alt=""
                    class="mr-2 w-5"
                  />
                  <span style="text-transform: uppercase">{{
                    row.typeEwallet
                  }}</span>
                </div>
              </div>

              <div v-if="row.type == 3" class="">
                <div class="flex justify-center items-center">
                  <img
                    :src="
                      urlApi +
                      '/uploads/icons/' +
                      row.detailsCrypto.currency +
                      '.png'
                    "
                    alt=""
                    class="mr-2 w-5"
                  />
                  <span style="text-transform: uppercase">{{
                    row.detailsCrypto.currency
                  }}</span>
                </div>
              </div>
            </td>
            <td class="px-4 py-4 text-center">{{ row.wallet }}</td>

            <td class="px-4 py-4 text-center">
              {{ row.user }} @ {{ reemplazarUrl(row.site) }}
            </td>

            <td class="px-4 py-4">
              <div class="flex justify-end items-center">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    :checked="row.active"
                    @change="changeStatusWallet(row._id, row.active)"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  ></div>
                  <span
                    class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  ></span>
                </label>
                <button
                  class="btnContentHeader1 mr-5"
                  @click="editWalletModal(row)"
                >
                  <img
                    src="~/assets/playground_assets/pencilfill9110-b58h.svg?url"
                  />
                  <span> Edit </span>
                </button>
                <button
                  class="btnContentHeader1 mr-5"
                  @click="deleteWallet(row._id)"
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
        <span>{{ wallets.count }} Results</span>
        <div class="flex">
          <button
            class="btnContentHeader1 mr-5"
            v-show="wallets.hasPreviousPage"
            @click="previousPage"
          >
            <img
              src="~/assets/playground_assets/arrowleftline4884-80z7.svg?url"
            />
            <span> Previous </span>
          </button>
          <button
            class="btnContentHeader1 mr-5"
            v-show="wallets.hasNextPage"
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
import { Wallet, WalletPagination } from "~/interfaces/wallet";
const props = defineProps({
  wallets: {
    type: Object as () => WalletPagination,
    default: {
      wallets: [],
    },
  },
});
const search = ref("");

const emitters = defineEmits([
  "next-page",
  "previous-page",
  "search-table",
  "edit-wallet-modal",
  "change-active",
  "delete-wallet",
]);
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

function deleteWallet(id: string | undefined) {
  emitters("delete-wallet", id);
}

function editWalletModal(row: Wallet) {
  emitters("edit-wallet-modal", row);
}

function changeStatusWallet(id: string | undefined, active: boolean) {
  emitters("change-active", id, active);
}

function searchTable() {
  emitters("search-table", search.value);
}

function nextPage() {
  emitters("next-page", props.wallets.nextPage);
}

function previousPage() {
  emitters("previous-page", props.wallets.previousPage);
}
function reemplazarUrl(url: string) {
  if (url != null) {
    let urlG = url;
    urlG = urlG.replace(/^https?:\/\//, "");
    return urlG;
  } else {
    return "";
  }
}
</script>

<style scoped></style>
