<template>
  <ModalStatic
    :idModal="'modalPassword'"
    :title="'Change password'"
    @submit-form="submitForm()"
    @hide-modal="hideModal()"
  >
    <template #content>
      <form @submit="submitForm()">
        <div class="mb-6 relative">
          <label for="current_password" class="font-normal text-sm"
            >Current password</label
          >
          <input
            type="password"
            id="current_password"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
            placeholder="Enter current password"
            name="current_password"
            v-model="form.current_password"
            @blur="v$.current_password.$touch"
            :class="{
              'border-red-500 focus:border-red-500': v$.current_password.$error,
            }"
          />
          <div v-if="v$.current_password.$error">
            <ul>
              <li
                v-for="(error, index) in v$.current_password.$errors"
                :key="index"
                class="mt-2 text-sm text-red-600 dark:text-red-500"
              >
                {{ error.$message }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mb-6">
          <label for="password" class="font-normal text-sm">New password</label>
          <input
            type="password"
            id="password"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
            placeholder="Enter new password"
            name="password"
            v-model="form.new_password"
            @blur="v$.new_password.$touch"
            :class="{
              'border-red-500 focus:border-red-500': v$.new_password.$error,
            }"
          />
        </div>

        <div class="mb-6 font-normal text-sm text-[#6c6f75]">
          <div class="flex flex-row mb-2">
            <img
              src="~/assets/playground_assets/thinchecki911-qshi.svg?url"
              alt=""
              class="mr-2"
            />
            <span
              :class="{ 'text-red-600': error.new_password_error.min == true }"
              >At least 8 character</span
            >
          </div>
          <div class="flex flex-row mb-2">
            <img
              src="~/assets/playground_assets/thinchecki911-qshi.svg?url"
              alt=""
              class="mr-2"
            />
            <span
              :class="{
                'text-red-600': error.new_password_error.lowercase == true,
              }"
              >Lower case letters (a-z)</span
            >
          </div>
          <div class="flex flex-row mb-2">
            <img
              src="~/assets/playground_assets/thinchecki911-qshi.svg?url"
              alt=""
              class="mr-2"
            />
            <span
              :class="{
                'text-red-600': error.new_password_error.uppercase == true,
              }"
              >Upper case letters (A-Z)</span
            >
          </div>
          <div class="flex flex-row mb-2">
            <img
              src="~/assets/playground_assets/thinchecki911-qshi.svg?url"
              alt=""
              class="mr-2"
            />
            <span
              :class="{
                'text-red-600': error.new_password_error.digits == true,
              }"
              >Numbers (0-9)</span
            >
          </div>
          <div class="flex flex-row mb-2">
            <img
              src="~/assets/playground_assets/thinchecki911-qshi.svg?url"
              alt=""
              class="mr-2"
            />
            <span
              :class="{
                'text-red-600': error.new_password_error.symbols == true,
              }"
              >Special characters ( ex. !@#$%{&*)</span
            >
          </div>
          <div v-if="formHttpError!=''" class="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">Error:</strong>
  <span class="block sm:inline">{{formHttpError}}</span>
</div>
        </div>
      </form>
    </template>
  </ModalStatic>

  <NuxtLayout name="user-profile">
    
    <template #header>

  

      <h2 class="sm:mt-0 mt-4">Personal information</h2>
      <button
        class="text-white bg-[#665AEC] hover:bg-[#5d54c9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
        @click="abrirModal()"
      >
        Edit
      </button>
    </template>
    <template #content>
      <div class="user-profile-description-settings grid grid-cols-12 mt-2">
        <div class="lg:col-span-6 col-span-full">
          <user-item-settings :title="'Julian Perez'" :subtitle="'Full name'">
            <template #iconLeft>
              <img
                src="~/assets/playground_assets/user6line9110-khwm.svg?url"
                alt=""
              />
            </template>
          </user-item-settings>
          <user-item-settings :title="'Administrator'" :subtitle="'Role name'">
            <template #iconLeft>
              <img
                src="~/assets/playground_assets/adminline9110-ywq.svg?url"
                alt=""
              />
            </template>
          </user-item-settings>
          <user-item-settings
            :title="'20, March, 2023'"
            :subtitle="'Creation date'"
          >
            <template #iconLeft>
              <img
                src="~/assets/playground_assets/calendareventline9110-q9s.svg?url"
                alt=""
              />
            </template>
          </user-item-settings>
        </div>
        <div class="lg:col-span-6 col-span-full">
          <user-item-settings
            :title="'hectoracosta5@gmail.com'"
            :subtitle="'Email address'"
          >
            <template #iconLeft>
              <img
                src="~/assets/playground_assets/mailopenline9110-414r.svg?url"
                alt=""
              />
            </template>
          </user-item-settings>
          <user-item-settings :title="'**************'" :subtitle="'Password'">
            <template #iconLeft>
              <img
                src="~/assets/playground_assets/lock2line9110-k8hm.svg?url"
                alt=""
              />
            </template>
            <template #iconRight>
              <div
                style="cursor: pointer"
                class="p-3 mr-auto bg-[#f6f8fa] hover:bg-[#d9dcdf]"
                data-modal-target="modalPassword"
                data-modal-toggle="modalPassword"
              >
                <img
                  src="~/assets/playground_assets/pencilfill9110-b58h.svg?url"
                  alt=""
                />
              </div>
            </template>
          </user-item-settings>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { required, helpers, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import passwordValidator from "password-validator";
import type { ValidatorFn, ValidationArgs } from "@vuelidate/core";
import { Modal, initDropdowns } from "flowbite";

import type { ModalOptions, ModalInterface } from "flowbite";
const passwordSchema = new passwordValidator();
import { useToast } from 'tailvue'
const formHttpError = ref("")
const modal = ref();
const cookie = useCookie("token");
passwordSchema
  .is()
  .min(8) // Mínimo 8 caracteres
  .has()
  .uppercase() // Al menos una letra mayúscula
  .has()
  .lowercase() // Al menos una letra minúscula
  .has()
  .digits() // Al menos un número
  .has()
  .symbols();

const form = reactive({
  current_password: "",
  new_password: "",
});
const error = reactive({
  current_password_error: {
    text: "",
    status: false,
  },
  new_password_error: {
    min: false,
    uppercase: false,
    lowercase: false,
    digits: false,
    symbols: false,
  },
});
const validPassword: ValidatorFn = (
  value: string,
  args?: ValidationArgs
): any => {
  const valid = passwordSchema.validate(value, { details: true });
  //console.log("valid", valid);

  const errors = {
    $valid: false,
    $message: {},
  };
  if (Array.isArray(valid)) {
    errors.$message = valid;
    if (valid.length == 0) {
      errors.$valid = true;
    }
  }
  return errors;
};
const rules = computed(() => {
  return {
    current_password: {
      required: helpers.withMessage("The password field is required", required),
    },
    new_password: {
      validPassword,
    },
  };
});

const v$ = useVuelidate(rules, form);

watch(
  () => v$.value.new_password.validPassword.$response.$message,
  async (nuevoValor, valorAnterior) => {
    //  console.log("prop data cambio ", nuevoValor, valorAnterior);
    if (Array.isArray(nuevoValor)) {
      reset_error();
      for (let i = 0; i < nuevoValor.length; i++) {
        // @ts-ignore
        if (nuevoValor[i].validation == "min") {
          error.new_password_error.min = true;
        }
        // @ts-ignore
        if (nuevoValor[i].validation == "symbols") {
          error.new_password_error.symbols = true;
        }
        // @ts-ignore
        if (nuevoValor[i].validation == "uppercase") {
          error.new_password_error.uppercase = true;
        }
        // @ts-ignore
        if (nuevoValor[i].validation == "lowercase") {
          error.new_password_error.lowercase = true;
        }
        // @ts-ignore
        if (nuevoValor[i].validation == "digits") {
          error.new_password_error.digits = true;
        }
      }
    }
  },
  { immediate: true }
);
function reset_error() {
  error.new_password_error.min = false;
  error.new_password_error.digits = false;
  error.new_password_error.lowercase = false;
  error.new_password_error.uppercase = false;
  error.new_password_error.symbols = false;
}
async function change_password() {
  const $toast = useToast()
  const response = await useAsyncData(async () => {
    
    return await $fetch(
      // @ts-ignore
      urlApi + "/users/" + cookie.value.user.id + "/password",
      {
        method: "PUT",
        body: {
          current_password: form.current_password,
          new_password: form.new_password,
        },
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
    formHttpError.value = data.message
  } else {
    const data:any = response.data.value;
    console.log("response", data);
    $toast.success('Password updated successfully')
    modal.value.hide()
  }
}

async function submitForm() {
  console.log("submit form");
  v$.value.$validate();
  if (!v$.value.$error) {
    console.log("todo bien validado");
    await change_password();
  } else {
    console.log("no esta bien validado");
  }
}

function hideModal() {
  modal.value.hide();
}

function abrirModal() {
  form.current_password = "", 
  form.new_password = ""
  modal.value.toggle();
}

onMounted(() => {
  const $modalElement: any = document.querySelector("#modalPassword");
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


  initDropdowns()


});
</script>
