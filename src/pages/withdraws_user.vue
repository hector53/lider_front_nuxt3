<template>
  <div>
    <ModalStatic
      :idModal="'modalAddTransaction'"
      :title="'Transaction'"
      :btnSave="'Create'"
      @submit-form="submitForm()"
      @hide-modal="hideModal()"
    >
      <template #content>
        <form>
          <div class="mb-6 relative">
            <h2 class="mb-2">Currency</h2>
            <select
              id="type_wallet"
              disabled
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
            >
              <option value="usd">USD</option>
            </select>
          </div>

          <div class="flex items-start flex-col mb-6">
            <h2 class="mb-2">Wallet type</h2>
            <div
              v-if="data.wallet.type == 1"
              class="flex justify-center items-center"
            >
              <img
                :src="urlApi + '/uploads/icons/bank.png'"
                alt=""
                class="mr-2 w-5"
              />
              <span>Bank transfer</span>
            </div>
            <div v-if="data.wallet.type == 2" class="">
              <div class="flex justify-center items-center">
                <img
                  :src="
                    urlApi +
                    '/uploads/icons/' +
                    data.wallet.typeEwallet +
                    '.png'
                  "
                  alt=""
                  class="mr-2 w-5"
                />
                <span style="text-transform: uppercase">{{
                  data.wallet.typeEwallet
                }}</span>
              </div>
            </div>

            <div v-if="data.wallet.type == 3" class="">
              <div class="flex justify-center items-center">
                <img
                  :src="
                    urlApi +
                    '/uploads/icons/' +
                    data.wallet.detailsCrypto.currency +
                    '.png'
                  "
                  alt=""
                  class="mr-2 w-5"
                />
                <span style="text-transform: uppercase">{{
                  data.wallet.detailsCrypto.currency
                }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-start flex-col mb-6">
            <h2 class="mb-2">Wallet type</h2>
            <h1>{{ data.wallet.wallet }}</h1>
          </div>

          <div
            class="flex items-start flex-col mb-6"
            v-if="data.wallet.type == 3"
          >
            <h2 class="mb-2">Red</h2>
            <h1>{{ data.wallet.detailsCrypto.red }}</h1>
          </div>

          <div class="mb-6 relative">
            <h2 class="mb-2">Amount</h2>
            <input
              type="number"
              id="amount"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter amount"
              name="amount"
              v-model="form.amount"
              @blur="v$.amount.$touch"
              :class="{
                'border-red-500 focus:border-red-500': v$.amount.$error,
              }"
            />
            <div v-if="v$.amount.$error">
              <ul>
                <li
                  v-for="(error, index) in v$.amount.$errors"
                  :key="index"
                  class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                  {{ error.$message }}
                </li>
              </ul>
            </div>
            <div
              class="mt-2 text-sm text-red-600 dark:text-red-500"
              v-if="v$.amount.notZero.$invalid"
            >
              The value cannot be 0
            </div>
          </div>

          <div
            v-if="formHttpError != ''"
            class="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold">Error:</strong>
            <span class="block sm:inline">{{ formHttpError }}</span>
          </div>
        </form>
      </template>
    </ModalStatic>
    <BlockContentHeader>
      <template #title>
        Withdraws / {{ data.available }}
        <span style="color: #95969b; font-size: 26px; font-weight: 500"
          >available</span
        ></template
      >
      <template #options>
        <button
          class="btnContentHeader1 mr-5"
          @click="abrirModal()"
          v-if="payloadToken.r == 'user'"
        >
          <img
            src="~/assets/playground_assets/usersharedline7476-sslo.svg?url"
          />
          <span> New </span>
        </button>
        <button class="btnContentHeader1">
          <img src="~/assets/playground_assets/downloadfill4860-dq2w.svg?url" />
          <span> Download Report </span>
        </button>
      </template>
    </BlockContentHeader>

    <table-withdraws-user
      v-if="data.showTable"
      :withdraws="data.withdraws"
      @next-page="nextPage"
      @previous-page="previousPage"
      @search-table="searchTable"
      @edit-withdraw-modal="editWithdrawModal"
    ></table-withdraws-user>
  </div>
</template>

<script setup lang="ts">
import { Modal } from "flowbite";
import type { ModalOptions } from "flowbite";
import { required, helpers, email, url, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useToast, useModal } from "tailvue";
import { Wallet, WalletPagination } from "~/interfaces/wallet";
import { WithdrawsUserPagination } from "~/interfaces/withdraws";
const { $swal } = useNuxtApp();
const formHttpError = ref("");
const editForm = ref(false);
const idEditRow = ref("");
const modal = ref();
const modalEditSite = ref();

