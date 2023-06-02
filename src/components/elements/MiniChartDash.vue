<template>
  <div class="mini-chart-card">
    <div class="mini-chart-card-content">
      <div class="flex justify-between py-1">
        <div class="icon-mini-chart">
          <slot name="icon">
            <img
              src="~/assets/playground_assets/arrowdownline7474-uods.svg?url"
              alt="arrowdownline7474"
              class="home-arrowdownline"
            />
          </slot>
        </div>
        <div>
          <slot name="iconDash">
            <img
              src="~/assets/playground_assets/vector17474-elxa.svg?url"
              alt="Vector17474"
              class="home-vector1"
            />
          </slot>
        </div>
      </div>

      <div class="flex justify-between mt-5">
        <div class="flex flex-col justify-end">
          <h1 class="text_title_minichart">{{ title }}</h1>
          <span class="text_title_subtitle">{{ subtitle }}</span>
        </div>
        <div class="flex items-end">
          <img
            v-if="porcentaje > 0"
            src="~/assets/playground_assets/arrowdownline7474-4k0f.svg?url"
          />
          <img
            v-else
            src="~/assets/playground_assets/arrowdownline7475-sxlb.svg?url"
          />

          <span class="text_color_up" v-if="porcentaje > 0"
            >+{{ porcentaje }}%</span
          >
          <span class="text_color_down" v-else>{{ porcentaje }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: [String, Object],
    default: "49",
  },
  subtitle: {
    type: String,
    default: "Orders",
  },
  porcentaje: {
    type: Number,
    default: 14,
  },
});
</script>
