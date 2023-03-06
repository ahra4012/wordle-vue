import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
// vue Router
import router from "@/routers/index";

import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";

import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "element-plus/dist/index.css";

const pinia = createPinia();
pinia.use(piniaPersist);
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

import { worker } from "./mocks/browser";
if (import.meta.env.NODE_ENV === "test") {
  worker.start();
}

app.use(ElementPlus).use(pinia).use(router).use(vuetify).mount("#app");
