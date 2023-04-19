<template>
  <div class="relative overflow-auto sm:pt-6 sm:pl-10 sm:pr-10 p-4 layoutUserProfile">
    <div class="grid grid-cols-12  gap-4 mt-6 ">
      <div class="p-4 lg:col-span-3 md:col-span-5 col-span-full bg-white mini-chart-card ">
        <div class="user-profile-avatar">
          <div class="avatar-container">
            <div class="avatar">
              <span>J</span>
              <div class="home-edit">
                <img
                  src="~/assets/playground_assets/pencilfill9110-tq7v.svg?url"
                  alt="pencilfill9110"
                  class="home-pencilfill"
                />
              </div>
            </div>
          </div>
          <h1 class="mt-6">Julian Perez</h1>
          <h4 class="mt-2">Admin</h4>
        </div>
        <div class="user-profile-navigation mt-10">
          <ul>
            <li class="ml-4 mr-4">
              <nuxt-link
                :class="{ active: route.name == 'settings-user-profile' }"
                :to="{ name: 'settings-user-profile' }"
              >
                <img
                  src="~/assets/playground_assets/user6line9110-6wb.svg?url"
                />
                <span>User Profile</span>
              </nuxt-link>
            </li>
            <li class="ml-4 mr-4">
              <nuxt-link
                :class="{ active: route.name == 'settings-settings' }"
                :to="{ name: 'settings-settings' }"
              >
                <img
                  src="~/assets/playground_assets/settingsline9110-rqfc.svg?url"
                />
                <span>Settings</span>
              </nuxt-link>
            </li>
            <li class="ml-4 mr-4">
              <a @click="logout()">
                <img
                  src="~/assets/playground_assets/logoutcirclerline9110-kb24.svg?url"
                />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class=" lg:col-span-9 md:col-span-7 col-span-full ">
        <h1 class="pb-4">User Profile</h1>
        <div class="bg-white mini-chart-card mt-2">
          <div class="md:pl-10 md:pr-10 pt-6 pb-6 pl-2 pr-2">
            <div class="user-profile-description-header flex sm:flex-row sm:justify-between flex-col">
              <h2 class="sm:mt-0 mt-4">Personal information</h2>
              <button class="btnEditProfile">Edit</button>
            </div>
            <div
              class="user-profile-description-settings grid  grid-cols-12 mt-2"
            >
              <div class="lg:col-span-6  col-span-full">
                <user-item-settings
                  :title="'Julian Perez'"
                  :subtitle="'Full name'"
                >
                  <template #iconLeft>
                    <img
                      src="~/assets/playground_assets/user6line9110-khwm.svg?url"
                      alt=""
                    />
                  </template>
                </user-item-settings>
                <user-item-settings
                  :title="'Administrator'"
                  :subtitle="'Role name'"
                >
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
              <div class="lg:col-span-6  col-span-full">
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
                <user-item-settings
                  :title="'**************'"
                  :subtitle="'Password'"
                >
                  <template #iconLeft>
                    <img
                      src="~/assets/playground_assets/lock2line9110-k8hm.svg?url"
                      alt=""
                    />
                  </template>
                  <template #iconRight>
                    <div
                      style="background-color: rgba(246, 248, 250, 1)"
                      class="p-3 mr-auto "
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute();
const router = useRouter();
console.log("route", route.name);

function logout() {
  const cookie = useCookie("token");
  cookie.value = null;
  router.push("/login");
}
</script>
