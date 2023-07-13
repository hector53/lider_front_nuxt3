<template>
  <div>
    <ModalStatic
      :idModal="'modalDomain'"
      :title="'Domain'"
      @submit-form="submitForm()"
      @hide-modal="hideModal()"
    >
      <template #content>
        <form>
          <div class="mb-6 relative">
            <label for="name" class="font-normal text-sm">Name</label>
            <input
              type="text"
              id="name"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter name"
              name="name"
              v-model="form.name"
              @blur="v$.name.$touch"
              :class="{
                'border-red-500 focus:border-red-500': v$.name.$error,
              }"
            />
            <div v-if="v$.name.$error">
              <ul>
                <li
                  v-for="(error, index) in v$.name.$errors"
                  :key="index"
                  class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                  {{ error.$message }}
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-6 relative">
            <label for="url" class="font-normal text-sm">Url</label>
            <input
              type="url"
              id="url"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter url"
              name="url"
              v-model="form.url"
              @blur="v$.url.$touch"
              :class="{
                'border-red-500 focus:border-red-500': v$.url.$error,
              }"
            />
            <div v-if="v$.url.$error">
              <ul>
                <li
                  v-for="(error, index) in v$.url.$errors"
                  :key="index"
                  class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                  {{ error.$message }}
                </li>
              </ul>
            </div>
          </div>

          <div class="mb-6 relative" v-if="editForm">
            <label for="token_domain" class="font-normal text-sm">Domain Token: {{ dataDomains.token_domain }}</label>
           
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
    <ModalDelete
      :title="'Domain'"
      @submit-form="deleteRowDb()"
      @hide-modal="hideModalDelete()"
    >
    </ModalDelete>
    <BlockContentHeader>
      <template #title> Domains</template>
      <template #options>
        <button class="btnContentHeader1 mr-5" @click="abrirModal()">
          <img
            src="~/assets/playground_assets/usersharedline7476-sslo.svg?url"
          />
          <span> New </span>
        </button>
      </template>
    </BlockContentHeader>
    <div
      class="tableDashboard container max-w-8xl py-3 mt-7 mx-auto flex flex-col"
    >
      <div class="optionsTable flex justify-between">
        <div class="flex"></div>

        <div class="input-search-tables">
          <img src="~/assets/playground_assets/search2line4865-uffr.svg?url" />
          <input
            type="search"
            class="search-input"
            placeholder="Search by url"
            v-model="dataDomains.search"
            @keyup.enter="get_domains()"
          />
        </div>
      </div>

      <div class="relative overflow-x-auto mt-10">
        <table class="w-full text-sm text-left">
          <thead class="uppercase">
            <tr>
              <th scope="col" class="px-6 py-3 text-lef">#</th>
              <th scope="col" class="px-6 py-3 text-left">Name</th>
              <th scope="col" class="px-6 py-3 text-left">Url</th>
              <th scope="col" class="px-6 py-3 text-center">Active</th>
              <th scope="col" class="px-6 py-3 text-center">Created</th>
              <th
                scope="col"
                class="px-6 py-3 text-center"
                style="width: 300px"
              >
                Processors
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center"
                style="width: 300px"
              >
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="hover:bg-gray-50"
              v-for="(row, index) in dataDomains.domains"
              :key="index"
            >
              <th scope="row" class="px-6 py-4">{{ index + 1 }}</th>
              <td class="px-6 py-4">{{ row.name }}</td>
              <td class="px-6 py-4">{{ row.url }}</td>
              <td class="px-6 py-4 text-center">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    :checked="row.active"
                    @change="changeStatusDomain(row._id, row.active)"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  ></div>
                  <span
                    class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  ></span>
                </label>
              </td>
              <td class="px-6 py-4 text-center">
                {{ convertDate(row.created) }}
              </td>
              <td class="px-6 py-4 text-center">
                <div style="width: 250px; display: flex; flex-wrap: wrap">
                  <div
                    class="flex justify-start items-center mb-2 processorSite"
                    v-for="(item, index2) in row.domainprocessors"
                    :key="index2"
                    v-show="index2<2"
                  >
                    <img
                      :src="urlApi + '/uploads/' + item.processor[0].image"
                      alt=""
                      class="mr-2 w-5"
                    />
                    <span>{{ item.processor[0].name }}</span>
                  </div>
                  <div
                    v-if="row.domainprocessors.length > 2"
                    class="flex justify-start items-center mb-2 processorSite"
                  >
                    <span>+2</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex justify-end items-center">
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
                  <button
                    class="btnContentHeader1 mr-5 minBtn"
                    @click="view_processors(row._id)"
                  >
                  <img src="~/assets/playground_assets/arrow-left-right-line.svg?url" />
                    <span> Processors </span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="optionsTable flex justify-between mt-8 mb-10">
          <span>{{ dataDomains.count }} Results</span>
          <div class="flex">
            <button
              class="btnContentHeader1 mr-5"
              @click="get_domains(dataDomains.previousPage)"
              v-show="dataDomains.hasPreviousPage"
            >
              <img
                src="~/assets/playground_assets/arrowleftline4884-80z7.svg?url"
              />
              <span> Previous </span>
            </button>
            <button
              class="btnContentHeader1 mr-5"
              @click="get_domains(dataDomains.nextPage)"
              v-show="dataDomains.hasNextPage"
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
  </div>
</template>

