import { createWebHistory, createRouter } from "vue-router";
import { staticRouter, errorRouter } from "./modules/staticRouter";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // css까지 import 해주어야 한다.

const router = createRouter({
  history: createWebHistory(),
  routes: [...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

router.onError(() => {
  NProgress.done();
});
export default router;
