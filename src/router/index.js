import { createRouter, createWebHashHistory } from "vue-router";

import PostsList from "../views/PostsList";
import PostDetails from "../views/PostDetails";
import NotFound from "../views/404";
import Login from "../views/auth/Login";
import Signup from "../views/auth/Signup";
import AddPost from "../views/user/AddPost";
import Profile from "../views/user/Profile"
import UserProfile from "../views/user/UserProfile"

const routes = [
  { path: "/", component: PostsList },
  { path: "/category/:category", component: PostsList },
  { path: "/post/:postId", props: true, component: PostDetails },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path:"/profile", component:Profile},
  { path: "/add-post", component: AddPost },
  {path:"/user/:userId", props:true, component:UserProfile},

  { path: "/:notFound(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  mode:'history',
  hash:false,
  routes,
});

export default router;
