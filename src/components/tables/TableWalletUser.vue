<template>
  <div
    class="tableDashboard container max-w-8xl py-3 mt-7 mx-auto flex flex-col"
  >
    <div class="relative overflow-x-auto mt-10">
      <table class="w-full text-sm text-left">
        <thead class="uppercase">
          <tr>
            <th scope="col" class="px-4 py-3 text-lef">Creation date</th>
            <th scope="col" class="px-4 py-3 text-center">Status</th>
            <th scope="col" class="px-4 py-3 text-center">Wallet type</th>
            <th scope="col" class="px-4 py-3 text-center">Wallet address</th>
            <th scope="col" class="px-4 py-3 text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-4 capitalize">
              {{ convertDate(props.row.created) }}
            </td>
            <td class="px-4 py-4 capitalize">
              <div v-if="props.row.active" class="status-badge success">
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
                v-if="props.row.type == 1"
                class="flex justify-center items-center"
              >
                <img
                  :src="urlApi + '/uploads/icons/bank.png'"
                  alt=""
                  class="mr-2 w-5"
                />
                <span>Bank transfer</span>
              </div>
              <div v-if="props.row.type == 2" class="">
                <div class="flex justify-center items-center">
                  <img
                    :src="
                      urlApi +
                      '/uploads/icons/' +
                      props.row.typeEwallet +
                      '.png'
                    "
                    alt=""
                    class="mr-2 w-5"
                  />
                  <span style="text-transform: uppercase">{{
                    props.row.typeEwallet
                  }}</span>
                </div>
              </div>

              <div v-if="props.row.type == 3" class="">
                <div class="flex justify-center items-center">
                  <img
                    :src="
                      urlApi +
                      '/uploads/icons/' +
                      props.row.detailsCrypto.currency +
                      '.png'
                    "
                    alt=""
                    class="mr-2 w-5"
                  />
                  <span style="text-transform: uppercase">{{
                    props.row.detailsCrypto.currency
                  }}</span>
                </div>
              </div>
            </td>
            <td class="px-4 py-4 text-center">{{ props.row.wallet }}</td>

      

            <td class="px-4 py-4">
              <div class="flex justify-end items-center">
                <button
                  class="btnContentHeader1 mr-5"
                  @click="editWalletModal(row)"
                >
                  <img
                    src="~/assets/playground_assets/pencilfill9110-b58h.svg?url"
                  />
                  <span> Edit </span>
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
import { Wallet } from "~/interfaces/wallet";
const props = defineProps({
  row: {
    type: Object as () => Wallet,
    default: {},
  },
});
const emitters = defineEmits(["edit-wallet-modal"]);
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

function editWalletModal(row: Wallet) {
  emitters("edit-wallet-modal", row);
}
</script>

<style scoped></style>