const data = reactive({
  wallet: {} as Wallet,
  available: 0,
  showTable: false,
  withdraws: {} as () => WithdrawsUserPagination,
  search: "",
  limit: 10,
  page: 1,
});

const form = reactive({
  amount: 0,
});

const rules = computed(() => {
  return {
    amount: {
      required: helpers.withMessage("The amount field is required", required),
      notZero(value: number) {
        return value !== 0;
      },
    },
  };
});
const v$ = useVuelidate(rules, form);

async function create_transaction() {
  try {
    const $toast = useToast();

    const mutation = gql`
    mutation{
  createWithdraw(createWithdrawInput:{
    site:""
    currency:"usd"
    amount:${form.amount}
    wallet:{
      type: ${data.wallet.type}
    wallet:"${data.wallet.wallet}"
    detailsCrypto:{
      currency: "${data.wallet.detailsCrypto.currency}"
      red: "${data.wallet.detailsCrypto.red}"
    }
    detailsWire:{
      payee_name:"${data.wallet.detailsWire.payee_name}"
      type_payee:"${data.wallet.detailsWire.type_payee}"
      address:"${data.wallet.detailsWire.address}"
      apt_or_suite:"${data.wallet.detailsWire.apt_or_suite}"
      bank_name:"${data.wallet.detailsWire.bank_name}"
      routing_number:"${data.wallet.detailsWire.routing_number}"
    }
    typeEwallet:"${data.wallet.typeEwallet}"
    }
    user_id:"${payloadToken.id}"
  }){
    _id
    
  }
      }
    `;
    const response = await useAsyncQuery(mutation);
    console.log("response", response);
    if (response.data.value != null) {
      $toast.success("wallet add successfully");
      await get_withdraws();
      modal.value.hide();
    } else {
      modal.value.hide();
      //@ts-ignore
      $toast.danger(response.error.value.message);
    }
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}

async function submitForm() {
  console.log("submit form");
  v$.value.$validate();
  if (!v$.value.$error) {
    console.log("todo bien validado");
    await create_transaction();
  } else {
    console.log("no esta bien validado");
  }
}

function hideModal() {
  modal.value.hide();
}

async function get_wallet_by_user() {
  const query = gql`
    query {
      getWalletUser(user_id: "${payloadToken.id}") {
        _id
        type
        wallet
        detailsWire {
          payee_name
          type_payee
          address
          apt_or_suite
          bank_name
          routing_number
        }
        detailsCrypto {
          currency
          red
        }
        typeEwallet
        active
        created
      }
    }
  `;
  try {
    const response = await useAsyncQuery(query);
    console.log("respise", response);
    //@ts-ignore
    data.wallet = response.data.value.getWalletUser;
    console.log("wallets", data.wallet);
  } catch (e) {
    console.log("error", e);
  }
}

async function abrirModal() {
  await get_wallet_by_user();
  modal.value.toggle();
}

async function get_withdraws() {
  const query = gql`
    query {
      availableByUser(id: "${payloadToken.id}")
       withdrawsByUser(page:${data.page}, limit:${data.limit}, search:"${data.search}", userId: "${payloadToken.id}"){
        withdraws{
          _id
          site
          currency
          amount
          status
          created
          user_id
          txid
          wallet{
            type
        wallet
        detailsWire{
          payee_name
          type_payee
          address
          apt_or_suite
          bank_name
          routing_number
        }
        detailsCrypto{
          currency
          red
        }
        typeEwallet
          }
      }
        count
        totalPages
        hasNextPage
        hasPreviousPage
        nextPage
        previousPage
      }
    }
  `;
  try {
    const response = await useAsyncQuery(query);
    console.log("respise", response);
    //@ts-ignore
    data.available = response.data.value.availableByUser;
    //@ts-ignore
    data.withdraws = response.data.value.withdrawsByUser;

    data.showTable = true;
  } catch (e) {
    console.log("error", e);
  }
}
onMounted(() => {
  const $modalElement: any = document.querySelector("#modalAddTransaction");
  const modalOptions: ModalOptions = {
    placement: "center",
    backdrop: "static",
    backdropClasses:
      "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
    closable: true,
    onHide: () => {
      console.log("modal is hidden");
    },
    onShow: () => {
      console.log("modal is shown");
    },
    onToggle: () => {
      console.log("modal has been toggled");
    },
  };
  modal.value = new Modal($modalElement, modalOptions);
  nextTick(async () => {
    await get_withdraws();
  });
});
</script>

<style scoped></style>
