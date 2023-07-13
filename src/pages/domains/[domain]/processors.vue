<template>
  <div>
    <ModalStatic
      :idModal="'modalProcessorDomain'"
      :title="'Processor'"
      @submit-form="submitForm()"
      @hide-modal="hideModal()"
    >
      <template #content>
        <div class="modal-info-title">
          <div class="processors_connect_images">
            <img
              v-if="data.openModal"
              :src="urlApi + '/uploads/' + data.processorSelected.image"
              alt=""
              class="mr-3"
            />
            <img
              src="~/assets/playground_assets/arrow-left-right-line.svg?url"
              alt=""
              class="mr-3"
            />
            <img
              src="~/assets/playground_assets/liderProcessor.svg?url"
              alt=""
            />
          </div>
          <h2>Connect {{ data.processorSelected.name }} to Lider</h2>
          <p>
            A suite of payment APIs that powers commerce for online businesses
            of all sizes
          </p>
        </div>
        <form>
          <div class="mb-6 relative" v-show="editForm == false">
            <label for="processors" class="font-normal text-sm"
              >Processors</label
            >
            <select
              id="processors"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              v-model="form.processor_id"
              @change="setProcessorSelected"
              @blur="v$.processor_id.$touch"
              :class="{
                'border-red-500 focus:border-red-500': v$.processor_id.$error,
              }"
            >
              <option
                :value="processor._id"
                v-for="(processor, index) in data.listProcessors"
                :key="index"
              >
                <span class="font-bold">{{ processor.name }}</span>
              </option>
            </select>
            <div v-if="v$.processor_id.$error">
              <ul>
                <li
                  v-for="(error, index) in v$.processor_id.$errors"
                  :key="index"
                  class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                  {{ error.$message }}
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-6 relative">
            <label for="public_key" class="font-normal text-sm"
              >Public key</label
            >
            <input
              type="text"
              id="public_key"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter processor public key"
              name="public_key"
              v-model="form.public_key"
            />
          </div>

          <div class="mb-6 relative">
            <label for="private_key" class="font-normal text-sm"
              >Private key</label
            >
            <input
              type="text"
              id="private_key"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter processor private key"
              name="private_key"
              v-model="form.private_key"
            />
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
      :title="'Processor Domain'"
      @submit-form="deleteRowDb()"
      @hide-modal="hideModalDelete()"
    >
    </ModalDelete>
    <BlockContentHeader>
      <template #title>
        Processors of:
        <span class="text-xl">{{ data.nameDomain }}</span></template
      >
      <template #options>
        <button class="btnContentHeader1 mr-5" @click="abrirModal()">
          <img
            src="~/assets/playground_assets/usersharedline7476-sslo.svg?url"
          />
          <span> New </span>
        </button>
      </template>
    </BlockContentHeader>
    <div class="container max-w-8xl pt-3 pb-16 mt-7 mx-auto">
      <block-processor-domain
        :border="getBorder(index)"
        v-for="(item, index) in data.listProcessorsDomains"
        :key="index"
        :processor="item"
        @edit-row="editRow"
        @delete-row="deleteRow"
        @connect-processor="changeStatusProcessor"
      ></block-processor-domain>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from "flowbite";
import type { ModalOptions } from "flowbite";
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { ProcessorsDomain } from "~/interfaces/processorsDomain";
import { Processor } from "~/interfaces/processors";
import { showToast } from "~/composables/toastLiderPro";
const { $swal } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const cookie = useCookie("token");
const formHttpError = ref("");
const editForm = ref(false);
const idEditRow = ref("");
const nameProcessorEdit = ref("");
const modal = ref();
const idDelete = ref("")
const modalDelete = ref();
//@ts-ignore
const token = cookie.value.token;
console.log("route domain", route);

const data = reactive({
  listProcessorsDomains: [] as ProcessorsDomain[],
  domainUrl: "",
  nameDomain: "",
  processorSelected: {} as Processor,
  listProcessors: [] as Processor[],
  openModal: false
});
const form = reactive({
  processor_id: "",
  public_key: "",
  private_key: "",
  domain_id: route.params.domain,
});
const rules = computed(() => {
  return {
    processor_id: {
      required: helpers.withMessage(
        "The processor field is required",
        required
      ),
    },
  };
});

