<template>
  <div>
    <h1>vue-timer-hook</h1>
    <p>Stopwatch Demo</p>
    <div>
      <span>{{ stopwatch.days }}</span
      >:<span>{{ stopwatch.hours }}</span
      >:<span>{{ stopwatch.minutes }}</span
      >:<span>{{ stopwatch.seconds }}</span>
    </div>
    <p>{{ stopwatch.isRunning ? "Running" : "Not running" }}</p>
    <button @click="stopwatch.start()">Start</button>
    <button @click="stopwatch.pause()">Pause</button>
    <button @click="stopwatch.reset()">Reset</button>
  </div>
</template>

<script setup lang="ts">
import { useStopwatch } from "vue-timer-hook";

const autoStart = true;
const stopwatch = useStopwatch(autoStart);
</script>
