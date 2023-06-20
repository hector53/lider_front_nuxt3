<template>
  <div>
    <div v-if="props.wallet.type == 1" class="flex justify-center items-center">
      <img :src="urlApi + '/uploads/icons/bank.png'" alt="" class="mr-2 w-5" />
      <span>Bank transfer</span>
    </div>
    <div v-if="props.wallet.type == 2" class="">
      <div class="flex justify-center items-center">
        <img
          :src="urlApi + '/uploads/icons/' + props.wallet.typeEwallet + '.png'"
          alt=""
          class="mr-2 w-5"
        />
        <span style="text-transform: uppercase">{{
          props.wallet.typeEwallet
        }}</span>
      </div>
    </div>

    <div v-if="props.wallet.type == 3" class="">
      <div class="flex justify-center items-center">
        <img
          :src="
            urlApi +
            '/uploads/icons/' +
            props.wallet.detailsCrypto.currency +
            '.png'
          "
          alt=""
          class="mr-2 w-5"
        />
        <span style="text-transform: uppercase">{{
          props.wallet.detailsCrypto.currency
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Wallet } from "~/interfaces/wallet";

const props = defineProps({
  wallet: {
    type: Object as () => Wallet,
    default: {},
  },
});
</script>

<style scoped></style>
