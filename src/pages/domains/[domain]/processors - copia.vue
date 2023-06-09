<template>
  <div>
    <ModalStatic
      :idModal="'modalProcessorDomain'"
      :title="'Processor'"
      @submit-form="submitForm()"
      @hide-modal="hideModal()"
    >
      <template #content>
        <form>
          <div class="mb-6 relative">
            <label for="processors" class="font-normal text-sm"
              >Processors</label
            >
            <select
              id="processors"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              v-model="form.processor_id"
              @blur="v$.processor_id.$touch"
              :class="{
                'border-red-500 focus:border-red-500': v$.processor_id.$error,
              }"
            >
              <option value="" v-if="editForm == false">Select one</option>
              <option :value="form.processor_id" v-else>
                {{ nameProcessorEdit }}
              </option>
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
    <BlockContentHeader>
      <template #title>
        Processors of:
        <span class="text-xl">{{ data.domainUrl }}</span></template
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
    <table-processors-domain
      :rows="data.listProcessorsDomains"
      @change-status-processor="changeStatusProcessor"
      @delete-row="deleteRow"
      @edit-row="editRow"
    ></table-processors-domain>
  </div>
</template>

<script setup lang="ts">
import { Modal } from "flowbite";
import type { ModalOptions } from "flowbite";
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { ProcessorsDomain } from "~/interfaces/processorsDomain";
import { Processor } from "~/interfaces/processors";
import { useToast } from "tailvue";
const { $swal } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const cookie = useCookie("token");
const formHttpError = ref("");
const editForm = ref(false);
const idEditRow = ref("");
const nameProcessorEdit = ref("");
const modal = ref();

//@ts-ignore
const token = cookie.value.token;
console.log("route domain", route);

const data = reactive({
  listProcessorsDomains: [] as ProcessorsDomain[],
  domainUrl: "",
  listProcessors: [] as Processor[],
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

function abrirModal() {
  editForm.value = false;
  //@ts-ignore
  idEditRow.value = "";
  form.processor_id = "";
  form.public_key = "";
  form.private_key = "";

  modal.value.toggle();
}
function hideModal() {
  modal.value.hide();
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
    data.domainUrl = response.domainUrl;
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
  const $toast = useToast();
  try {
    const response = await $fetch(urlApi + "/domains-processors", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: form,
    });
    console.log("response", response);
    $toast.success("processor created successfully");
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
    const $toast = useToast();
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
    $toast.success("Processor updated successfully");
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

async function changeStatusProcessor(id?: string, active?: boolean) {
  console.log("change active domain ", active);
  const newStatus = !active;
  try {
    const $toast = useToast();
    const response = await $fetch(
      urlApi + "/domains-processors/" + id + "/active",
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
    $toast.success("Processor update successfully");
    get_processors_domain();
    modal.value.hide();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}

async function deleteRowDb(id?: string) {
  try {
    const $toast = useToast();
    const response = await $fetch(urlApi + "/domains-processors/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("response", response);
    $toast.success("Processor delete successfully");
    get_processors_domain();
    modal.value.hide();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}

function editRow(row: ProcessorsDomain) {
  editForm.value = true;
  //@ts-ignore
  idEditRow.value = row._id;
  nameProcessorEdit.value = row.processor_name;
  form.processor_id = row.processor_id;
  form.public_key = row.public_key;
  form.private_key = row.private_key;
  modal.value.toggle();
}

function deleteRow(id?: string) {
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
        deleteRowDb(id);
      }
    });
}

onMounted(async () => {
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
  await get_processors_domain();
});
</script>
