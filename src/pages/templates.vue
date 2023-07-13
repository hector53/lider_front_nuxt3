<template>
  <div>
    <ModalStatic
      :idModal="'modalNewTemplate'"
      :title="'Template'"
      :btnSave="'Create template'"
      @submit-form="submitForm()"
      @hide-modal="hideModal()"
    >
      <template #content>
        <div class="modal-info-title">
          <h2>Create new template</h2>
          <p>html templates for system checkouts</p>
        </div>
        <form>
          <div class="mb-6 relative">
            <label for="name" class="font-normal text-sm">Name</label>
            <input
              type="text"
              id="name"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter a name"
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
            <label for="domain" class="font-normal text-sm">Type</label>
            <select
              id="domain"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              v-model="form.type"
            >
              <option value="1">Individual</option>
              <option value="2">Multiple</option>
              <option value="3">Success</option>
            </select>
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
      :idModal="'modalEditTemplate'"
      :title="'Template'"
      :btnSave="'Edit template'"
      :sizeModal="'max-w-full'"
      @submit-form="submitFormEdit()"
      @hide-modal="hideModalEdit()"
    >
      <template #content>
        <div
          class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
        >
          <ul class="flex flex-wrap -mb-px">
            <li class="mr-2">
              <a
                @click="selectPreview(0)"
                href="#"
                :class="{
                  'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg':
                    data.tabHtmlPreview == 0,
                  'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300':
                    data.tabHtmlPreview == 1,
                }"
                >Html</a
              >
            </li>
            <li class="mr-2">
              <a
                href="#"
                @click="selectPreview(1)"
                :class="{
                  'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg':
                    data.tabHtmlPreview == 1,
                  'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300':
                    data.tabHtmlPreview == 0,
                }"
                aria-current="page"
                >Preview</a
              >
            </li>
            <li class="mr-2">
              <a
                href="#"
                @click="selectPreview(2)"
                :class="{
                  'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg':
                    data.tabHtmlPreview == 2,
                  'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300':
                    data.tabHtmlPreview < 2,
                }"
                aria-current="page"
                >Vars</a
              >
            </li>
          </ul>
          <ClientOnly>
            <codemirror
            v-if="data.tabHtmlPreview == 0"
              v-model="data.templateEdit.html"
              :style="{ height: '400px', textAlign: 'left' }"
              :autofocus="true"
              :indent-with-tab="true"
              :tab-size="2"
            ></codemirror>
          </ClientOnly>

          <div v-html="data.htmlPreview" v-if="data.tabHtmlPreview == 1"></div>

          <div v-if="data.tabHtmlPreview == 2">
            <ul
              class="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400"
            >
              <li>
                languaje
                <ol class="pl-5 mt-2 space-y-1 list-decimal list-inside">
                  <li>titleHeader</li>
                  <li>titleOrder</li>
                  <li>payWithCard</li>
                  <li>footerTitle</li>
                  <li>feeExtra</li>
                </ol>
              </li>
              <li>urlImage</li>
              <li>nameStore</li>
              <li>invoice</li>
              <li>amount</li>
              <li>currency</li>
              <li>
                processors[], es un array con los procesadores como items, con
                las siguientes propiedades:
                <ul class="pl-5 mt-2 space-y-1 list-decimal list-inside">
                  <li>name</li>
                  <li>image</li>
                  <li>fee</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </ModalStatic>

    <ModalDelete
      :title="'Template'"
      @submit-form="deleteTemplateDb()"
      @hide-modal="hideModalDelete()"
    >
    </ModalDelete>


    <BlockContentHeader>
      <template #title> Templates</template>
      <template #options>
        <button class="btnContentHeader1 mr-5" @click="abrirModal()">
          <img
            src="~/assets/playground_assets/usersharedline7476-sslo.svg?url"
          />
          <span> New </span>
        </button>
      </template>
    </BlockContentHeader>
    <table-templates
      v-if="data.templates"
      :templates="data.templates"
      @edit-modal="editModalTemplate"
      @delete-template="deleteTemplate"
    ></table-templates>
  </div>
