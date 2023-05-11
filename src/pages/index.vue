<template>
  <div>
    <BlockContentHeader>
      <template #title> Dashboard</template>
      <template #options>
        <button class="btnContentHeader1 mr-5">
          <img src="~/assets/playground_assets/printerfill4860-fxck.svg?url" />
          <span> Print </span>
        </button>
        <button class="btnContentHeader1">
          <img src="~/assets/playground_assets/downloadfill4860-dq2w.svg?url" />
          <span> Download Report </span>
        </button>
      </template>
    </BlockContentHeader>

    <div class="container max-w-8xl px-2 py-3 mx-auto">
      <div
        class="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-4"
      >
        <mini-chart-dash :title="'49'" :subtitle="'Orders'" :porcentaje="14">
          <template #icon>
            <img
              src="~/assets/playground_assets/arrowdownline7475-yuzs.svg?url"
              alt="arrowdownline7475"
              class="home-arrowdownline4"
            />
          </template>
          <template #iconDash>
            <img
              src="~/assets/playground_assets/vector17474-elxa.svg?url"
              alt="Vector17474"
              class="home-vector1"
            />
          </template>
        </mini-chart-dash>
        <mini-chart-dash :title="'10.00'" :subtitle="'Daily sales'" :porcentaje="16">
          <template #icon>
            <img
              src="~/assets/playground_assets/moneydollarcircleline7475-e4n.svg?url"
              alt="arrowdownline7475"
              class="home-arrowdownline4"
            />
          </template>
          <template #iconDash>
            <img
              src="~/assets/playground_assets/vector17475-vnif.svg?url"
              alt="Vector17474"
              class="home-vector1"
            />
          </template>
        </mini-chart-dash>
        <mini-chart-dash :title="'4,900'" :subtitle="'Monthly sales'" :porcentaje="-4">
          <template #icon>
            <img
              src="~/assets/playground_assets/calendarline7475-5qdo.svg?url"
            />
          </template>
          <template #iconDash>
            <img
              src="~/assets/playground_assets/vector17475-uvw.svg?url"
            />
          </template>
        </mini-chart-dash>
        <mini-chart-dash :title="'453K'" :subtitle="'Total'" :porcentaje="14">
          <template #icon>
            <img
              src="~/assets/playground_assets/arrowdownline7475-yuzs.svg?url"
            />
          </template>
          <template #iconDash>
            <img
              src="~/assets/playground_assets/vector17475-1e8.svg?url"
            />
          </template>
        </mini-chart-dash>
        <mini-chart-dash :title="'239'" :subtitle="'Withdraw'" :porcentaje="10">
          <template #icon>
            <img
              src="~/assets/playground_assets/usersharedline7476-sslo.svg?url"
            />
          </template>
          <template #iconDash>
            <img
              src="~/assets/playground_assets/vector17475-1e8.svg?url"
            />
          </template>
        </mini-chart-dash>
        <mini-chart-dash :title="'539'" :subtitle="'Available'" :porcentaje="18">
          <template #icon>
            <img
              src="~/assets/playground_assets/arrowdownline7475-yuzs.svg?url"
            />
          </template>
          <template #iconDash>
            <img
              src="~/assets/playground_assets/vector17475-1e8.svg?url"
            />
          </template>
        </mini-chart-dash>
      </div>
    </div>

    <table-dashboard></table-dashboard>
  </div>
</template>

<script setup>
const route = useRoute();
useHead({
  title: 'Lider | Home',
  meta: [
    { name: 'description', content: 'Dashboard page.' }
  ],
})
console.log("route",route)
</script>

<style lang="scss" scoped></style>
