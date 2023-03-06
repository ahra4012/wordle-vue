import NProgress from "nprogress";
import "nprogress.css";

NProgress.configure({
  esing: "ease",
  speed: 500,
  showSpinner: true,
  trickleSpeed: 200,
  minimum: 0.3,
});

export default NProgress;
