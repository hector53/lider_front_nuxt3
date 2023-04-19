<template>
  <ModalStatic :idModal="'modalPassword'" :title="'Change password'">
    <template #content>
      <form>
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
            v-model="form.curren_password"
            required
            :class="{
              'border-red-500 focus:border-red-500': v$.curren_password.$error,
              'border-[#42d392] ': !v$.curren_password.$invalid,
            }"
            @change="v$.curren_password.$touch"
          />


          <Icon
            class="absolute right-2 h-full text-xl text-green-500"
            :class="{
              'text-green-500': !v$.curren_password.$invalid,
              'text-yellow-500': v$.curren_password.$error,
            }"
            :name="`heroicons-solid:${
              !v$.curren_password.$error ? 'check-circle' : 'exclamation'
            }`"
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
           aqui va el error:  </p>
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
          />
        </div>

        <div class="mb-6 font-normal text-sm text-[#6c6f75]">
          <div class="flex flex-row mb-2">
            <img
              src="~/assets/playground_assets/thinchecki911-qshi.svg?url"
              alt=""
              class="mr-2"
            />
            <span>At least 8 character</span>
          </div>
          <div class="flex flex-row mb-2">
            <img
              src="~/assets/playground_assets/thinchecki911-qshi.svg?url"
              alt=""
              class="mr-2"
            />
            <span>Lower case letters (a-z)</span>
          </div>
          <div class="flex flex-row mb-2">
            <img
              src="~/assets/playground_assets/thinchecki911-qshi.svg?url"
              alt=""
              class="mr-2"
            />
            <span>Upper case letters (A-Z)</span>
          </div>
          <div class="flex flex-row mb-2">
            <img
              src="~/assets/playground_assets/thinchecki911-qshi.svg?url"
              alt=""
              class="mr-2"
            />
            <span>Numbers (0-9)</span>
          </div>
          <div class="flex flex-row mb-2">
            <img
              src="~/assets/playground_assets/thinchecki911-qshi.svg?url"
              alt=""
              class="mr-2"
            />
            <span>Special characters ( ex. !@#$%{&*)</span>
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
        data-modal-target="modalPassword"
        data-modal-toggle="modalPassword"
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

const form = reactive({
  curren_password: null,
  new_password: null,
});
const error = reactive({
  current_password_error: "",

  new_password_error: "",
});

const rules = computed(() => {
  return {
    curren_password: {
      required: helpers.withMessage("The password field is required", required),
    },
    new_password: {
      required: helpers.withMessage(
        "The password confirmation field is required",
        required
      ),
      minLength: minLength(8),
    },
  };
});

const v$ = useVuelidate(rules, form);
</script>
