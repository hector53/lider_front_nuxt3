<template>
  <ModalStatic
    :idModal="'modalWebhook'"
    :title="'Change webhook'"
    :btnSave="'Save changes'"
    @submit-form="submitForm()"
    @hide-modal="hideModal()"
  >
    <template #content>
      <form>
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
  <NuxtLayout name="user-profile">
    <template #title> Settings </template>
    <template #header>
      <h2 class="sm:mt-0 mt-4">Site information</h2>
      <button
        @click="abrirModal()"
        class="text-white bg-[#665AEC] hover:bg-[#5d54c9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
      >
        Edit
      </button>
    </template>
    <template #content>
      <div class="user-profile-description-settings grid grid-cols-12 mt-2">
        <div class="lg:col-span-6 col-span-full">
          <user-item-settings :title="data.siteUser.site" :subtitle="'Website'">
            <template #iconLeft>
              <img
                src="~/assets/playground_assets/mailopenline9110-414r.svg?url"
                alt=""
              />
            </template>
          </user-item-settings>
        </div>
        <div class="lg:col-span-6 col-span-full">
          <user-item-settings
            :title="urlApi + '/payment'"
            :subtitle="'API url'"
          >
            <template #iconLeft>
              <img
                src="~/assets/playground_assets/user6line9110-khwm.svg?url"
                alt=""
              />
            </template>
          </user-item-settings>
        </div>

        <div class="lg:col-span-6 col-span-full">
          <user-item-settings
            :title="data.siteUser.webhook"
            :subtitle="'Webhook'"
          >
            <template #iconLeft>
              <img
                src="~/assets/playground_assets/adminline9110-ywq.svg?url"
                alt=""
              />
            </template>
          </user-item-settings>
        </div>
      </div>
      <div
        class="user-profile-description-header flex sm:flex-row sm:justify-between flex-col mt-5"
      >
        <h2>Site keys</h2>
      </div>
      <div class="user-profile-description-settings grid grid-cols-12 mt-2">
        <div class="lg:col-span-6 col-span-full">
          <user-item-settings
            :title="data.siteUser.public_key"
            :subtitle="'Publi API key'"
          >
            <template #iconLeft>
              <img src="~/assets/playground_assets/key-2-line.svg?url" alt="" />
            </template>
          </user-item-settings>
        </div>

        <div class="lg:col-span-6 col-span-full">
          <user-item-settings
            :title="clicPrivateTokenAction"
            :subtitle="'Private token'"
          >
            <template #iconLeft>
              <img src="~/assets/playground_assets/key-2-line.svg?url" alt="" />
            </template>
            <template #iconRight>
              <div
                style="cursor: pointer"
                class="p-3 mr-auto bg-[#f6f8fa] hover:bg-[#d9dcdf]"
                @click="data.clicPrivateToken = !data.clicPrivateToken"
              >
                <img src="~/assets/playground_assets/eye-fill.svg?url" alt="" />
              </div>
            </template>
          </user-item-settings>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Modal } from "flowbite";
import type { ModalOptions } from "flowbite";
import { required, helpers, email, url } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useToast, useModal } from "tailvue";
const { $swal } = useNuxtApp();
const cookie = useCookie("token");
//@ts-ignore
const token = cookie.value.token;
const formHttpError = ref("");
const idEditRow = ref("");
const modal = ref();

interface getSiteByUserId {
  private_key: string;
  public_key: string;
  site: string;
  webhook: string;
  _id: string;
}

const form = reactive({
  webhook: "",
});
const rules = computed(() => {
  return {
    webhook: {
      required: helpers.withMessage("The webhook field is required", required),
      url,
    },
  };
});
const v$ = useVuelidate(rules, form);

const data = reactive({
  privateTokenHidden: "*****************",
  clicPrivateToken: false,
  siteUser: {} as getSiteByUserId,
});

const clicPrivateTokenAction = computed<string>(() => {
  if (data.clicPrivateToken) {
    // Realiza la acción que deseas cuando clicPrivateToken cambia a true
    return data.siteUser.private_key;
  } else {
    // Realiza la acción que deseas cuando clicPrivateToken cambia a false
    return data.privateTokenHidden;
  }
});

async function get_site_by_id_user(id: string = payloadToken.id) {
  const query = gql`
  query{
  getSiteByUserId(id:"${id}"){
    _id
    site
    webhook
    public_key
    private_key
  }
}
  `;
  try {
    const response = await useAsyncQuery(query);
    console.log("respise", response);
    //@ts-ignore
    data.siteUser = response.data.value.getSiteByUserId;
  } catch (e) {
    console.log("error", e);
  }
}
get_site_by_id_user();

async function submitForm() {
  //save changes webhook
  const $toast = useToast();
  const query = gql`
    mutation {
      updateSiteWebhook(
        site_id: "${data.siteUser._id}"
        webhook: "${form.webhook}"
      ) {
        _id
        webhook
      }
    }
  `;
  try {
    const response = await useAsyncQuery(query);
    console.log("respise", response);
    modal.value.hide()
    $toast.success("Successfully edited");
    //@ts-ignore
    get_site_by_id_user()

  } catch (e) {
    console.log("error", e);
  }
}

function abrirModal() {
  //@ts-ignore
  idEditRow.value = data.siteUser._id;
  form.webhook = data.siteUser.webhook;
  modal.value.toggle();
}
function hideModal() {
  modal.value.hide();
}

onMounted(() => {
  const $modalElement: any = document.querySelector("#modalWebhook");
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
});
</script>

<style lang="scss" scoped></style>
