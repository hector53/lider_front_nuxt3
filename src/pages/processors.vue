<template>
  <div>
    <ModalStatic
      :idModal="'modalProcessor'"
      :title="'Processor'"
      @submit-form="submitForm()"
      @hide-modal="hideModal()"
    >
      <template #content>
        <form>
          <div class="mb-6 relative">
            <label for="title" class="font-normal text-sm">Title</label>
            <input
              type="text"
              id="title"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter processor title"
              name="title"
              v-model="form.title"
              @blur="v$.title.$touch"
              :class="{
                'border-red-500 focus:border-red-500': v$.title.$error,
              }"
            />
            <div v-if="v$.title.$error">
              <ul>
                <li
                  v-for="(error, index) in v$.title.$errors"
                  :key="index"
                  class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                  {{ error.$message }}
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-6 relative">
            <label for="description" class="font-normal text-sm"
              >Description</label
            >
            <input
              type="text"
              id="description"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter processor description"
              name="description"
              v-model="form.description"
              @blur="v$.description.$touch"
              :class="{
                'border-red-500 focus:border-red-500': v$.description.$error,
              }"
            />
            <div v-if="v$.description.$error">
              <ul>
                <li
                  v-for="(error, index) in v$.description.$errors"
                  :key="index"
                  class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                  {{ error.$message }}
                </li>
              </ul>
            </div>
          </div>

          <div class="mb-6 relative">
            <label for="fee" class="font-normal text-sm">Fee default</label>
            <input
              type="number"
              id="fee"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter processor fee"
              name="fee"
              v-model="form.fee"
              @blur="v$.fee.$touch"
              :class="{
                'border-red-500 focus:border-red-500': v$.fee.$error,
              }"
            />
            <div v-if="v$.fee.$error">
              <ul>
                <li
                  v-for="(error, index) in v$.fee.$errors"
                  :key="index"
                  class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                  {{ error.$message }}
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-6 relative">
            <label for="fee" class="font-normal text-sm">Icon processor</label>
            <input
              type="file"
              id="image"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter processor icon"
              name="image"
              accept="image/*"
              @change="handleFileUpload"
             
            />

            <div v-if="editForm" class="mt-4">
              <img :src="urlApi+'/uploads/'+imageEditRow" alt="">
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
      <template #title> Processors </template>
      <template #options>
        <button class="btnContentHeader1 mr-5" @click="abrirModal()">
          <img src="~/assets/playground_assets/add-fill.svg?url" />
          <span> New </span>
        </button>
      </template>
    </BlockContentHeader>
    <div class="container max-w-8xl pt-3 pb-16 mt-7 mx-auto">
      <block-processor
        :border="getBorder(index)"
        v-for="(item, index) in dataProcessors.data"
        :key="index"
        :processor="item"
        @connect-processor="Connect_processor"
        @delete-row="deleteRow"
        @edit-row="editRow"
      ></block-processor>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from "flowbite";
import type { ModalOptions } from "flowbite";
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from "tailvue";
import { Processor } from "~/interfaces/processors";
const { $swal } = useNuxtApp();
const cookie = useCookie("token");
//@ts-ignore
const token = cookie.value.token;
const formHttpError = ref("");
const editForm = ref(false);
const idEditRow = ref("");
const imageEditRow = ref("")
const modal = ref();

const dataProcessors = reactive({
  data: [] as Processor[],
});
const form = reactive({
  title: "",
  description: "",
  fee: 0,
  image: null as File | null,
});
const rules = computed(() => {
  return {
    title: {
      required: helpers.withMessage("The title field is required", required),
    },
    description: {
      required: helpers.withMessage(
        "The description field is required",
        required
      ),
    },
    fee: {
      required: helpers.withMessage("The fee field is required", required),
    },
   
  };
});

const v$ = useVuelidate(rules, form);

