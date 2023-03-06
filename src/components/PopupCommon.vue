<template>
  <transition name="modal" appear>
    <div class="popup-wrap">
      <div class="popup-contents">
        <button class="btnClose" @click="btnClose">close</button>

        <div class="popup-title">
          {{ popupTitle }}
        </div>

        <slot />
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
export default {
  name: "PopupCommon",
  props: {
    popupTitle: String,
  },
  emits: ["hide-modal", "save-data", "btn-close"],
  setup(props, { emit }) {
    const btnClose = () => {
      emit("btn-close", "");
    };

    return {
      btnClose,
    };
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/common.scss";
</style>