const v$ = useVuelidate(rules, form);

async function get_processor_of_list(id: string) {
  for (const item of data.listProcessors) {
    if (item._id == id) {
      data.processorSelected = item;
      return;
    }
  }
  return;
}

async function abrirModal() {
  if(data.listProcessors.length>0){
    data.openModal=true
  editForm.value = false;
  //@ts-ignore
  idEditRow.value = "";
  form.processor_id = "";
  form.public_key = "";
  form.private_key = "";
  const selectElement = document.getElementById(
    "processors"
  ) as HTMLSelectElement;
  selectElement.value = selectElement.options[0].value;
  form.processor_id = selectElement.value;
  await get_processor_of_list(selectElement.value);

  modal.value.toggle();
  }
  
}
function hideModal() {
  modal.value.hide();
}

async function setProcessorSelected(e: Event) {
  let processor = (e.target as HTMLSelectElement).value;
  await get_processor_of_list(processor);
}

async function get_processors_domain() {
  try {
    const response = await $fetch(
      urlApi + "/domains-processors/" + route.params.domain,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("response", response);
    //@ts-ignore
    data.nameDomain = response.domainName;
    //@ts-ignore
    data.listProcessorsDomains = response.domainProcessors;
    //@ts-ignore
    data.listProcessors = response.processors;
  } catch (e) {
    console.log("error", e);
    router.push("/domains");
  }
}

async function add_processor_domain() {


  try {
    const response = await $fetch(urlApi + "/domains-processors", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: form,
    });
    console.log("response", response);
    showToast("Processor created successfully", "bottom", 3000)
    get_processors_domain();
    modal.value.hide();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}
async function edit_processor_domain() {
  try {

    const response = await $fetch(
      urlApi + "/domains-processors/" + idEditRow.value,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: form,
      }
    );
    console.log("response", response);
    showToast("Processor updated successfully", "bottom", 3000)
    get_processors_domain();
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
    if (editForm.value == true) {
      await edit_processor_domain();
    } else {
      await add_processor_domain();
    }
  } else {
    console.log("no esta bien validado");
  }
}

async function changeStatusProcessor(row: ProcessorsDomain, active?: boolean) {
  if (active) {
    console.log("change active domain ", active);
    const newStatus = !active;
    try {
     
      const response = await $fetch(
        urlApi + "/domains-processors/" + row?._id + "/active",
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: {
            active: newStatus,
          },
        }
      );
      console.log("response", response);
      showToast("Processor update successfully", "bottom", 3000)
      get_processors_domain();
      modal.value.hide();
      formHttpError.value = "";
    } catch (e) {
      console.log("error", e);
      //@ts-ignore
      formHttpError.value = e.message;
    }
  } else {
    editRow(row)
  }
}

async function deleteRowDb() {
  try {
    
    const response = await $fetch(urlApi + "/domains-processors/" + idDelete.value, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("response", response);
    showToast("Processor delete successfully", "bottom", 3000)
    modalDelete.value.hide()
    get_processors_domain();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}

function getBorder(index: number): string {
  if (index === 0) {
    return "top";
  } else if (index === data.listProcessorsDomains.length - 1) {
    return "bottom";
  } else {
    return "center";
  }
}

function editRow(row: ProcessorsDomain) {
  data.openModal = true
  editForm.value = true;
  //@ts-ignore
  idEditRow.value = row._id;
  form.processor_id = row.processor_id;
  form.public_key = row.public_key;
  form.private_key = row.private_key;
  const rowProcessor:Processor = {} as Processor
  rowProcessor._id = row.processor_id
  rowProcessor.active = row.active
  rowProcessor.name = row.processor_name
  rowProcessor.image = row.processor_image
  data.processorSelected = rowProcessor;
  modal.value.toggle();
}

function deleteRow(id: string) {
  idDelete.value = id
  modalDelete.value.show()
}

function hideModalDelete() {
  modalDelete.value.hide();
}

onMounted(async () => {
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
  const $modalElement: any = document.querySelector("#modalProcessorDomain");
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
  modalDelete.value = new Modal($modalDelete, modalDeleteOption);
  await get_processors_domain();
});
</script>
