import Vue from "vue";
import VueRouter from "vue-router";
//
import ISP_dashboard from "../components/ISP/dashboard";
import ISP_home from "../components/ISP/home";
import ISP_notifications from "../components/ISP/notifications";
import ISP_packages from "../components/ISP/packages";
import ISP_payments from "../components/ISP/payments";
//
import login from "../components/login";
//
import NTTN_dashboard from "../components/NTTN/dashboard";
import NTTN_home from "../components/NTTN/home";
import NTTN_notifications from "../components/NTTN/notifications";
import NTTN_packages from "../components/NTTN/packages";
import NTTN_payments from "../components/NTTN/payments";
//
import store from '../store/index';




Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    meta: {
			requireLoggedIn: false
		},
    component: login,
  },
  {
    path: "/login",
    meta: {
			requireLoggedIn: false
		},
    component: login,
  },
  //
  {
    path: "/ISP/home",
    meta: {
			requireLoggedIn: true
		},
    component: ISP_home,
  },
  {
    path: "/ISP/packages",
    meta: {
			requireLoggedIn: true
		},
    component: ISP_packages,
  },
  {
    path: "/ISP/payments",
    meta: {
			requireLoggedIn: true
		},
    component: ISP_payments,
  },
  {
    path: "/ISP/notifications",
    meta: {
			requireLoggedIn: true
		},
    component: ISP_notifications,
  },
  {
    path: "/ISP/dashboard",
    meta: {
			requireLoggedIn: true
		},
    component: ISP_dashboard,
  },
  //
  {
    path: "/NTTN/home",
    meta: {
			requireLoggedIn: true
		},
    component: NTTN_home,
  },
  {
    path: "/NTTN/packages",
    meta: {
			requireLoggedIn: true
		},
    component: NTTN_packages,
  },
  {
    path: "/NTTN/payments",
    meta: {
			requireLoggedIn: true
		},
    component: NTTN_payments,
  },
  {
    path: "/NTTN/notifications",
    meta: {
			requireLoggedIn: true
		},
    component: NTTN_notifications,
  },
  {
    path: "/NTTN/dashboard",
    meta: {
			requireLoggedIn: true
		},
    component: NTTN_dashboard,
  },
  //
  {
    path: "/NTTN/*",
    meta: {
			requireLoggedIn: true
		},
    component: () => import("../components/NTTN/notFound"),
  },
  {
    path: "/ISP/*",
    meta: {
			requireLoggedIn: true
		},
    component: () => import("../components/ISP/notFound"),
  },
  {
    path: "/USER/*",
    meta: {
			requireLoggedIn: true
		},
    component: () => import("../components/USER/notFound"),
  },
  {
    path: "*",
    meta: {
			requireLoggedIn: true
		},
    component: () => import("../components/notFound"),
  }
];

const router = new VueRouter({
  routes: routes,
  mode: 'history',
  history: 'enable',
  scrollBehavior() {
    return {x: 0, y: 0}
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireLoggedIn && !store.getters.isLoggedIn) {
    next({
      path: '/'
    });
  } else {
    next();
  }
})


export default router;
