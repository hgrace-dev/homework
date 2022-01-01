import { createRouter, createWebHistory } from "vue-router";
import Applications from "../views/Applications";
import Speech from "../components/Speech";
import Text from "../components/Text";
import GuessWord from "../components/GuessWord";

const routes = [
  {
    path: "/",
    name: "Applications",
    component: Applications,
  },
  {
    path: "/app/speech",
    component: Speech,
  },
  {
    path: "/app/text",
    component: Text,
  },
  {
    path: "/app/guessword",
    component: GuessWord,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