function abrirModal() {
  editForm.value = false;
  //@ts-ignore
  idEditRow.value = "";
  form.title = "";
  form.description = "";
  form.fee = 0;
  form.image = null;

  modal.value.toggle();
}
function hideModal() {
  modal.value.hide();
}
function handleFileUpload(event: Event) {
  console.log(event);
  const target = event.target as HTMLInputElement;
  if (target.files) {
    form.image = target.files[0];
  }
}
function getBorder(index: number): string {
  if (index === 0) {
    return "top";
  } else if (index === dataProcessors.data.length - 1) {
    return "bottom";
  } else {
    return "center";
  }
}
function editRow(row: Processor) {
  console.log("edit row: ", row)
  editForm.value = true;
  //@ts-ignore
  idEditRow.value = row._id;
  imageEditRow.value = row.image
  form.title = row.name
  form.description = row.description
  form.fee = row.fee
  
  modal.value.toggle();
}

async function deleteRowDb(id: string | undefined) {
  try {
    const $toast = useToast();
    const response = await $fetch(urlApi + "/processors/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("response", response);
    $toast.success("Processor delete successfully");
    get_processors();
    modal.value.hide();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}

function deleteRow(id?: string){
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
async function add_processor() {
  const formData = new FormData();
  formData.append("name", form.title);
  formData.append("description", form.description);
  formData.append("fee", form.fee.toString());
  if (form.image && form.image instanceof File) {
    formData.append("image", form.image);
  }
  console.log(formData.get("name"));
  console.log(formData.get("description"));
  console.log(formData.get("fee"));
  console.log(formData.get("image"));
  try {
    const $toast = useToast();
    const response = await $fetch(urlApi + "/processors", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    console.log("response", response);
    $toast.success("Processor created successfully");
    get_processors();
    modal.value.hide();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;

    // Manejar el error de la solicitud
    //@ts-ignore
    if (e.response) {
      //@ts-ignore
      console.log(e.response.data);
      //@ts-ignore
      console.log(e.response.status);
      //@ts-ignore
      console.log(e.response.headers);
    }
  }
}
async function edit_processor(){
  const formData = new FormData();
  formData.append("name", form.title);
  formData.append("description", form.description);
  formData.append("fee", form.fee.toString());
  if (form.image && form.image instanceof File) {
    formData.append("image", form.image);
    await edit_row_with_image(formData)
  }else{
    await edit_row_without_image(formData)
  }
}
async function edit_row_without_image(formData:FormData){
  try {
    const $toast = useToast();
    const response = await $fetch(urlApi + "/processors/"+idEditRow.value+"/without_image", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: {
        "name": form.title, 
        "description": form.description,
        "fee": form.fee
      },
    });
    console.log("response", response);
    $toast.success("Processor updated successfully");
    get_processors();
    modal.value.hide();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;

    // Manejar el error de la solicitud
    //@ts-ignore
    if (e.response) {
      //@ts-ignore
      console.log(e.response.data);
      //@ts-ignore
      console.log(e.response.status);
      //@ts-ignore
      console.log(e.response.headers);
    }
  }
}
async function edit_row_with_image(formData:FormData){
  try {
    const $toast = useToast();
    const response = await $fetch(urlApi + "/processors/"+idEditRow.value+"/with_image", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    console.log("response", response);
    $toast.success("Processor updated successfully");
    get_processors();
    modal.value.hide();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;

    // Manejar el error de la solicitud
    //@ts-ignore
    if (e.response) {
      //@ts-ignore
      console.log(e.response.data);
      //@ts-ignore
      console.log(e.response.status);
      //@ts-ignore
      console.log(e.response.headers);
    }
  }
}
async function submitForm() {
  console.log("submit form");
  v$.value.$validate();
  if (!v$.value.$error) {
    console.log("todo bien validado");
    if (editForm.value == true) {
      edit_processor()
    } else {
      await add_processor();
    }
  } else {
    console.log("no esta bien validado");
  }
}

async function Connect_processor(id: string, active: boolean) {
  console.log("connect processor", id, active)
  const newStatus = !active;
  try {
    const $toast = useToast();
    const response = await $fetch(urlApi + "/processors/" + id + "/active", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: {
        active: newStatus,
      },
    });
    console.log("response", response);
    $toast.success("Processor update successfully");
    get_processors();
    modal.value.hide();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}

async function get_processors() {
  try {
    const response = await $fetch(urlApi + "/processors", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("response", response);
    //@ts-ignore
    dataProcessors.data = response;
  } catch (e) {
    console.log("error", e);
  }
}

onMounted(async () => {
  const $modalElement: any = document.querySelector("#modalProcessor");
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
  await get_processors();
});
</script>

<style scoped></style>
