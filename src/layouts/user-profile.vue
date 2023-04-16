<template>
  <div class="relative overflow-auto p-4 layoutUserProfile">
    <div class="grid grid-rows-1 grid-flow-col gap-4 mt-6">
      <div class="p-4 sm:col-span-2 col-span-full bg-white mini-chart-card">
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
          <ul >
          <li class="ml-4 mr-4">
            <nuxt-link :class="{'active': route.name=='settings-user-profile'}"  :to="{name: 'settings-user-profile'}">
              <img src="~/assets/playground_assets/user6line9110-6wb.svg?url" >
              <span>User Profile</span>
            </nuxt-link>
          </li>
          <li class="ml-4 mr-4">
            <nuxt-link  :class="{'active': route.name=='settings-settings'}" :to="{name: 'settings-settings' }">
              <img src="~/assets/playground_assets/settingsline9110-rqfc.svg?url" >
              <span>Settings</span>
            </nuxt-link>
          </li>
          <li class="ml-4 mr-4">
            <a @click="logout()" >
              <img src="~/assets/playground_assets/logoutcirclerline9110-kb24.svg?url" >
              <span>Logout</span>
            </a>
          </li>
          
        </ul>
        </div>
       
      </div>
      <div class="p-4 sm:col-span-10 col-span-full">
        <h1>User Profile</h1>
        <div class="bg-white mini-chart-card mt-6">08</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter();
console.log("route", route.name)
onBeforeMount(() => {
  // Establecer el color de fondo del body
  document.body.style.backgroundColor = "#FCFCFC";
});

function logout(){
  const cookie = useCookie("token");
  cookie.value = null 
  router.push("/login")

}
</script>
