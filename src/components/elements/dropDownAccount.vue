<template>
  <div
    class="home-dropdown-menu"
    id="dropdownAccount"
    :class="{ 'fade-out': !show, 'fade-in': show }"
    v-show="show"
  >
    <div class="home-heading">
      <img
        src="~/assets/images/account_icon.svg?url"
        class="home-accounticon"
      />
      <div class="home-body">
        <span class="home-text SMRegular"><span>Signed in as</span></span>
        <span class="home-text02 SMMedium">
          <span>james@site.com</span>
        </span>
      </div>
    </div>
    <div class="home-list1">
      <div class="home-framedropdownheading">
        <span class="home-text04 XSMedium"><span>General</span></span>
      </div>
      <div class="home-framedropdownitem">
        <img
          src="~/assets/playground_assets/user6line1996-ny2l.svg?url"
          alt="user6line1996"
          class="home-user6line"
        />

        <nuxt-link class="home-content" activeClass="active" to="/settings"
          ><span class="home-text06 SMMedium">Profile</span></nuxt-link
        >
      </div>
      <div class="home-framedropdownitem">
        <img
          src="~/assets/playground_assets/arrowupdownline1996-p6dl.svg?url"
          alt="arrowupdownline1996"
          class="home-arrowupdownline"
        />
        <nuxt-link class="home-content" activeClass="active" to="/withdraws"
          ><span class="home-text06 SMMedium">Withdraws</span></nuxt-link
        >
      </div>
      <div class="home-framedropdownitem">
        <img
          src="~/assets/playground_assets/settingsline1996-zc2.svg?url"
          alt="settingsline1996"
          class="home-settingsline"
        />
        <nuxt-link class="home-content" activeClass="active" to="/settings/settings"
          ><span class="home-text06 SMMedium">Settings</span></nuxt-link
        >
      </div>
    </div>
    <div class="home-list2">
      <div class="home-framedropdownitem">
        <span class="home-text12 XSMedium"><span>Soporte</span></span>
      </div>
      <div class="home-framedropdownitem">
        <img
          src="~/assets/playground_assets/questionline1996-6tvb.svg?url"
          alt="questionline1996"
          class="home-questionline"
        />
        <div class="home-content3">
          <span class="home-text14 SMMedium"><span>Ayuda</span></span>
        </div>
      </div>
      <div class="home-framedropdownitem" @click="logout">
        <img
          src="~/assets/playground_assets/logoutcirclerline1996-o91.svg?url"
          class="home-questionline"
        />
        <div class="home-content3" >
          <span class="home-text14 SMMedium" style="color: #cd3d64"
            ><span>Sign Out</span></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const emitters = defineEmits(["close-dropdown"]);

function logout() {
  const cookie = useCookie("token");
  cookie.value = null;
  router.push("/login");
}
</script>
