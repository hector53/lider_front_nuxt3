<template>
  <div
    class="tableDashboard container max-w-8xl py-3 mt-7 mx-auto flex flex-col"
  >
    <div class="optionsTable flex justify-between">
      <div class="flex">
        <button class="btnContentHeader1 mr-5">
          <img src="~/assets/playground_assets/calendarline4865-l7i.svg?url" />
          <span> Date range </span>
        </button>
        <button class="btnContentHeader1 mr-5">
          <img src="~/assets/playground_assets/flagline4865-rck.svg?url" />
          <span> Status </span>
        </button>
      </div>

      <div class="input-search-tables">
        <img src="~/assets/playground_assets/search2line4865-uffr.svg?url" />
        <input
          type="search"
          class="search-input"
          placeholder="Search by email or name"
        />
      </div>
    </div>

    <div class="relative overflow-x-auto mt-10">
      <table class="w-full text-sm text-left">
        <thead class="uppercase">
          <tr>
            <th scope="col" class="px-6 py-3 text-lef">Creation date</th>
            <th scope="col" class="px-6 py-3 text-center">Status</th>
            <th scope="col" class="px-6 py-3 text-center">Site</th>
            <th scope="col" class="px-6 py-3 text-center">Webhooks</th>
            <th scope="col" class="px-6 py-3 text-center">Processor</th>
            <th scope="col" class="px-6 py-3 text-center"></th>
     
          </tr>
        </thead>
        <tbody>
          <tr
            class="hover:bg-gray-50"
            v-for="(row, index) in rows"
            :key="index"
          >
            <td class="px-6 py-4 capitalize">{{ row.date }}</td>
            <td class="px-6 py-4 capitalize">
              <span v-if="row.status"
                class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                <span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                Active
              </span>

              <span v-else class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                <span class="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                Disable
            </span>
            </td>
            <td class="px-6 py-4 ">{{ row.site }}</td>
            <td class="px-6 py-4 ">{{ row.webhooks }}</td>
            <td class="px-6 py-4 ">
                <div class="flex flex-wrap">
                    <div class="flex items-center mr-4" v-for="(icon, index2) in row.processors" :key="index2">
                        <icon-processor :processor="icon"></icon-processor>
                        <span class="capitalize">{{icon}}</span>
                </div>
                </div>
            </td>
           
            <td class="px-6 py-4 ">
                
                <div class="flex justify-center items-center">
                    <toggle-check class="mr-5"></toggle-check>
                  <button class="btnContentHeader1 mr-5" >
                    <img
                      src="~/assets/playground_assets/pencilfill9110-b58h.svg?url"
                    />
                    <span> Edit </span>
                  </button>
                  <button
                    class="btnContentHeader1 mr-5"
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
        <span>20 Results</span>
        <div class="flex">
          <button class="btnContentHeader1 mr-5">
            <img
              src="~/assets/playground_assets/arrowleftline4884-80z7.svg?url"
            />
            <span> Previous </span>
          </button>
          <button class="btnContentHeader1 mr-5">
            <img
              src="~/assets/playground_assets/arrowrightline4884-9q.svg?url"
            />
            <span> Next </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const rows = [
  {
    date: "Jan 17, 2:43 PM",
    status: true,
    site: "https://prueba.com",
    webhooks: "https://webhook.site/asdausadaosdiasd",
    processors: ["stripe", "paypal", "coinbase"],
  },
  {
    date: "Jan 18, 2:43 PM",
    status: false,
    site: "https://prueba2.com",
    webhooks: "https://webhook.site/asdausadaosdiasd",
    processors: ["stripe", "paypal"],
  },
  {
    date: "Jan 18, 5:43 PM",
    status: false,
    site: "https://prueba3.com",
    webhooks: "https://webhook.site/asdausadaosdiasd",
    processors: ["stripe"],
  },
];
</script>
