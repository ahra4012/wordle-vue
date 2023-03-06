import { defineStore } from "pinia";
import { ref } from "vue";
import { Keyboard } from "@/utils/initialize";

export const useWordStore = defineStore(
  "wordState",
  () => {
    const word = ref<string>("");
    const wordList = ref<Keyboard[]>([]);
    const winWordleCount = ref<number>(0);

    return {
      word,
      winWordleCount,
      wordList,
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: localStorage }],
    },
  }
);
