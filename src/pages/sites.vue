<template>
  <div>
    <ModalStatic
      :idModal="'modalSite'"
      :title="'Site'"
      :btnSave="'Create site'"
      @submit-form="submitForm()"
      @hide-modal="hideModal()"
    >
      <template #content>
        <div class="modal-info-title">
          <h2>Create new site</h2>
          <p>
            A suite of payment APIs that powers commerce for online businesses
            of all sizes
          </p>
        </div>
        <form>
          <div class="mb-6 relative">
            <label for="site" class="font-normal text-sm">Site</label>
            <input
              type="url"
              id="site"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter a site"
              name="site"
              v-model="form.site"
              @blur="v$.site.$touch"
              :class="{
                'border-red-500 focus:border-red-500': v$.site.$error,
              }"
            />
            <div v-if="v$.site.$error">
              <ul>
                <li
                  v-for="(error, index) in v$.site.$errors"
                  :key="index"
                  class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                  {{ error.$message }}
                </li>
              </ul>
            </div>
          </div>

          <div class="mb-6 relative">
            <label for="webhook" class="font-normal text-sm">Webhook</label>
            <input
              type="url"
              id="webhook"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter a webhook"
              name="webhook"
              v-model="form.webhook"
              @blur="v$.webhook.$touch"
              :class="{
                'border-red-500 focus:border-red-500': v$.webhook.$error,
              }"
            />
            <div v-if="v$.webhook.$error">
              <ul>
                <li
                  v-for="(error, index) in v$.webhook.$errors"
                  :key="index"
                  class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                  {{ error.$message }}
                </li>
              </ul>
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

    <ModalStatic
      :idModal="'modalEditSite'"
      :title="'Edit site'"
      @submit-form="submitFormEditSite()"
      @hide-modal="hideModalEditSite()"
    >
      <template #content>
        <form>
          <div class="mb-6 relative">
            <label for="site" class="font-normal text-sm">Site</label>
            <input
              type="url"
              id="site"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter a site"
              name="site"
              v-model="formEditSite.site.site"
            />
          </div>

          <div class="mb-6 relative">
            <label for="site" class="font-normal text-sm">Name store</label>
            <input
              type="url"
              id="site"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter a name store"
              name="site"
              v-model="formEditSite.site.nameStore"
            />
          </div>

          <div class="mb-6 relative">
            <label for="amounts" class="font-normal text-sm">Amounts</label>
            <input
              type="text"
              id="amounts"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter amounts"
              name="amounts"
              v-model="formEditSite.site.amounts"
            />
          </div>
          <div class="mb-6 relative flex justify-between items-center">
            <label for="fee_quantity" class="font-normal text-sm"
              >Fee Quantity</label
            >
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                class="sr-only peer"
                v-model="formEditSite.site.fee_quantity"
              />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
              ></div>
              <span
                class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              ></span>
            </label>
          </div>

          <div class="mb-6 relative">
            <label for="webhook" class="font-normal text-sm">Wehbook</label>
            <input
              type="url"
              id="webhook"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter a webhook"
              name="webhook"
              v-model="formEditSite.site.webhook"
            />
          </div>

          <div class="mb-6 relative">
            <label for="domain" class="font-normal text-sm">Domain</label>
            <select
              id="domain"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              v-model="formEditSite.site.assigned_domain"
              @change="selectDomain"
            >
              <option :value="null">Select</option>
              <option
                v-for="(item, i) in formEditSite.domainsOptions"
                :key="i"
                :value="item._id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>

          <div class="mb-6 relative">
            <label for="user_admin_site" class="font-normal text-sm"
              >User admin site</label
            >
            <select
              id="user_admin_site"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              v-model="formEditSite.site.assigned_user"
            >
              <option :value="null">Select</option>
              <option
                v-for="(item, i) in formEditSite.usersOptions"
                :key="i"
                :value="item._id"
              >
                {{ item.fullName }}
              </option>
            </select>
          </div>

          <div class="mb-6 relative">
            <label for="template_individual" class="font-normal text-sm"
              >Template individual</label
            >
            <select
              id="template_individual"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              v-model="formEditSite.site.template_individual"
            >
              <option :value="null">Select</option>
              <option
                v-for="(item, i) in formEditSite.templateIndividualOptions"
                :key="i"
                :value="item._id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="mb-6 relative">
            <label for="template_multiple" class="font-normal text-sm"
              >Template multiple</label
            >
            <select
              id="template_multiple"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              v-model="formEditSite.site.template_multiple"
            >
              <option :value="null">Select</option>
              <option
                v-for="(item, i) in formEditSite.templateMultipleOptions"
                :key="i"
                :value="item._id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>

          <div class="mb-6 relative">
            <label for="language" class="font-normal text-sm">Language</label>
            <select
              id="language"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              v-model="formEditSite.site.language"
            >
              <option :value="null">Select</option>
              <option
                v-for="(item, i) in formEditSite.languageOptions"
                :key="i"
                :value="item"
              >
                {{ item }}
              </option>
            </select>
          </div>

          <div class="mb-6 relative">
            <label for="success_url" class="font-normal text-sm">Success url</label>
            <input
              type="text"
              id="success_url"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter success url"
              name="success_url"
              v-model="formEditSite.site.success_url"
            />
          </div>

          <div class="settings_keys_site mb-6">
            <div class="flex justify-between items-center">
              <span class="labelBold">Settings</span>
              <div class="flex items-center">
                <span class="mr-3">¿Qué es?</span>
                <img
                  src="~/assets/playground_assets/informationfill2709-dwn.svg?url"
                  alt=""
                  style="cursor: pointer"
                />
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span>Public API key</span>
              <span>{{ formEditSite.site.public_key }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span>Private token</span>
              <div class="flex">
                <span class="mr-1" v-if="formEditSite.showPrivateKey">{{
                  formEditSite.site.private_key
                }}</span>
                <span class="labelPass mr-3" v-else>************</span>
                <img
                  src="~/assets/playground_assets/eyefill2708-061.svg?url"
                  alt=""
                  style="cursor: pointer"
                  @click="
                    formEditSite.showPrivateKey = !formEditSite.showPrivateKey
                  "
                />
              </div>
            </div>
          </div>

          <div
            class="blockEditModal mb-6"
            v-if="
              formEditSite.site.assigned_domain != null &&
              formEditSite.processorsSites.length > 0
            "
          >
            <h3 class="labelBold mb-6">Processors</h3>
            <div
              v-for="(item, i) in formEditSite.processorsSites"
              :key="i"
             :class="{'processorSiteLoop': (i+1) < formEditSite.processorsSites.length }"
            >
              <div class="mb-6 flex justify-between items-center">
                <div class="flex justify-start items-center">
                  <img
                    :src="urlApi + '/uploads/' + item.processor_image"
                    alt=""
                    class="mr-2 w-5"
                  />
                  <span>{{ item.processor_name }}</span>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="USD"
                    class="sr-only peer"
                    v-model="item.active"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  ></div>
                  <span
                    class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  ></span>
                </label>
              </div>
              <div
                class="mb-6 flex justify-between items-center pl-4"
                v-if="item.active"
              >
                <span>Fee Extra</span>
                <div
                  class="flex justify-between items-center"
                  style="width: 150px"
                >
                  <select
                    id="fee_extra"
                    class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
                    v-model="item.fee_extra.type"
                    style="width: 60px; margin-right: 10px"
                  >
                    <option value="%">%</option>
                    <option value="$">$</option>
                  </select>
                  <input
                    type="number"
                    id="fee_extra_value"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
                    placeholder="$"
                    name="fee_extra_value"
                    v-model="item.fee_extra.value"
                  />
                </div>
              </div>
              <div
                class="mb-6 flex justify-between items-center pl-4"
                v-if="item.active"
              >
                <span>Custom fee</span>
                <div
                  class="flex justify-between items-center"
                  style="width: 80px"
                >
                  <input
                    type="number"
                    id="custom_fee"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
                    placeholder="$"
                    name="custom_fee"
                    v-model="item.custom_fee"
                  />
                </div>
              </div>

              <div
                class="mb-6 flex justify-between items-center pl-4"
                v-if="item.active "
              >
                <span>Hosted</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value="hosted"
                    class="sr-only peer"
                    v-model="item.hosted"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  ></div>
                  <span
                    class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  ></span>
                </label>
              </div>
            </div>
          </div>
          <div class="blockEditModal mb-6" v-else>
            <h3 class="labelBold mb-6">Processors</h3>
            <p>No hay procesadores en este dominio</p>
          </div>
          <div class="blockEditModal mb-6">
            <h3 class="labelBold mb-4">Currency</h3>
            <div class="mb-4 flex justify-between items-center">
              <label for="currency_usd" class="font-normal text-sm">USD</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value="USD"
                  class="sr-only peer"
                  v-model="formEditSite.site.currency"
                />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
                <span
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                ></span>
              </label>
            </div>
            <div class="mb-4 flex justify-between items-center">
              <label for="currency_eur" class="font-normal text-sm">EUR</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value="EUR"
                  class="sr-only peer"
                  v-model="formEditSite.site.currency"
                />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
                <span
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                ></span>
              </label>
            </div>
            <div class="mb-4 flex justify-between items-center">
              <label for="currency_gbp" class="font-normal text-sm">GBP</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value="GBP"
                  class="sr-only peer"
                  v-model="formEditSite.site.currency"
                />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
                <span
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                ></span>
              </label>
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
      <template #title> Your sites</template>
      <template #options>
        <button class="btnContentHeader1 mr-5" @click="abrirModal()">
          <img
            src="~/assets/playground_assets/usersharedline7476-sslo.svg?url"
          />
          <span> New </span>
        </button>
        <button class="btnContentHeader1 mr-5">
          <img src="~/assets/playground_assets/printerfill4860-fxck.svg?url" />
          <span> Print </span>
        </button>
        <button class="btnContentHeader1">
          <img src="~/assets/playground_assets/downloadfill4860-dq2w.svg?url" />
          <span> Download Report </span>
        </button>
      </template>
    </BlockContentHeader>
    <table-sites
      v-if="data.sites"
      :sites="data.sites"
      @next-page="nextPage"
      @previous-page="previousPage"
      @search-table="searchTable"
      @edit-site-modal="editSiteModal"
      @change-active="changeActiveSite"
      @delete-site="deleteSite"
    ></table-sites>
  </div>
</template>

<script setup lang="ts">
import {
  SitePagination,
  Site,
  DomainsSelect,
  usersSelect,
  templateIndividualSelect,
  templateMultipleSelect,
  ProcessorSiteDomain,
} from "~/interfaces/sites";
import { Modal } from "flowbite";
import type { ModalOptions } from "flowbite";
import { required, helpers, email, url } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useToast, useModal } from "tailvue";

