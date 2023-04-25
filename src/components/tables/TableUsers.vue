<template>
  <div>
    <ModalStatic
      :idModal="'modalUser'"
      :title="'User'"
      @submit-form="submitForm()"
      @hide-modal="hideModal()"
    >
      <template #content>
        <form>
          <div class="mb-6 relative">
            <label for="fullName" class="font-normal text-sm">Full name</label>
            <input
              type="text"
              id="fullName"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter full name"
              name="fullName"
              v-model="form.fullName"
              @blur="v$.fullName.$touch"
              :class="{
                'border-red-500 focus:border-red-500': v$.fullName.$error,
              }"
            />
            <div v-if="v$.fullName.$error">
              <ul>
                <li
                  v-for="(error, index) in v$.fullName.$errors"
                  :key="index"
                  class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                  {{ error.$message }}
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-6 relative">
            <label for="email" class="font-normal text-sm">Email</label>
            <input
              type="text"
              id="email"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter email"
              name="email"
              v-model="form.email"
              @blur="v$.email.$touch"
              :class="{
                'border-red-500 focus:border-red-500': v$.email.$error,
                'border-[#42d392] ': !v$.email.$invalid,
              }"
            />
            <div v-if="v$.email.$invalid || v$.email.$error">
              <ul>
                <li
                  v-for="(error, index) in v$.email.$errors"
                  :key="index"
                  class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                  {{ error.$message }}
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-6">
            <label for="password" class="font-normal text-sm">Password</label>
            <input
              type="password"
              id="password"
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              placeholder="Enter new password"
              name="password"
              v-model="form.password"
              @blur="v$.password.$touch"
              :class="{
                'border-red-500 focus:border-red-500': v$.password.$error,
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
              <span :class="{ 'text-red-600': error.password.min == true }"
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
                  'text-red-600': error.password.lowercase == true,
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
                  'text-red-600': error.password.uppercase == true,
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
                  'text-red-600': error.password.digits == true,
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
                  'text-red-600': error.password.symbols == true,
                }"
                >Special characters ( ex. !@#$%{&*)</span
              >
            </div>
          </div>
          <div class="mb-6 relative">
            <label for="role" class="font-normal text-sm">Role</label>
            <select
              id="role"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#665AEC]"
              v-model="form.role"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
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
    <BlockContentHeader>
      <template #title> Users</template>
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
            placeholder="Search by email or name"
            v-model="dataUsers.search"
            @keyup.enter="get_users()"
          />
        </div>
      </div>

      <div class="relative overflow-x-auto mt-10">
        <table class="w-full text-sm text-left">
          <thead class="uppercase">
            <tr>
              <th scope="col" class="px-6 py-3 text-lef">#</th>
              <th scope="col" class="px-6 py-3 text-left">Full name</th>
              <th scope="col" class="px-6 py-3 text-center">Email</th>
              <th scope="col" class="px-6 py-3 text-center">Role</th>
              <th scope="col" class="px-6 py-3 text-center">Active</th>
              <th scope="col" class="px-6 py-3 text-center">Created</th>
              <th scope="col" class="px-6 py-3 text-center">Updated</th>
              <th scope="col" class="px-6 py-3 text-center">Options</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="hover:bg-gray-50"
              v-for="(row, index) in dataUsers.users"
              :key="index"
            >
              <th scope="row" class="px-6 py-4">{{ index + 1 }}</th>
              <td class="px-6 py-4 capitalize">{{ row.fullName }}</td>
              <td class="px-6 py-4">{{ row.email }}</td>
              <td class="px-6 py-4 capitalize">{{ row.role }}</td>
              <td class="px-6 py-4 text-center">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    :checked="row.active"
                    @change="changeStatusUser(row._id, row.active)"
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
                {{ convertDate(row.updated) }}
              </td>
              <td class="px-6 py-4">
                <div class="flex">
                  <button class="btnContentHeader1 mr-5" @click="editUser(row)">
                    <img
                      src="~/assets/playground_assets/pencilfill9110-b58h.svg?url"
                    />
                    <span> Edit </span>
                  </button>
                  <button
                    class="btnContentHeader1 mr-5"
                    @click="deleteUser(row._id)"
                  >
                    <img
                      src="~/assets/playground_assets/delete-bin-4-fill.svg?url"
                    />
                    <span> Delete </span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="optionsTable flex justify-between mt-8 mb-10">
          <span>{{ dataUsers.count }} Results</span>
          <div class="flex">
            <button
              class="btnContentHeader1 mr-5"
              @click="get_users(dataUsers.previousPage)"
              v-show="dataUsers.hasPreviousPage"
            >
              <img
                src="~/assets/playground_assets/arrowleftline4884-80z7.svg?url"
              />
              <span> Previous </span>
            </button>
            <button
              class="btnContentHeader1 mr-5"
              @click="get_users(dataUsers.nextPage)"
              v-show="dataUsers.hasNextPage"
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
import { required, helpers, minLength, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import passwordValidator from "password-validator";
import type { ValidatorFn, ValidationArgs } from "@vuelidate/core";
import { useToast, useModal } from "tailvue";
const { $swal } = useNuxtApp();
const cookie = useCookie("token");
//@ts-ignore
const token = cookie.value.token;

const passwordSchema = new passwordValidator();

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

const error = reactive({
  password: {
    min: false,
    uppercase: false,
    lowercase: false,
    digits: false,
    symbols: false,
  },
});
const formHttpError = ref("");
const editUserForm = ref(false);
const idUserEdit = ref("");
const modal = ref();
const dataUsers = reactive({
  users: [] as User[],
  count: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  nextPage: 1,
  previousPage: 0,
  totalPages: 0,
  limitPages: 2,
  search: "",
});

const form = reactive({
  fullName: "",
  email: "",
  password: "",
  role: "user",
});
const validPassword: ValidatorFn = (
  value: string,
  args?: ValidationArgs
): any => {
  const valid = passwordSchema.validate(value, { details: true });
  // console.log("valid", valid);

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
    fullName: {
      required: helpers.withMessage(
        "The full name field is required",
        required
      ),
    },
    email: {
      required: helpers.withMessage("The email field is required", required),
      email: helpers.withMessage("Invalid email format", email),
    },
    password: {
      validPassword,
    },
  };
});

