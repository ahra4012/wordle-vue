<template v-if="wordInputList">
  <el-header class="icon">
    <v-btn @click="mainOpen"> 메인으로 </v-btn>
    <v-btn @click="openPopup">
      <el-icon :size="30"><Histogram /> </el-icon>
    </v-btn>
  </el-header>
  <el-main>
    <div class="gameZone">
      <v-btn
        v-for="(item, index) in wordInputList"
        :key="index"
        :value="item.key"
        :color="item.color"
        >{{ item.key }}
      </v-btn>
    </div>
  </el-main>
  <KeyboardView :keyboardList="keyboardList" @keyboardClick="handleKey" />
  <!-- <GameOver :title="통계" @hide-modal="hidePopup" v-if="gameEnd">
    <p>Vue.js Modal Window!</p>
    <div><input v-model="message" /></div>
  </GameOver> -->
  <transition-group name="slide-up" appear>
    <PopupCommon
      v-if="gameStatisticsPopup"
      popup-title="통계"
      @click="hidePopup"
    >
      <GameStatPopup
        @close="hidePopup"
        @restart="GameReStart"
        :gameOverCnt="gameOverCnt"
        :gameTryCnt="gameTryCnt"
        :gameWinCnt="gameWinCnt"
        :stopWatchCnt="stopWatchCnt"
        :isEnd="isEnd"
      >
      </GameStatPopup>
    </PopupCommon>
  </transition-group>