const { $swal } = useNuxtApp();
const cookie = useCookie("token");
const router = useRouter();
//@ts-ignore
const token = cookie.value.token;
const formHttpError = ref("");
const editForm = ref(false);
const idEditRow = ref("");
const modal = ref();
const modalEditSite = ref();
useHead({
  title: "Lider | Sites",
  meta: [{ name: "description", content: "Sites page." }],
});
const data = reactive({
  sites: {} as () => SitePagination,
  search: "",
  limit: 10,
  page: 1,
});

const formEditSite = reactive({
  site: {} as Site,
  showPrivateKey: false,
  domainsOptions: [] as DomainsSelect[],
  usersOptions: [] as usersSelect[],
  templateIndividualOptions: [] as templateIndividualSelect[],
  templateMultipleOptions: [] as templateMultipleSelect[],
  languageOptions: ["English", "French", "German"],
  processorsSites: [] as ProcessorSiteDomain[],
});

const form = reactive({
  site: "",
  webhook: "",
});
const rules = computed(() => {
  return {
    site: {
      required: helpers.withMessage("The site field is required", required),
      url,
    },
    webhook: {
      required: helpers.withMessage("The webhook field is required", required),
      url,
    },
  };
});
const v$ = useVuelidate(rules, form);

async function searchTable(search: string) {
  data.search = search;
  await get_sites();
}