const v$ = useVuelidate(rules, form);
function reset_error() {
  error.password.min = false;
  error.password.digits = false;
  error.password.lowercase = false;
  error.password.uppercase = false;
  error.password.symbols = false;
}

watch(
  () => v$.value.password.validPassword.$response.$message,
  async (nuevoValor, valorAnterior) => {
    //   console.log("prop data cambio ", nuevoValor, valorAnterior);
    if (Array.isArray(nuevoValor)) {
      reset_error();
      for (let i = 0; i < nuevoValor.length; i++) {
        // @ts-ignore
        if (nuevoValor[i].validation == "min") {
          error.password.min = true;
        }
        // @ts-ignore
        if (nuevoValor[i].validation == "symbols") {
          error.password.symbols = true;
        }
        // @ts-ignore
        if (nuevoValor[i].validation == "uppercase") {
          error.password.uppercase = true;
        }
        // @ts-ignore
        if (nuevoValor[i].validation == "lowercase") {
          error.password.lowercase = true;
        }
        // @ts-ignore
        if (nuevoValor[i].validation == "digits") {
          error.password.digits = true;
        }
      }
    }
  },
  { immediate: true }
);

console.log(token);
interface User {
  _id?: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  created: string;
  updated: string;
  active?: boolean;
}
async function get_users(page = 1) {
  try {
    const response = await $fetch(
      urlApi +
        "/users?page=" +
        page +
        "&limit=" +
        dataUsers.limitPages +
        "&search=" +
        dataUsers.search,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("response", response);
    //@ts-ignore
    dataUsers.users = response.users;
    //@ts-ignore
    dataUsers.hasNextPage = response.hasNextPage;
    //@ts-ignore
    dataUsers.hasPreviousPage = response.hasPreviousPage;
    //@ts-ignore
    dataUsers.nextPage = response.nextPage;
    //@ts-ignore
    dataUsers.previousPage = response.previousPage;
    //@ts-ignore
    dataUsers.totalPages = response.totalPages;
    //@ts-ignore
    dataUsers.count = response.count;
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
    if (editUserForm.value == true) {
      await edit_user();
    } else {
      await add_user();
    }
  } else {
    console.log("no esta bien validado");
  }
}
function deleteUser(id: string | undefined) {
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
        deleteUserDb(id);
      }
    });
}
async function deleteUserDb(id: string | undefined) {
  try {
    const $toast = useToast();
    const response = await $fetch(urlApi + "/users/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("response", response);
    $toast.success("User delete successfully");
    get_users();
    modal.value.hide();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}
async function edit_user() {
  try {
    const $toast = useToast();
    const response = await $fetch(urlApi + "/users/" + idUserEdit.value, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: form,
    });
    console.log("response", response);
    $toast.success("User inserted successfully");
    get_users();
    modal.value.hide();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}

async function add_user() {
  const $toast = useToast();
  const response = await useAsyncData(async () => {
    return await $fetch(
      // @ts-ignore
      urlApi + "/users",
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
    $toast.success("User inserted successfully");
    get_users();
    modal.value.hide();
    formHttpError.value = "";
  }
}

function abrirModal() {
  editUserForm.value = false;
  //@ts-ignore
  idUserEdit.value = "";
  form.fullName = ""
  form.email = ""
  form.role = ""
  form.password = ""
  modal.value.toggle();
}
function hideModal() {
  modal.value.hide();
}

function editUser(user: User) {
  editUserForm.value = true;
  //@ts-ignore
  idUserEdit.value = user._id;
  form.fullName = user.fullName;
  form.email = user.email;
  form.role = user.role;
  form.password = "User1234*";
  modal.value.toggle();
}
async function changeStatusUser(id: string | undefined, status: boolean | undefined) {
  console.log("change active user ", status);
  const newStatusUser = !status;
  try {
    const $toast = useToast();
    const response = await $fetch(urlApi + "/users/" + id + "/active", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: {
        active: newStatusUser,
      },
    });
    console.log("response", response);
    $toast.success("User update successfully");
    get_users();
    modal.value.hide();
    formHttpError.value = "";
  } catch (e) {
    console.log("error", e);
    //@ts-ignore
    formHttpError.value = e.message;
  }
}
onMounted(async () => {
  const $modalElement: any = document.querySelector("#modalUser");
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

  await get_users();
});
</script>