</template>
<script lang="ts">
//component
import KeyboardView from "@/views/Keyboard/index.vue";
import GameStatPopup from "@/views/popup/GameStatPopup.vue";
import PopupCommon from "@/components/PopupCommon.vue";
//util
import { defineComponent, onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";
import { useWordStore } from "@/store/wordStore";
import { initializeKeyboard } from "@/utils/initialize";
import { Keyboard } from "@/utils/initialize";
import { api } from "@/api/apiManager";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "GameZone",
  components: {
    KeyboardView,
    GameStatPopup,
    PopupCommon,
  },
  setup() {
    let stopWatchCnt = ref(0);
    const startTimeObj = ref();

    const wordStore = useWordStore();
    const router = useRouter();

    const wordInputList = ref(wordStore.wordList); // A배열(readme참고)
    const keyboardList = ref(initializeKeyboard()); //keyboard의 key를 나열하는 배열
    const { word } = storeToRefs(wordStore); //correct 단어
    const isEnd = ref(false); //게임 마감 여부

    const noteEvalution = new Array(5); //SAME, EMPTY, NEAR 플래그 저장
    const gameOverCnt = ref(0); //게임이 성공하여 끝난 카운트
    const gameTryCnt = ref(0); //게임시도횟수
    const gameWinCnt = ref(0); //게임 이긴 횟수
    const gamePlayTime = ref("");
    const row = ref(0);
    const gameStatisticsPopup = ref<boolean>(false);
    const words = ref<string>("");
    const wordInput = ref<Keyboard>({
      key: "",
      color: "",
    });

    onBeforeMount(() => {
      startTime();
      if (wordStore.word === undefined || wordStore.word.length < 1) {
        router.push("/");
      }
      const index = wordInputList.value.findIndex((value) => value.key === "");
      row.value = index / 5;
      console.log("word", wordStore.word);
      wordInputList.value.forEach((value) => {
        if (value.color === null || value.color === "") {
          value.key = "";
        }
      });
    });
    const startTime = () => {
      startTimeObj.value = setTimeout(() => {
        stopWatchCnt.value++;
        startTime();
      }, 1000);
    };

    const stopTime = () => {
      clearTimeout(startTimeObj.value);
    };

    const mainOpen = () => {
      router.push("/");
    };
    const openPopup = () => {
      if (isEnd.value) {
        //게임이 끝났다면
        // stopwatch.pause();
        stopTime();
      }
      gameStatisticsPopup.value = true;
    };
    const hidePopup = () => {
      gameStatisticsPopup.value = !gameStatisticsPopup.value;
    };
    const handleKey = (key: string) => {
      if (isEnd.value) return;
      if (key === "DELETE") return DeleteWordle();
      if (key === "ENTER") return EnterWordle();

      words.value += key;
      //빈 워들 찾기
      const index = wordInputList.value.findIndex((value) => value.key === "");

      const isCurrentRow = Math.floor(index / 5) === row.value;

      if (!isCurrentRow) return;
      const currentKey: Keyboard = {
        key: key,
        color: "",
      };
      wordInputList.value[index] = currentKey;
    };

    //현재 row의 word를 하나씩 지우기
    const DeleteWordle = () => {
      const index = wordInputList.value.findIndex((value) => value.key === "");
      //if (index === -1) return (wordInputList.value[wordInputList.value.length - 1] = '');
      const isCurrentRow = Math.floor((index - 1) / 5) === row.value;

      if (!isCurrentRow) return;
      const lastIndex =
        wordInputList.value.filter((value) => value.key !== "").length - 1;

      const currentKey: Keyboard = {
        key: "",
        color: "",
      };
      wordInputList.value[lastIndex] = currentKey;
    };
    //현재 row의 word가 정답인지 확인
    const EnterWordle = () => {
      //마지막
      let index = wordInputList.value.findIndex((value) => value.key === "");
      index = index === -1 ? 30 : index;
      const currentRow = Math.floor((index - 1) / 5);
      const isCurrentRow = currentRow === row.value;
      const rowComplete = index % 5 === 0;
      if (isCurrentRow && rowComplete) {
        let fullword = "";
        let word = "";
        const indexes = currentRow * 5;
        for (let i = indexes; i < indexes + 5; i++) {
          word += wordInputList.value[i].key;
        }
        for (let i = 0; i < indexes + 5; i++) {
          fullword += wordInputList.value[i].key;
        }
        CheckCorrectWord(word, fullword);
      } else {
        ElMessage.info("5글자 단어를 채워주세요.");
      }
    };
    //정답단어를 찾습니다.
    const FindCorrectWord = async (word: string) => {
      word = word.toLocaleLowerCase();

      if (wordStore.word) {
        //if (wordStore.word.includes(word)) {
        //입력한 단어가 정답에 포함되어 있다면
        row.value++; //row를 1올려 2행 부터 count되도록 수정
        gameOverCnt.value = 0; //성공카운트
        const correctArr = [...wordStore.word];
        const inputArr = [...word];
        let wordArr = new Array(30);

        for (let i = 0; i < 30; i++) {
          const current = Math.floor(i / 5);
          wordArr[i] = correctArr[i];
          if (i >= 5) {
            let five = current * 5;
            wordArr[i] = correctArr[i - five];
          }
        }
        //일치하면 초록색
        //포함하면 노란색
        //해당되지 않으면 회색
        inputArr.forEach((letter, index) => {
          if (letter === wordArr[index].toLocaleLowerCase()) {
            wordInputList.value[index].color = "#4B8A08";
            noteEvalution[index] = "SAME";
          } else {
            wordInputList.value[index].color = "#6E6E6E";
            noteEvalution[index] = "EMPTY";
          }
        });

        inputArr.forEach((letter, index) => {
          if (
            wordArr.filter((x) => letter.includes(x)).length > 0 &&
            noteEvalution[index] != "SAME"
          ) {
            wordInputList.value[index].color = "#DBA901";
            noteEvalution[index] = "NEAR";
          }
        });

        let index = wordInputList.value.findIndex((value) => value.key === "");
        const currentRow = Math.floor((index - 1) / 5);
        const indexes = currentRow * 5;
        for (let i = indexes; i < indexes + 5; i++) {
          if (noteEvalution[i] === "SAME") {
            gameOverCnt.value++;
          }
        }
        if (wordInputList.value.every((x) => x.key != "")) {
          GameOverOpen();
        }
        if (gameOverCnt.value === 5) {
          GameEndOpen();
        }
        //Store update하기.
        wordStore.wordList = wordInputList.value;
        //} else {
        //  console.log("not in word");
        //}
      }
    };
    //입력한 단어가 맞는지 API로 단어 찾기
    const CheckCorrectWord = async (word: string, fullWord: string) => {
      await api.dictionary.wordle
        .getDicWord(word.toLocaleLowerCase())
        .then(() => {
          gameTryCnt.value++;
          FindCorrectWord(fullWord);
        })
        .catch(() => {
          ElMessage.error("단어를 찾을 수 없습니다");
        });
    };
    //게임 패배 후 popup open
    const GameOverOpen = () => {
      ElMessageBox.alert(wordStore.word.toString(), "결과", {
        callback: () => {
          stopTime();
          isEnd.value = true;
          gameStatisticsPopup.value = true;
        },
      });
    };
    //게임 승리 후 popup open
    const GameEndOpen = () => {
      ElMessageBox.alert("워들게임에 승리하셨습니다.", "결과", {
        callback: () => {
          stopTime();
          gameStatisticsPopup.value = true;
          gameWinCnt.value++;
          isEnd.value = true;
        },
      });
    };
    //재경기 시작
    const GameReStart = async () => {
      await api.dictionary.wordle.getRandomWord().then((res) => {
        word.value = res.result;
        wordStore.wordList = Array.from({ length: 30 }, () => wordInput.value);
        wordInputList.value = Array.from({ length: 30 }, () => wordInput.value);
        isEnd.value = false;
      });
    };
    return {
      isEnd,
      gamePlayTime,
      stopWatchCnt,
      gameStatisticsPopup,
      gameWinCnt,
      gameTryCnt,
      wordInputList,
      keyboardList,
      handleKey,
      openPopup,
      hidePopup,
      mainOpen,
      GameReStart,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/views/Game/GameZone.scss";
</style>
