import { createRouter, createWebHashHistory } from "vue-router";

import PostsList from "../views/PostsList";
import PostDetails from "../views/PostDetails";
import NotFound from "../views/404"
import Login from '../views/auth/Login'
import Signup from '../views/auth/Signup'

const routes = [
  { path: "/", component: PostsList },
  { path: "/category/:category", component: PostsList },
  { path: "/post/:postId", props: true, component: PostDetails },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: '/:notFound(.*)', component: NotFound }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
