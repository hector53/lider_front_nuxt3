<template>
  <div>
    <ModalStatic
      :idModal="'modalAddWallet'"
      :title="'Wallet'"
      :btnSave="'Update Wallet'"
      @submit-form="submitForm()"
      @hide-modal="hideModal()"
    >
      <template #content>
        <form>
          <div class="mb-6 relative">
            <label for="site" class="font-normal text-sm">Type wallet</label>
            <select
              id="type_wallet"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              v-model="form.type"
              @blur="v$.type.$touch"
              :class="{
                'border-red-500 focus:border-red-500': v$.type.$error,
              }"
            >
              <option :value="null">Select</option>
              <option value="1">Bank - wire transfer</option>
              <option value="2">eWallet</option>
              <option value="3">Crypto</option>
            </select>
            <div v-if="v$.type.$error">
              <ul>
                <li
                  v-for="(error, index) in v$.type.$errors"
                  :key="index"
                  class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                  {{ error.$message }}
                </li>
              </ul>
            </div>
          </div>

          <div v-if="form.type == 1">
            <div class="mb-6 relative">
              <label for="payee_name" class="font-normal text-sm"
                >Payee name</label
              >
              <input
                type="text"
                id="payee_name"
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
                placeholder="Enter a payee_name"
                name="payee_name"
                v-model="form.detailsWire.payee_name"
              />
            </div>

            <div class="flex mb-6">
              <div class="flex items-center mr-4">
                <input
                  id="inline-radio"
                  type="radio"
                  value="Business"
                  v-model="form.detailsWire.type_payee"
                  name="inline-radio-group"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="inline-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Business</label
                >
              </div>
              <div class="flex items-center mr-4">
                <input
                  id="inline-2-radio"
                  type="radio"
                  value="Person"
                  v-model="form.detailsWire.type_payee"
                  name="inline-radio-group"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="inline-2-radio"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Person</label
                >
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 mb-6">
              <div class="relative">
                <label for="address" class="font-normal text-sm">Address</label>
                <input
                  type="text"
                  id="address"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
                  placeholder="Enter a address"
                  name="address"
                  v-model="form.detailsWire.address"
                />
              </div>

              <div class="relative">
                <label for="apt_or_suite" class="font-normal text-sm"
                  >Apt or suite #</label
                >
                <input
                  type="text"
                  id="apt_or_suite"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
                  placeholder="Enter a apt_or_suite"
                  name="apt_or_suite"
                  v-model="form.detailsWire.apt_or_suite"
                />
              </div>
            </div>

            <h2>Payee bank details</h2>
            <p class="mb-6">Required for ACH or wire payments</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 mb-6">
              <div class="relative">
                <label for="bank_name" class="font-normal text-sm"
                  >Bank name</label
                >
                <input
                  type="text"
                  id="bank_name"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
                  placeholder="Enter a bank_name"
                  name="bank_name"
                  v-model="form.detailsWire.bank_name"
                />
              </div>

              <div class="relative">
                <label for="routing_number" class="font-normal text-sm"
                  >Routing number</label
                >
                <input
                  type="text"
                  id="routing_number"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
                  placeholder="Enter a routing_number"
                  name="routing_number"
                  v-model="form.detailsWire.routing_number"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 mb-6">
              <div class="relative">
                <label for="account_number" class="font-normal text-sm"
                  >Bank account number</label
                >
                <input
                  type="text"
                  id="account_number"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
                  placeholder="Enter a account_number"
                  name="account_number"
                  v-model="form.wallet"
                />
              </div>

              <div class="relative">
                <label for="confirm_wallet" class="font-normal text-sm"
                  >Confirm bank account number</label
                >
                <input
                  type="text"
                  id="confirm_wallet"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
                  placeholder="Enter a confirm account number"
                  name="confirm_wallet"
                  v-model="form.confirm_wallet"
                />
              </div>
            </div>
          </div>

          <div v-if="form.type == 2">
            <div class="mb-6 relative">
              <label for="site" class="font-normal text-sm">Ewallet</label>
              <select
                id="typeEwallet"
                v-model="form.typeEwallet"
                class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              >
                <option :value="null">Select</option>
                <option value="paypal">Paypal</option>
                <option value="payoneer">Payoneer</option>
                <option value="revolut">Revolut</option>
                <option value="wise">Wise</option>
              </select>
            </div>

            <div class="relative">
              <label for="email" class="font-normal text-sm">Emailr</label>
              <input
                type="text"
                id="email"
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
                placeholder="Enter a email"
                name="email"
                v-model="form.wallet"
              />
            </div>
          </div>

          <div v-if="form.type == 3">
            <div class="mb-6 relative">
              <label for="site" class="font-normal text-sm"
                >Cryptocurrency</label
              >
              <select
                id="currency"
                v-model="form.detailsCrypto.currency"
                class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              >
                <option :value="null">Select</option>
                <option value="usdt">USDT</option>
                <option value="busd">BUSD</option>
                <option value="usdc">USDC</option>
                <option value="tusd">TUSD</option>
                <option value="pax">PAX</option>
                <option value="btc">BTC</option>
                <option value="eth">ETH</option>
                <option value="xmr">XMR</option>
                <option value="ltc">LTC</option>
                <option value="doge">DOGE</option>
              </select>
            </div>

            <div class="mb-6 relative" v-if="get_red_by_currency()">
              <label for="site" class="font-normal text-sm">Red</label>
              <select
                id="red"
                v-model="form.detailsCrypto.red"
                class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              >
                <option :value="null">Select</option>
                <option value="erc">ERC-20</option>
                <option value="bnb">BEP-20</option>
                <option value="trc">TRC-20</option>
              </select>
            </div>

            <div class="relative">
              <label for="wallet" class="font-normal text-sm"
                >Wallet address</label
              >
              <input
                type="text"
                id="wallet"
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
                placeholder="Enter a wallet address"
                name="wallet"
                v-model="form.wallet"
              />
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
      <template #title> Wallet</template>
      <template #options>
        <button
          class="btnContentHeader1 mr-5"
          @click="abrirModal()"
          v-if="data.showBtnNew"
        >
          <img
            src="~/assets/playground_assets/usersharedline7476-sslo.svg?url"
          />
          <span> New </span>
        </button>
      </template>
    </BlockContentHeader>

    <table-wallet-user
      v-if="data.showTable"
      :row="data.wallet"
      @edit-wallet-modal="editWalletModal"
    >
    </table-wallet-user>
  </div>
