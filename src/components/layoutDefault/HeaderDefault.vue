<template>
  <div  class="home-toolbar">
    <div class="home-toolbar container max-w-8xl mx-auto  px-2 py-4 flex justify-between items-center">
        
      <nuxt-link to="/" class="home_title_company"
        >
        <img src="~/assets/images/icon.png" alt="">
        <span>Company</span>
        </nuxt-link
      >
      <div class="home-left-group">
              <div class="home-account-switcher-cactus-practice">
                <div class="home-frame-account-switcher">
                  <div class="home-accounticon">
                    <img src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/73b4dad9-a6a1-4491-9b5b-07abbaa22033/04ce7e1c-ab69-4a33-8a45-f5be58ab20e2?org_if_sml=11492" alt="BackgroundellipseI486" class="home-backgroundellipse">
                    <img src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/73b4dad9-a6a1-4491-9b5b-07abbaa22033/98aeaa3c-4090-41b5-bb11-ee962bfd25b1?org_if_sml=1123" alt="maskI486" class="home-mask">
                  </div>
                  <span class="home-text123"><span>Cactus Practice</span></span>
                  <img src="~/assets/playground_assets/iconchevrondowni486-zow.svg" alt="IconchevronDownI486" class="home-iconchevron-down">
                </div>
              </div>
            </div>
    </div>
  </div>
  <div class="home-toolbar2">

  <div class=" container max-w-8xl  px-2 py-3 mx-auto ">
    <ul class="flex justify-start items-center">
      <li>
        <nuxt-link class="text_header_toolbar2" activeClass="active" to="/">Dashboard</nuxt-link>
      </li>
      <li>
        <nuxt-link class="text_header_toolbar2" activeClass="active" to="/withdraws">Withdraws</nuxt-link>
      </li>
      <li>
        <nuxt-link class="text_header_toolbar2" activeClass="active" to="/cards">Cards</nuxt-link>
      </li>
      
    </ul>
  </div>
  </div>

</template>

<script setup></script>
