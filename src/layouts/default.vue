<template>
    
 <div>
        <!-- header  -->
        <header-default></header-default>

        <!-- content  -->
        <main>
            <slot />
        </main>
    </div>
</template>

<script setup>
import HeaderDefault from '../components/layoutDefault/HeaderDefault.vue';


</script>