</template>

<script setup lang="ts">
import { Modal } from "flowbite";
import type { ModalOptions } from "flowbite";
import { required, helpers, email, url } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useToast, useModal } from "tailvue";
import { Wallet, WalletPagination } from "~/interfaces/wallet";
const { $swal } = useNuxtApp();
const formHttpError = ref("");
const editForm = ref(false);
const idEditRow = ref("");
const modal = ref();
const modalEditSite = ref();
useHead({
  title: "Lider | Wallet",
  meta: [{ name: "description", content: "Wallet page." }],
});

const data = reactive({
  showTable: false,
  wallet: {} as Wallet,
  search: "",
  limit: 10,
  page: 1,
  showBtnNew: false,
});

const form = reactive({
  type: null,
  wallet: "",
  confirm_wallet: "",
  detailsWire: {
    payee_name: "",
    type_payee: "",
    address: "",
    apt_or_suite: "",
    bank_name: "",
    routing_number: "",
  },
  detailsCrypto: {
    currency: null,
    red: null,
  },
  typeEwallet: "",
});
const rules = computed(() => {
  return {
    type: {
      required: helpers.withMessage("The type field is required", required),
    },
    wallet: {
      required: helpers.withMessage("The field is required", required),
    },
  };
});

const v$ = useVuelidate(rules, form);

function get_red_by_currency() {
  if (
    form.detailsCrypto.currency == "usdt" ||
    form.detailsCrypto.currency == "usdc" ||
    form.detailsCrypto.currency == "tusd" ||
    form.detailsCrypto.currency == "dai" ||
    form.detailsCrypto.currency == "pax" ||
    form.detailsCrypto.currency == "busd"
  ) {
    return true;
  }
  return false;
}

async function get_wallets() {
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
    if (response.data.value != null) {
      //@ts-ignore
      data.wallet = response.data.value.getWalletUser;
      data.showTable = true;
      data.showBtnNew = false;
    } else {
      data.showBtnNew = true;
    }

    console.log("wallets", data.wallet);
  } catch (e) {
    console.log("error", e);
  }
}

async function update_wallet() {
  try {
    const $toast = useToast();

    const mutation = gql`
        mutation {
            updateWalletUser(updateWalletInput:{
            id: "${idEditRow.value}"
      type: ${form.type}
      wallet:"${form.wallet}"
      detailsCrypto:{
        currency: "${form.detailsCrypto.currency}"
        red: "${form.detailsCrypto.red}"
      }
      detailsWire:{
        payee_name:"${form.detailsWire.payee_name}"
        type_payee:"${form.detailsWire.type_payee}"
        address:"${form.detailsWire.address}"
        apt_or_suite:"${form.detailsWire.apt_or_suite}"
        bank_name:"${form.detailsWire.bank_name}"
        routing_number:"${form.detailsWire.routing_number}"
      }
      typeEwallet:"${form.typeEwallet}"
      user_id:"${payloadToken.id}"
    }){
      wallet
    }
        }
      `;
    const response = await useAsyncQuery(mutation);
    console.log("response", response);
    $toast.success("wallet add successfully");
    await get_wallets();
    modal.value.hide();
    formHttpError.value = "";
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
    await update_wallet();
  } else {
    console.log("no esta bien validado");
  }
}

function hideModal() {
  modal.value.hide();
}

function reset_form() {
  form.type = null;
  form.wallet = "";
  form.confirm_wallet = "";
  form.detailsWire.payee_name = "";
  form.detailsWire.type_payee = "";
  form.detailsWire.address = "";
  form.detailsWire.apt_or_suite = "";
  form.detailsWire.bank_name = "";
  form.detailsWire.routing_number = "";
  form.detailsCrypto.currency = null;
  form.detailsCrypto.red = null;
  form.typeEwallet = "";
}

function editWalletModal(row: Wallet) {
  idEditRow.value = row._id;
  //@ts-ignore
  form.type = row.type;
  form.wallet = row.wallet;
  form.confirm_wallet = row.confirm_wallet;
  form.detailsWire.payee_name = row.detailsWire.payee_name;
  form.detailsWire.type_payee = row.detailsWire.type_payee;
  form.detailsWire.address = row.detailsWire.address;
  form.detailsWire.apt_or_suite = row.detailsWire.apt_or_suite;
  form.detailsWire.bank_name = row.detailsWire.bank_name;
  form.detailsWire.routing_number = row.detailsWire.routing_number;
  //@ts-ignore
  form.detailsCrypto.currency = row.detailsCrypto.currency;
  //@ts-ignore
  form.detailsCrypto.red = row.detailsCrypto.red;
  form.typeEwallet = row.typeEwallet;

  modal.value.toggle();
}

function abrirModal() {
  editForm.value = false;
  reset_form();
  //@ts-ignore
  idEditRow.value = "";
  modal.value.toggle();
}

onMounted(() => {
  const $modalElement: any = document.querySelector("#modalAddWallet");
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
    await get_wallets();
  });
});
</script>

<style scoped></style>
