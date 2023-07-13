<template>
  <div>
    <ModalStatic
      :idModal="'modalDetails'"
      :title="'Details'"
      :showBtns="false"
      @hide-modal="hideModal()"
    >
      <template #content>
        <div style="color: #414552; line-height: 2.5" class="mb-3">
          <div class="flex justify-between">
            <div class="">Status</div>
            <div class="">
              <block-status-withdraws
                :status="data.rowDetail.status"
              ></block-status-withdraws>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="">Date</div>
            <div class="">{{ convertDate(data.rowDetail.created) }}</div>
          </div>
          <div class="flex justify-between">
            <div class="">Wallet type</div>
            <div class="">
              <wallet-type :wallet="data.rowDetail.wallet"></wallet-type>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="">Amount</div>
            <div class="">
              <span class="font-bold">${{ data.rowDetail.amount }}</span>
              <span class="uppercase grayCurrency">{{
                data.rowDetail.currency
              }}</span>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="">Address</div>
            <div class="">
              <div class="flex justify-center items-center">
                <span class="mr-3">{{ convertWallet() }}</span>
                <div class="flex justify-center items-center">
                  <img
                    class="cursor-pointer"
                    @click="copiarWallet(data.rowDetail.wallet.wallet)"
                    src="~/assets/playground_assets/file-copy-2-fill.svg?url"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="">ID</div>
            <div class="">{{ data.rowDetail._id }}</div>
          </div>
          <div class="flex justify-between">
            <div class="">Site</div>
            <div class="">{{ data.rowDetail.site }}</div>
          </div>
          <div class="flex justify-between">
            <div class="">Txid</div>
            <div class="">{{ data.rowDetail.txid }}</div>
          </div>
        </div>
      </template>
    </ModalStatic>

    <ModalStatic
      :idModal="'modalChangeStatus'"
      :title="'Change status'"
      :btnSave="'Update'"
      @submit-form="submitFormStatus()"
      @hide-modal="hideModalStatus()"
    >
      <template #content>
        <form>
          <div class="mb-6 flex justify-between items-center">
            <h2 class="mb-2">Status</h2>
            <select
              id="status"
              v-model="data.rowDetail.status"
              class="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
            >
              <option value="0">Pending</option>
              <option value="1">Approved</option>
              <option value="2">In progress</option>
              <option value="3">Blocked</option>
            </select>
          </div>
          <div class="mb-6 relative" v-if="data.rowDetail.status == 1">
            <h2 class="mb-2">Txid</h2>
            <input
              type="text"
              id="txid"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter txid"
              name="txid"
              v-model="data.rowDetail.txid"
            />
          </div>
        </form>
      </template>
    </ModalStatic>

    <BlockContentHeader>
      <template #title> Withdraws </template>
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

    <table-withdraws
      v-if="data.showTable"
      :withdraws="data.withdraws"
      @next-page="nextPage"
      @previous-page="previousPage"
      @search-table="searchTable"
      @view-details-modal="viewDetails"
      @click-status="clickStatus"
    ></table-withdraws>
  </div>
</template>

<script setup lang="ts">
import { Modal } from "flowbite";
import type { ModalOptions } from "flowbite";
import { required, helpers, email, url, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import { Wallet, WalletPagination } from "~/interfaces/wallet";
import { WithdrawUser, WithdrawsUserPagination } from "~/interfaces/withdraws";
import { showToast } from "~/composables/toastLiderPro";
const { $swal } = useNuxtApp();
const formHttpError = ref("");
const editForm = ref(false);
const idEditRow = ref("");
const modal = ref();
const modalStatus = ref();

const data = reactive({
  wallet: {} as Wallet,
  available: 0,
  showTable: false,
  withdraws: {} as () => WithdrawsUserPagination,
  search: "",
  limit: 10,
  page: 1,
  rowDetail: {} as WithdrawUser,
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
      showToast("Withdraw add successfully", "bottom", 3000)
      await get_withdraws();
      modal.value.hide();
    } else {
      modal.value.hide();
      //@ts-ignore
     // $toast.danger(response.error.value.message);
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
      allWithdraws(page:${data.page}, limit:${data.limit}, search:"${data.search}"){
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
    data.withdraws = response.data.value.allWithdraws;

    data.showTable = true;
  } catch (e) {
    console.log("error", e);
  }
}
function viewDetails(row: WithdrawUser) {
  console.log("row", row);
  data.rowDetail = row;
  modal.value.show();
}
function clickStatus(row: WithdrawUser) {
  data.rowDetail = row;
  modalStatus.value.show();
}

async function submitFormStatus() {
  try {

    const mutation = gql`
    mutation{
  updateStatusWithdraw(id:"${data.rowDetail._id}", status:${data.rowDetail.status}, 
      txid: "${data.rowDetail.txid}"
    ){
    _id
    status
  }
}
    `;
    const response = await useAsyncQuery(mutation);
    console.log("response", response);
    if (response.data.value != null) {
      showToast("status updated successfully", "bottom", 3000)
      await get_withdraws();
      modalStatus.value.hide();
    } else {
      //@ts-ignore
      formHttpError.value = response.error.value.message;
     // $toast.danger(response.error.value.message);
    }
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}

function hideModalStatus() {
  modalStatus.value.hide();
}
onMounted(() => {
  const $modalElement: any = document.querySelector("#modalDetails");

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

  const $modalElementStatus: any = document.querySelector("#modalChangeStatus");
  const modalOptionsStatus: ModalOptions = {
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
  modalStatus.value = new Modal($modalElementStatus, modalOptionsStatus);
  nextTick(async () => {
    await get_withdraws();
  });
});
function convertDate(isoDate: string) {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}
function convertWallet() {
  if (data.rowDetail.wallet) {
    let str: string | any = data.rowDetail.wallet.wallet;
    // Obtener los primeros y últimos caracteres del string
    let firstChars = str.substring(0, 12); // "1LMWkh"
    let lastChars = str.substring(str.length - 12); // "qEN2VE"
    // Concatenar los primeros y últimos caracteres con ".."
    let result = firstChars + "..." + lastChars; // "1LMWkh..qEN2VE"
    return result;
  }
  return "";
}
function copiarWallet(wallet: string | null) {
  if (wallet != null) {

    navigator.clipboard
      .writeText(wallet) // Copiar al portapapeles
      .then(() => {
        showToast("copy successfully", "bottom", 3000)
      })
      .catch((error) => {
        console.error("Error al copiar la wallet:", error);
      });
  }
}
</script>

<style scoped></style>
