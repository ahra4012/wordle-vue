<template>
  <el-main>
    <el-row>
      <el-col :span="6">
        <el-statistic title="playTime" :value="stopWatchCnt">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              StopWatch
              <el-icon style="margin-left: 4px" :size="12">
                <Stopwatch />
              </el-icon>
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic :value="gameWinCnt">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              win Count
              <el-icon style="margin-left: 4px" :size="12">
                <GoldMedal />
              </el-icon>
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="Win %" :value="percent">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              Win %
              <el-icon style="margin-left: 4px" :size="12">
                <TrendCharts />
              </el-icon>
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="Try Count" :value="gameTryCnt">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              Try Count
              <el-icon style="margin-left: 4px" :size="12">
                <CirclePlusFilled />
              </el-icon>
            </div>
          </template>
        </el-statistic>
      </el-col>
    </el-row>
  </el-main>
  <el-footer v-if="isEnd">
    <v-btn @click="restart">New Game</v-btn>
  </el-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameOver",
  props: {
    gameTryCnt: {
      type: Number,
      required: true,
    },
    gameOverCnt: {
      type: Number,
      required: true,
    },
    gameWinCnt: {
      type: Number,
      required: true,
    },
    stopWatchCnt: {
      type: Number,
      required: true,
    },
    isEnd: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const percent =
      props.gameTryCnt === 0 ? 0 : (props.gameWinCnt / props.gameTryCnt) * 100;

    const restart = () => {
      emit("restart");
    };
    return {
      percent,

      restart,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/views/popup/GameStatPopup.scss";
</style>
