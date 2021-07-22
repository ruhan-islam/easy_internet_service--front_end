import Vue from "vue";
import VueRouter from "vue-router";
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
    component: () => import("../components/login"),
  },
  {
    path: "/login",
    meta: {
			requireLoggedIn: false
		},
    component: () => import("../components/login"),
  },
  //
  {
    path: "/ISP/home",
    meta: {
			requireLoggedIn: true
		},
    component: () => import("../components/ISP/home"),
  },
  {
    path: "/ISP/packages",
    meta: {
			requireLoggedIn: true
		},
    component: () => import("../components/ISP/packages"),
  },
  {
    path: "/ISP/payments",
    meta: {
			requireLoggedIn: true
		},
    component: () => import("../components/ISP/payments"),
  },
  {
    path: "/ISP/notifications",
    meta: {
			requireLoggedIn: true
		},
    component: () => import("../components/ISP/notifications"),
  },
  {
    path: "/ISP/offers",
    meta: {
			requireLoggedIn: true
		},
    component: () => import("../components/ISP/offers"),
  },
  {
    path: "/ISP/notify",
    meta: {
			requireLoggedIn: true
		},
    component: () => import("../components/ISP/notify"),
  },
  {
    path: "/ISP/tickets",
    meta: {
			requireLoggedIn: true
		},
    component: () => import("../components/ISP/tickets"),
  },
  {
    path: "/ISP/dashboard",
    meta: {
			requireLoggedIn: true
		},
    component: () => import("../components/ISP/dashboard"),
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
  // if (to.path === "/" && store.getters.getLoginState) {
  //   next({
  //     path: '/' + store.getters.getUserType + '/home',
  //   });
  // }
  if (to.meta.requireLoggedIn && !store.getters.getLoginState) {
    next({
      path: '/',
    });
  } else {
    next();
  }
})


export default router;
