<template>
  <div
    :id="idModal"
    data-modal-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
    class="modalLider fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full  max-h-full" :class="props.sizeModal">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t">
          <h3 class="text-xl font-semibold text-gray-900">
            {{ title }}
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            @click="hideModal()"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <slot name="content">
          
          </slot>
        </div>
        <!-- Modal footer -->
        <div v-if="props.showBtns"
          class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b"
        >
         
          <button
            @click="hideModal()"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
          >
            Close
          </button>
          <button
          @click="submitForm()"
            type="button"
            class="text-white bg-[#665AEC] hover:bg-[#5d54c9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
          >
            {{props.btnSave}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emitters = defineEmits(["submit-form","hide-modal"]);
const props = defineProps({
  idModal: {
    type: String,
    default: "staticModal",
  },
  title: {
    type: String,
    default: "titulo",
  },
  btnSave:{
    type: String,
    default: "Save changes"
  }, 
  sizeModal: {
    type: String,
    default: 'max-w-lg'
  },
  showBtns: {
    type: Boolean,
    default: true
  }
});

function hideModal(){
  emitters("hide-modal");
}

function submitForm(){
  emitters("submit-form");
}
onMounted(() => {
});
</script>
