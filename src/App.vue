<template>
  <router-view> </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { worker } from "@/mocks/browser";
console.log(import.meta.env.MODE);
if (import.meta.env.MODE === "test") {
  worker.start();
}
export default defineComponent({
  name: "App",
  setup() {
    return {};
  },
});
</script>
<style lang="scss"></style>