async function nextPage(page: number) {
  data.page = page;
  await get_sites();
}

async function previousPage(page: number) {
  data.page = page;
  await get_sites();
}

async function get_sites() {
  const query = gql`
    query {
      sites(page: ${data.page}, limit: ${data.limit}, search: "${data.search}") {

    sites {
      _id
      site
      nameStore
      amounts
      fee_quantity
      webhook
      assigned_domain
      assigned_user
      template_individual
      template_multiple
      language
      success_url
      currency
      processorsSites{
        _id
        processor_name
        processor_image
        active
      }
      active
      created
      public_key
      private_key
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
    data.sites = response.data.value.sites;
    console.log("sites", data.sites);
  } catch (e) {
    console.log("error", e);
  }
}

async function edit_site() {}

async function add_site() {
  try {
    const $toast = useToast();

    const mutation = gql`
      mutation {
        createSite(
          createSiteInput: { site: "${form.site}", webhook: "${form.webhook}" }
        ) {
          site
          webhook
        }
      }
    `;
    const response = await useAsyncQuery(mutation);
    console.log("response", response);
    $toast.success("Site add successfully");
    modal.value.hide();
    formHttpError.value = "";
    await get_sites();
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}
function deleteSite(id: string) {
  //@ts-ignore
  $swal
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
    .then((result: any) => {
      if (result.isConfirmed) {
        deleteSiteDb(id);
      }
    });
}

async function deleteSiteDb(id: string) {
  try {
    const $toast = useToast();

    const mutation = gql`
      mutation {
        removeSite(id: "${id}") {
          _id
        }
      }
    `;
    const response = await useAsyncQuery(mutation);
    console.log("response", response);
    $toast.success("Site delete successfully");
    formHttpError.value = "";
    await get_sites();
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
    if (editForm.value == true) {
      await edit_site();
    } else {
      await add_site();
    }
  } else {
    console.log("no esta bien validado");
  }
}

async function submitFormEditSite() {
  formEditSite.site.processorsSites = formEditSite.processorsSites;
  console.log("site enviar", formEditSite.site);
  const $toast = useToast();
  const query = gql`
  mutation{
  updateSite(updateSiteInput:{
    _id: "${formEditSite.site._id}"
    site: "${formEditSite.site.site}"
    nameStore: "${formEditSite.site.nameStore}"
    amounts: "${formEditSite.site.amounts}"
    fee_quantity:${formEditSite.site.fee_quantity}
    webhook: "${formEditSite.site.webhook}"
    assigned_domain: "${formEditSite.site.assigned_domain}"
    assigned_user: "${formEditSite.site.assigned_user}"
    template_individual: "${formEditSite.site.template_individual}"
    template_multiple: "${formEditSite.site.template_multiple}"
    language: "${formEditSite.site.language}"
    success_url: "${formEditSite.site.success_url}"
    currency: [${formEditSite.site.currency
      .map((currency) => `"${currency}"`)
      .join(", ")}]
    processorsSites: [
        ${formEditSite.site.processorsSites
          .map(
            (site) => `{
          _id: "${site._id}"
          site_id: "${site.site_id}"
          fee_extra: {
            type: "${site.fee_extra.type}"
            value: ${site.fee_extra.value}
          }
          custom_fee: ${site.custom_fee}
          hosted: ${site.hosted}
          active: ${site.active}
        }`
          )
          .join(",")}
      ]
   	active: ${formEditSite.site.active}
  }){
    _id
  }
}
  `;
  try {
    const response = await useAsyncQuery(query);
    $toast.success("Site successfully edited");
    get_sites();
    modalEditSite.value.hide();
    console.log("respise", response);
  } catch (e) {
    console.log("error", e);
  }
}

function hideModalEditSite() {
  modalEditSite.value.hide();
}
//modal
function hideModal() {
  modal.value.hide();
}

async function get_data_form_edit() {
  console.log("entrando a get data form edit");
  const query = gql`
    query {
      domains {
        _id
        name
        url
      }
      usersSites {
        _id
        fullName
      }
      templatesIndividual {
        _id
        name
      }
      templatesMultiple {
        _id
        name
      }
    }
  `;
  try {
    const response = await useAsyncQuery(query);
    console.log("respise", response);
    //@ts-ignore
    formEditSite.domainsOptions = response.data.value.domains;
    //@ts-ignore
    formEditSite.usersOptions = response.data.value.usersSites;
    //@ts-ignore
    formEditSite.templateIndividualOptions =
      //@ts-ignore
      response.data.value.templatesIndividual;
    //@ts-ignore
    formEditSite.templateMultipleOptions =
      //@ts-ignore
      response.data.value.templatesMultiple;
  } catch (e) {
    console.log("error", e);
  }
}

async function editSiteModal(row: Site) {
  formEditSite.site = row;
  console.log("row edit", row);
  if (row.assigned_domain != "" || row.assigned_domain != null) {
    console.log("si tiene valor el assigned domain");
    await get_processors_site_by_domain(row.assigned_domain);
  }
  await get_data_form_edit();

  //ahora cargar las cosas

  modalEditSite.value.toggle();
}

function abrirModal() {
  editForm.value = false;
  //@ts-ignore
  idEditRow.value = "";
  modal.value.toggle();
}

async function get_processors_site_by_domain(domain_id: string | undefined) {
  console.log("domain id", domain_id);
  const query = gql`
  query{
  get_processors_site_domain(domain_id:"${domain_id}", 
  site_id:"${formEditSite.site._id}"){
    _id
    site_id
    domain_id
    processor_id
    processor_domain_id
    fee_extra{
      type
      value
    }
    custom_fee
    hosted
    processor_name
    processor_identy
    processor_image
    processor_fee
    active
  }
}
  `;
  try {
    const response = await useAsyncQuery(query);
    console.log("respise", response);
    //@ts-ignore
    formEditSite.processorsSites =
      //@ts-ignore
      response.data.value.get_processors_site_domain;
    nextTick(() => {
      console.log("actualizando");
    });
  } catch (e) {
    console.log("error", e);
  }
}

async function changeActiveSite(id: string, active: boolean) {
  console.log(id, active);
  const newStatus = !active;
  const query = gql`
  mutation{
  updateSiteActive(updateSiteActive:{
    active:${newStatus}
    _id:"${id}"
  })
  {
    _id
  }
}
  `;
  try {
    const response = await useAsyncQuery(query);
    console.log("respise", response);
    get_sites();
  } catch (e) {
    console.log("error", e);
  }
}

async function selectDomain(e: Event) {
  const value = (e.target as HTMLSelectElement).value;
  if (value != null) {
    await get_processors_site_by_domain(value);
  }
}

onMounted(() => {
  const $modalElement: any = document.querySelector("#modalSite");
  const $modalElementEditSite: any = document.querySelector("#modalEditSite");
  const modalOptionsEditSite: ModalOptions = {
    placement: "top-right",
    backdrop: "static",
    backdropClasses:
      "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
    closable: true,
    onHide: () => {
      console.log("modal Edit is hidden");
    },
    onShow: () => {
      console.log("modal Edit is shown");
    },
    onToggle: () => {
      console.log("modal Edit has been toggled");
    },
  };
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
  modalEditSite.value = new Modal($modalElementEditSite, modalOptionsEditSite);
});
nextTick(async () => {
  await get_sites();
});
</script>

<style scoped></style>
