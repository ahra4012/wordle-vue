<template>
  <el-main>
    <v-btn @click="start" color="#0B2F3A" style="color: #ffffff">
      시작하기
    </v-btn>
    <v-btn @click="create" color="#0B0B61" style="color: #ffffff">
      워들 생성하기
    </v-btn>
  </el-main>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/api/apiManager";
import { useWordStore } from "@/store/wordStore";
import { storeToRefs } from "pinia";
import { Keyboard } from "@/utils/initialize";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // css까지 import 해주어야 한다.

export default defineComponent({
  name: "Main",

  setup() {
    const router = useRouter();
    const wordStore = useWordStore();
    let { word } = storeToRefs(wordStore);
    const wordInputList = ref(wordStore.wordList);
    const wordInput = ref<Keyboard>({
      key: "",
      color: "",
    });
    onBeforeMount(() => {
      if (wordStore.wordList === undefined || wordStore.wordList.length === 0) {
        resetWord();
      }
    });
    //시작하기
    const start = () => {
      word.value = "world";
      resetWord();
      router.push("GameZone");
    };
    //reset store
    const resetWord = () => {
      wordStore.wordList = Array.from({ length: 30 }, () => wordInput.value);
    };
    //워들 생성하기
    const create = async () => {
      NProgress.start();
      await api.dictionary.wordle.getRandomWord().then((res) => {
        word.value = res.result;
        console.log(res.result);
        resetWord();
        router.push("GameZone");
      });
    };
    return {
      wordInputList,
      start,
      create,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/common.scss";
</style>
