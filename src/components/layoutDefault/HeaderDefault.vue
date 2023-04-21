<template>
  <div class="home-toolbar">
    <div
      class="home-toolbar container max-w-8xl mx-auto px-2 py-4 flex justify-between items-center"
    >
      <nuxt-link to="/" class="home_title_company">
        <img src="~/assets/images/icon.png?url" alt="" />
        <span>Company</span>
      </nuxt-link>
      <div class="home-left-group">
        <div class="home-account-switcher-cactus-practice">
          <div
            class="home-frame-account-switcher"
            @click.stop="toggleDropDownAccount"
          >
            <div class="home-accounticon">
              <img
                src="~/assets/images/account_icon.svg?url"
                class="home-backgroundellipse"
              />
            </div>
            <span class="home-text123"><span>Cactus Practice</span></span>
            <img
              src="~/assets/playground_assets/iconchevrondowni486-zow.svg?url"
              alt="IconchevronDownI486"
              class="home-iconchevron-down"
            />
          </div>
        </div>

        <drop-down-account
          :show="dropDownAccountShow"
          @close-dropdown="closeDropDown"
        ></drop-down-account>
      </div>
    </div>
  </div>
  <div class="home-toolbar2">
    <div class="container max-w-8xl px-2 py-3 mx-auto">
      <ul class="flex justify-start items-center">
        <li>
          <nuxt-link class="text_header_toolbar2" activeClass="active" to="/"
            >Dashboard</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            class="text_header_toolbar2"
            activeClass="active"
            to="/withdraws"
            >Withdraws</nuxt-link
          >
        </li>

        <li>
          <nuxt-link
            class="text_header_toolbar2"
            activeClass="active"
            to="/settings"
            >Settings</nuxt-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const dropDownAccountShow = ref(false);
const outsideContador = ref(0);
const divDropdown = ref(null);
function toggleDropDownAccount(event) {
  event.stopPropagation();
  console.log("toggle", divDropdown.value);
  dropDownAccountShow.value = !dropDownAccountShow.value;
  if (dropDownAccountShow.value) {
    window.addEventListener("click", closeDropDown);
  } else {
    window.removeEventListener("click", closeDropDown);
  }
}
function closeDropDown(event) {

  console.log("afuera", event.target)
  if (!divDropdown.value.contains(event.target)) {
    dropDownAccountShow.value = false;
    window.removeEventListener("click", closeDropDown);
  }
}

function openDropdown(event) {
  
  dropDownAccountShow.value = true;
  window.addEventListener("click", closeDropDown);
}
onMounted(() => {
  divDropdown.value = document.querySelector('#dropdownAccount')
    })
</script>
