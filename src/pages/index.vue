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

    <div class="container max-w-8xl px-2 py-3 mx-auto" v-if="data.dataCargada">
      <div
        class="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-4"
      >
        <mini-chart-dash
          :title="convertAmount(data.MonthlySales.ordenes)"
          :subtitle="'Orders'"
          :porcentaje="data.MonthlySales.porcentajeOrdenes.toFixed(2)"
        >
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
        <mini-chart-dash
          :title="convertAmount(data.dailySales.value)"
          :subtitle="'Daily sales'"
          :porcentaje="data.dailySales.porcentaje.toFixed(2)"
        >
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
        <mini-chart-dash
          :title="convertAmount(data.MonthlySales.value)"
          :subtitle="'Monthly sales'"
          :porcentaje="data.MonthlySales.porcentaje"
        >
          <template #icon>
            <img
              src="~/assets/playground_assets/calendarline7475-5qdo.svg?url"
            />
          </template>
          <template #iconDash>
            <img src="~/assets/playground_assets/vector17475-uvw.svg?url" />
          </template>
        </mini-chart-dash>
        <mini-chart-dash
          :title="convertAmount(data.TotalSales.value)"
          :subtitle="'Total'"
          :porcentaje="data.TotalSales.porcentaje"
        >
          <template #icon>
            <img
              src="~/assets/playground_assets/arrowdownline7475-yuzs.svg?url"
            />
          </template>
          <template #iconDash>
            <img src="~/assets/playground_assets/vector17475-1e8.svg?url" />
          </template>
        </mini-chart-dash>
        <mini-chart-dash :title="'0'" :subtitle="'Withdraw'" :porcentaje="0">
          <template #icon>
            <img
              src="~/assets/playground_assets/usersharedline7476-sslo.svg?url"
            />
          </template>
          <template #iconDash>
            <img src="~/assets/playground_assets/vector17475-1e8.svg?url" />
          </template>
        </mini-chart-dash>
        <mini-chart-dash
          :title="convertAmount(data.TotalSales.value)"
          :subtitle="'Available'"
          :porcentaje="data.TotalSales.porcentaje"
        >
          <template #icon>
            <img
              src="~/assets/playground_assets/arrowdownline7475-yuzs.svg?url"
            />
          </template>
          <template #iconDash>
            <img src="~/assets/playground_assets/vector17475-1e8.svg?url" />
          </template>
        </mini-chart-dash>
      </div>
    </div>

    <table-dashboard
      v-if="data.dataCargada"
      :paymentsData="data.paymentsData"
      :dateRange="dateRange"
      :dateRangeActive="dateRangeActive"
      @next-page="nextPage"
      @previous-page="previousPage"
      @search-table="searchTable"
      @change-dateRange="changeDateRange"
    ></table-dashboard>
  </div>
</template>

<script setup lang="ts">
import { PaymentsDashboardPagination } from "~/interfaces/paymentsDashboard";
const route = useRoute();
useHead({
  title: "Lider | Home",
  meta: [{ name: "description", content: "Dashboard page." }],
});
const dateRange = ref();
const dateRangeActive = ref(false);
const data = reactive({
  dataCargada: false,
  paymentsData: {
    payments: [],
    count: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    nextPage: 0,
    previousPage: 0,
  },
  search: "",
  limit: 10,
  page: 1,
  dailySales: {
    porcentaje: 0,
    value: 0,
  },
  MonthlySales: {
    porcentaje: 0,
    value: 0,
    ordenes: 3,
    ordenesPrevious: 0,
    porcentajeOrdenes: 0,
  },
  TotalSales: {
    porcentaje: 0,
    value: 0,
  },
});

async function get_payments_dashboard() {
  let dateRangeJson = JSON.stringify(dateRange.value);
  console.log("dateRangeJson", dateRangeJson);
  const query = gql`
    query {
      paymentsByAdmin(page: ${data.page}, limit: ${data.limit}, search: "${data.search}", user_id: "${payloadToken.id}") {
        payments {
          invoice
          amount
          currency
          fee
          fee_extra
          net_amount
          amount_conversion
          receipt_url
          created
          processor {
            name
            identy
            image
          }
          assigned_user {
            _id
            fullName
            email
          }
        }
        count
        totalPages
        hasNextPage
        hasPreviousPage
        nextPage
        previousPage
      }
      dailySales(id:"${payloadToken.id}"){
      value
      porcentaje
      }
      MonthlySales(id:"${payloadToken.id}"){
      value
      porcentaje
      ordenes
      ordenesPrevious
      porcentajeOrdenes
      }
      TotalSales(id:"${payloadToken.id}", date: ${dateRangeJson}, rangeActive: ${dateRangeActive.value}){
      value
      porcentaje
      }
    }
  `;
  try {
    const response = await useAsyncQuery(query);
    console.log("respise", response);
    //@ts-ignore
    data.paymentsData = response.data.value.paymentsByAdmin;
    //@ts-ignore
    data.dailySales = response.data.value.dailySales;
    //@ts-ignore
    data.MonthlySales = response.data.value.MonthlySales;
    //@ts-ignore
    data.TotalSales = response.data.value.TotalSales;
    data.dataCargada = true;
  } catch (e) {
    console.log("error", e);
  }
}

function convertAmount(amount: number) {
  console.log("amount", amount);
  return amount.toFixed(2).toString();
}

async function searchTable(search: string) {
  data.search = search;
  await get_payments_dashboard();
}

async function nextPage(page: number) {
  data.page = page;
  await get_payments_dashboard();
}

async function previousPage(page: number) {
  data.page = page;
  await get_payments_dashboard();
}

async function changeDateRange(dateRang: Date[], dateRangeAct: boolean) {
  console.log("dateRange", dateRang);
  console.log("dateRangeActive", dateRangeAct);
  dateRange.value = dateRang;
  dateRangeActive.value = dateRangeAct;
  await get_payments_dashboard()
}

onMounted(() => {
  const startDate = new Date(new Date().getFullYear(), 0, 1); // 1 de enero del año actual

  const endDate = new Date(); // fecha actual
  dateRange.value = [startDate, endDate];
  console.log("dateRange", dateRange.value);
  nextTick(async () => {
    await get_payments_dashboard();
  });
});
</script>
