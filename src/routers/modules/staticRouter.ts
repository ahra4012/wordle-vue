import { RouteRecordRaw } from "vue-router";

const main = () => import("@/views/Main.vue");
const gameZone = () => import("@/views/Game/GameZone.vue");
const stopwatch = () => import("@/views/stopwatch.vue");

export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Main",
    component: main,
  },
  {
    path: "/GameZone",
    name: "GameZone",
    component: gameZone,
    props: true,
  },
  {
    path: "/stopwatch",
    name: "stopwatch",
    component: stopwatch,
  },
];

export const errorRouter = [];