<script setup lang="ts">
import { Modal } from "flowbite";
import type { ModalOptions } from "flowbite";
import { required, helpers, email, url } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import passwordValidator from "password-validator";
import type { ValidatorFn, ValidationArgs } from "@vuelidate/core";
import { showToast } from "~/composables/toastLiderPro";

const { $swal } = useNuxtApp();
const cookie = useCookie("token");
const router = useRouter();
//@ts-ignore
const token = cookie.value.token;

const formHttpError = ref("");
const editForm = ref(false);
const idEditRow = ref("");
const modal = ref();
const idDelete = ref("")
const modalDelete = ref();
interface ProcessorData {
  name: string;
  image: string;
  active: Boolean;
}

interface DomainProcessor {
  active: Boolean;
  processor: ProcessorData[];
}

interface Domain {
  _id?: string;
  name: string;
  url: string;
  token: string;
  domainprocessors: DomainProcessor[];
  active?: boolean;
  created: string;
  updated: string;
}
const dataDomains = reactive({
  domains: [] as Domain[],
  count: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  nextPage: 1,
  previousPage: 0,
  totalPages: 0,
  limitPages: 2,
  search: "",
  token_domain: ""
});

const form = reactive({
  name: "",
  url: "",
});

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("The name field is required", required),
    },
    url: {
      required: helpers.withMessage("The url field is required", required),
      url,
    },
  };
});

const v$ = useVuelidate(rules, form);

console.log(token);

function view_processors(id?: string) {
  router.push({ name: "domains-domain-processors", params: { domain: id } });
}

async function get_domains(page = 1) {
  try {
    const response = await $fetch(
      urlApi +
        "/domains?page=" +
        page +
        "&limit=" +
        dataDomains.limitPages +
        "&search=" +
        dataDomains.search,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("response", response);
    //@ts-ignore
    dataDomains.domains = response.domains;
    //@ts-ignore
    dataDomains.hasNextPage = response.hasNextPage;
    //@ts-ignore
    dataDomains.hasPreviousPage = response.hasPreviousPage;
    //@ts-ignore
    dataDomains.nextPage = response.nextPage;
    //@ts-ignore
    dataDomains.previousPage = response.previousPage;
    //@ts-ignore
    dataDomains.totalPages = response.totalPages;
    //@ts-ignore
    dataDomains.count = response.count;
  } catch (e) {
    console.log("error", e);
  }
}

function convertDate(fecha: string) {
  const isoDate = fecha;
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleString().replace(",", "");
  return formattedDate;
}
async function submitForm() {
  console.log("submit form");
  v$.value.$validate();
  if (!v$.value.$error) {
    console.log("todo bien validado");
    if (editForm.value == true) {
      await edit_domain();
    } else {
      await add_domain();
    }
  } else {
    console.log("no esta bien validado");
  }
}
function deleteRow(id: string ) {
  idDelete.value = id
 modalDelete.value.show()
}
async function deleteRowDb() {
  try {
   
    const response = await $fetch(urlApi + "/domains/" + idDelete.value, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("response", response);
    showToast("Domain delete successfully", "bottom", 3000)
    get_domains();
    modalDelete.value.hide();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}
async function edit_domain() {
  try {

    const response = await $fetch(urlApi + "/domains/" + idEditRow.value, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: form,
    });
    console.log("response", response);
    showToast("Domain updated successfully", "bottom", 3000)
    get_domains();
    modal.value.hide();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}

async function add_domain() {

  const response = await useAsyncData(async () => {
    return await $fetch(
      // @ts-ignore
      urlApi + "/domains",
      {
        method: "POST",
        body: form,
        headers: {
          // @ts-ignore
          Authorization: "Bearer " + cookie.value.token,
        },
      }
    );
  });
  console.log("response", response);
  if (response.error.value) {
    // @ts-ignore.
    const { data } = response.error.value;
    console.log("error:", data);
    formHttpError.value = data.message;
  } else {
    const data: any = response.data.value;
    console.log("response", data);
    showToast("Domain inserted successfully", "bottom", 3000)
    get_domains();
    modal.value.hide();
    formHttpError.value = "";
  }
}

function abrirModal() {
  editForm.value = false;
  //@ts-ignore
  idEditRow.value = "";
  form.url = "";
  modal.value.toggle();
}
function hideModal() {
  modal.value.hide();
}

function editRow(domain: Domain) {
  editForm.value = true;
  //@ts-ignore
  idEditRow.value = domain._id;
  form.name = domain.name;
  form.url = domain.url;
  dataDomains.token_domain = domain.token
  modal.value.toggle();
}
async function changeStatusDomain(
  id: string | undefined,
  status: boolean | undefined
) {
  console.log("change active domain ", status);
  const newStatus = !status;
  try {
   
    const response = await $fetch(urlApi + "/domains/" + id + "/active", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: {
        active: newStatus,
      },
    });
    console.log("response", response);
    showToast("Domain update successfully", "bottom", 3000)
    get_domains();
    modal.value.hide();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}
function hideModalDelete() {
  modalDelete.value.hide();
}
onMounted(async () => {
  const $modalElement: any = document.querySelector("#modalDomain");
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
  const $modalDelete: any = document.querySelector("#modalDelete");
  const modalDeleteOption: ModalOptions = {
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
  modalDelete.value = new Modal($modalDelete, modalDeleteOption);
  await get_domains();
});
</script>