</template>

<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { Modal } from "flowbite";
import type { ModalOptions } from "flowbite";
import { required, helpers, email, url } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import { Template, TemplatePagination } from "~/interfaces/templates";
import Handlebars from "handlebars";
import { showToast } from "~/composables/toastLiderPro";
const { $swal } = useNuxtApp();
const cookie = useCookie("token");
//@ts-ignore
const token = cookie.value.token;
const formHttpError = ref("");
const EditRow = ref({});
const modal = ref();
const modalEditTemplate = ref();
const idDelete = ref("")
const modalDelete = ref();

useHead({
  title: "Lider | Templates",
  meta: [{ name: "description", content: "Templates page." }],
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/ace-builds@1.22.0/src-min-noconflict/ace.min.js",
      type: "text/javascript",
      async: true,
    },
  ],
});

const data = reactive({
  templates: {} as () => TemplatePagination,
  search: "",
  limit: 10,
  page: 1,
  tabHtmlPreview: 0,
  templateEdit: {} as Template,
  htmlPreview: "",
  arrayTest: ["uno", "dos", "tres"],
  templateData: {
    languaje: {
      titleHeader: "",
      titleOrder: "",
      payWithCard: "",
      footerTitle: "",
      feeExtra: "",
    },
    urlImage: urlApi + "/uploads/",
    nameStore: "Test Store",
    invoice: "44yuer/()Sd",
    amount: "25",
    currency: "USD",

    processors: {
      stripe: {
        id: "",
        image: "",
        name: "",
        identy: "",
        fee_extra:7,
        fee_type: "%",
        fee: "",
      },
    },
  },
});

const form = reactive({
  name: "",
  type: 1,
});

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("The name field is required", required),
    },
  };
});
const v$ = useVuelidate(rules, form);

