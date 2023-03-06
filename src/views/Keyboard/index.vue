<template>
  <section>
    <div class="keys">
      <v-btn
        v-for="value in keyRow1"
        :key="value"
        :value="value"
        @click="clickKey(value.key)"
        >{{ value.key }}</v-btn
      >
    </div>
    <div class="keys">
      <v-btn
        v-for="value in keyRow2"
        :key="value"
        :value="value"
        @click="clickKey(value.key)"
        >{{ value.key }}</v-btn
      >
    </div>
    <div class="keys">
      <v-btn
        v-for="value in keyRow3"
        :key="value"
        :value="value"
        @click="clickKey(value.key)"
        >{{ value.key }}</v-btn
      >
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from "vue";
import { Keyboard } from "@/utils/initialize";
export default defineComponent({
  name: "Keyboard",
  props: {
    keyboardList: {
      type: Array as PropType<Keyboard[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const keyRow1 = ref(props.keyboardList.slice(0, 10));
    const keyRow2 = ref(props.keyboardList.slice(10, 19));
    const keyRow3 = ref(props.keyboardList.slice(19, 29));

    const clickKey = (key: string) => {
      emit("keyboardClick", key);
    };
    watch(
      () => [...props.keyboardList],
      () => {
        keyRow1.value = props.keyboardList.slice(0, 10);
        keyRow2.value = props.keyboardList.slice(10, 19);
        keyRow3.value = props.keyboardList.slice(19, 29);
      }
    );

    return {
      keyRow1,
      keyRow2,
      keyRow3,
      clickKey,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
