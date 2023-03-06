<template>
  <v-btn> Button </v-btn>
  <v-btn> Button </v-btn>
  <div>
    <v-btn value="recent">
      <v-icon>mdi-history</v-icon>

      Recent
    </v-btn>

    <v-btn value="favorites">
      <v-icon>mdi-heart</v-icon>

      Favorites
    </v-btn>

    <v-btn value="nearby">
      <v-icon>mdi-map-marker</v-icon>

      Nearby
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "HelloWorld",

  setup() {
    return {};
  },
});
</script>