async function get_templates() {
  const query = gql`
    query {
      templates(page: ${data.page}, limit: ${data.limit}, search: "${data.search}") {
        templates{
      _id
      name
      html
      type
    },
    count
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
  }
  languajes(lang:"English"){
    titleHeader
    titleOrder
    payWithCard
    footerTitle
    feeExtra
  }
  processorsTemplate{
    _id
    name
    identy
    image
    fee
    fee_type
    fee_extra
  }
    }
  `;
  try {
    const response = await useAsyncQuery(query);
    console.log("respise", response);
    //@ts-ignore
    data.templates = response.data.value.templates;
    //@ts-ignore
    data.templateData.languaje = response.data.value.languajes;
    //@ts-ignore
    data.templateData.processors = response.data.value.processorsTemplate;
    console.log("templates", data.templates);
  } catch (e) {
    console.log("error", e);
  }
}
async function editModalTemplate(row: Template) {
  console.log("editando el template", row);
  data.templateEdit = row;
  Handlebars.registerHelper("isMayor", function (a, b, options) {
    if (a > b) {
      //@ts-ignore
      return options.fn(this);
    } else {
      //@ts-ignore
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper("isIgual", function (a, b, options) {
    if (a === b) {
      //@ts-ignore
      return options.fn(this);
    } else {
      //@ts-ignore
      return options.inverse(this);
    }
  });

  var template = Handlebars.compile(data.templateEdit.html);

  var result = template(data.templateData);
  data.htmlPreview = result;
  modalEditTemplate.value.toggle();
}
function abrirModal() {
  data.templateEdit = {} as Template;
  modal.value.toggle();
}
async function submitForm() {
  console.log("submit form");
  v$.value.$validate();
  if (!v$.value.$error) {
    console.log("todo bien validado");
    try {


      const mutation = gql`
        mutation {
          createTemplate(
            createTemplateInput: { name: "${form.name}", type: ${form.type}, html: "" }
          ) {
            name
          }
        }
      `;
      const response = await useAsyncQuery(mutation);
      console.log("response", response);
      showToast("Template add successfully.", "bottom", 3000)
      modal.value.hide();
      formHttpError.value = "";
      await get_templates();
    } catch (e) {
      console.log("error", e);
      //@ts-ignore
      formHttpError.value = e.message;
    }
  } else {
    console.log("no esta bien validado");
  }
}
async function submitFormEdit() {
  try {
    
    const response = await $fetch(urlApi + "/templates/update", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: {
        id: data.templateEdit._id,
        html: data.templateEdit.html,
      },
    });
    console.log("response", response);
    showToast("Template update successfully", "bottom", 3000)
    get_templates();
    modalEditTemplate.value.hide();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}
function hideModal() {
  modal.value.hide();
}

function deleteTemplate(id: string) {
  idDelete.value = id
  modalDelete.value.show()
 
}

async function deleteTemplateDb() {
  try {
    const mutation = gql`
      mutation {
        removeTemplate(id: "${idDelete.value}") {
          _id
        }
      }
    `;
    const response = await useAsyncQuery(mutation);
    console.log("response", response);
    modalDelete.value.hide()
    showToast("template delete successfully", "bottom", 3000)
    formHttpError.value = "";
    await get_templates();
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}

function hideModalEdit() {
  modalEditTemplate.value.hide();
}
function selectPreview(val: number) {
  if (val == 1) {
    var template = Handlebars.compile(data.templateEdit.html);

    var result = template(data.templateData);
    data.htmlPreview = result;
  }
  data.tabHtmlPreview = val;
}
async function iniciar_modals(){
  const $modalElement: any = document.querySelector("#modalNewTemplate");
  const $modalElementEditTemplate: any =
    document.querySelector("#modalEditTemplate");
  const modalOptionsEditTemplate: ModalOptions = {
    placement: "top-center",
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
  modalEditTemplate.value = new Modal(
    $modalElementEditTemplate,
    modalOptionsEditTemplate
  );
  modalDelete.value = new Modal($modalDelete, modalDeleteOption);
}
function hideModalDelete() {
  modalDelete.value.hide();
}
onMounted(async () => {
  await iniciar_modals()
  nextTick(async () => {
    await get_templates();
  });
});
</script>

<style>
.editor {
  min-height: 600px;
  margin: 0;
  text-align: left;
}
.monaco-editor .suggest-widget .monaco-list .monaco-list-row .suggest-icon.method::before,
.monaco-editor .suggest-widget .monaco-list .monaco-list-row .suggest-icon.function::before
/* copied from lightbulb */ {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS42NzA4IDguNjU4MDZDMTEuMzMxOSA4Ljk5MTYgMTEuMDcxNiA5LjM2Mjc4IDEwLjg4ODYgOS43NzE3MkMxMC43MTA1IDEwLjE3OTIgMTAuNjIxIDEwLjYyMTkgMTAuNjIxIDExLjEwMDlWMTIuNzAxMkMxMC42MjEgMTIuODgwNyAxMC41ODcyIDEzLjA1MDMgMTAuNTE4OSAxMy4yMDkxQzEwLjQ1MTMgMTMuMzY2MSAxMC4zNTg2IDEzLjUwMzggMTAuMjQwNyAxMy42MjEzQzEwLjEyMjggMTMuNzM4OCA5Ljk4NDY0IDEzLjgzMTEgOS44MjcyMyAxMy44OTg0QzkuNjY4MDYgMTMuOTY2MyA5LjQ5ODA2IDE0IDkuMzE4MjMgMTRINy43MTIwNUM3LjUzMjIzIDE0IDcuMzYyMjMgMTMuOTY2MyA3LjIwMzA2IDEzLjg5ODRDNy4wNDU2NCAxMy44MzExIDYuOTA3NTMgMTMuNzM4OCA2Ljc4OTYxIDEzLjYyMTNDNi42NzE2OCAxMy41MDM4IDYuNTc4OTUgMTMuMzY2MSA2LjUxMTQxIDEzLjIwOTFDNi40NDMxMSAxMy4wNTAzIDYuNDA5MjcgMTIuODgwNyA2LjQwOTI3IDEyLjcwMTJWMTEuMTAwOUM2LjQwOTI3IDEwLjYyMiA2LjMxNzcyIDEwLjE3OTUgNi4xMzU1MyA5Ljc3MjA5QzUuOTU2ODMgOS4zNjMzNiA1LjY5ODMyIDguOTkxNTYgNS4zNTk1MyA4LjY1ODA2QzQuOTI0NjggOC4yMjkwMyA0LjU4ODk2IDcuNzUwMDMgNC4zNTM2MSA3LjIyMTM0QzQuMTE3NTYgNi42OTEwNyA0IDYuMTE2NzIgNCA1LjQ5OTUzQzQgNS4wODY2NCA0LjA1MzQyIDQuNjg4MDIgNC4xNjA0OCA0LjMwMzk3QzQuMjY3MjggMy45MjA4OSA0LjQxOTA3IDMuNTYyODYgNC42MTU5NSAzLjIzMDE4QzQuODEyNTcgMi44OTM3NyA1LjA0Nzc3IDIuNTg5MTEgNS4zMjE0NiAyLjMxNjQxQzUuNTk1MDMgMi4wNDM4MyA1Ljg5ODU4IDEuODA5NTMgNi4yMzE5NSAxLjYxMzY0QzYuNTY5NzkgMS40MTc2NCA2LjkzMTQ2IDEuMjY2MiA3LjMxNTc4IDEuMTU5ODNDNy43MDEwNiAxLjA1MzIgOC4xMDA5NCAxIDguNTE1MTQgMUM4LjkyOTM0IDEgOS4zMjkyMyAxLjA1MzIgOS43MTQ1MSAxLjE1OTgzQzEwLjA5ODggMS4yNjYyIDEwLjQ1OCAxLjQxNzM5IDEwLjc5MTggMS42MTM1MUMxMS4xMjk0IDEuODA5MzggMTEuNDM1MSAyLjA0MzcgMTEuNzA4OCAyLjMxNjQxQzExLjk4MjUgMi41ODkxIDEyLjIxNzcgMi44OTM3NiAxMi40MTQzIDMuMjMwMTZDMTIuNjExMiAzLjU2Mjg1IDEyLjc2MyAzLjkyMDg4IDEyLjg2OTggNC4zMDM5N0MxMi45NzY5IDQuNjg4MDIgMTMuMDMwMyA1LjA4NjY0IDEzLjAzMDMgNS40OTk1M0MxMy4wMzAzIDYuMTE2NzIgMTIuOTEyNyA2LjY5MTA3IDEyLjY3NjcgNy4yMjEzNEMxMi40NDEzIDcuNzUwMDMgMTIuMTA1NiA4LjIyOTAzIDExLjY3MDggOC42NTgwNlpNOS42MjE2MiAxMC41SDcuNDA4NjdWMTIuNzAxMkM3LjQwODY3IDEyLjc4MjMgNy40MzcyIDEyLjg1MTIgNy40OTg4OCAxMi45MTI3QzcuNTYwNTggMTIuOTc0MSA3LjYzMDA3IDEzLjAwMjggNy43MTIwNSAxMy4wMDI4SDkuMzE4MjNDOS40MDAyMiAxMy4wMDI4IDkuNDY5NzEgMTIuOTc0MSA5LjUzMTQgMTIuOTEyN0M5LjU5MzA5IDEyLjg1MTIgOS42MjE2MiAxMi43ODIzIDkuNjIxNjIgMTIuNzAxMlYxMC41WiIgZmlsbD0iI0ZGQ0MwMCIvPgo8L3N2Zz4K) !important;
}
</style>
