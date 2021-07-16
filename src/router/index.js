import Vue from "vue";
import VueRouter from "vue-router";
// import payOptionbyBkash from "../components/bkashProceed1.vue";
// import bkashProceed from "../components/bkashProceed2.vue";
// import bkashProceed2 from "../components/bkashProceed3.vue";
// import bkashProceed3 from "../components/bkashProceed4.vue";
// import comparedPkgs from "../components/comparedPkgs";
// import home from "../components/home";
// import notifications from "../components/notifications";
import login from "../components/login";
import NTTN_dashboard from "../components/NTTN/dashboard";
import NTTN_home from "../components/NTTN/home";
import NTTN_notifications from "../components/NTTN/notifications";
import NTTN_packages from "../components/NTTN/packages";
import NTTN_payments from "../components/NTTN/payments";
// import payDone from "../components/payDone";
// import payment from "../components/payment";
// import payMethods from "../components/payMethods";
// import payOption from "../components/payOption";
// import payOptionbyVisa from "../components/payOptionbyVisa";
// import pref from "../components/pref";
// import profile from "../components/profile";
// import selectpkg from "../components/selectpkg";
// import visaProceed from "../components/visaProceed";



Vue.use(VueRouter);

const routes = [
  {
    name: "_",
    path: "/",
    component: login,
  },
  {
    name: "login",
    path: "/login",
    component: login,
  },
  {
    name: "NTTN_home",
    path: "/NTTN/home",
    component: NTTN_home,
  },
  {
    name: "NTTN_packages",
    path: "/NTTN/packages",
    component: NTTN_packages,
  },
  {
    name: "NTTN_payments",
    path: "/NTTN/payments",
    component: NTTN_payments,
  },
  {
    name: "NTTN_notifications",
    path: "/NTTN/notifications",
    component: NTTN_notifications,
  },
  {
    name: "NTTN_dashboard",
    path: "/NTTN/dashboard",
    component: NTTN_dashboard,
  },
  // {
  //   name: "profile",
  //   path: "/profile",
  //   component: profile,
  // },
  // {
  //   name: "notifications",
  //   path: "/notifications",
  //   component: notifications,
  // },
  // {
  //   name: "packages",
  //   path: "/packages",
  //   component: pref,
  //   // children: [{
  //   //   name: "selectPkg",
  //   //   path: "/selectPkg",
  //   //   component: selectpkg,
  //   // }]
  // },
  // {
  //   name: "payment",
  //   path: "/payment",
  //   component: payment,
  // },
  // {
  //   name: "payMethods",
  //   path: "/payMethods",
  //   component: payMethods,
  // },
  // {
  //   name: "payDone",
  //   path: "/payDone",
  //   component: payDone,
  // },
  // {
  //   name: "comparePackages",
  //   path: "/comparePackages",
  //   component: comparedPkgs,
  // },
  // {
  //   name: "selectPkg",
  //   path: "/selectPkg",
  //   component: selectpkg,
  // },

  // {
  //   name: "paymentOptions",
  //   path: "/paymentOptions",
  //   component: payOption,
  // },
  // {
  //   name: "paymentOptionsbyVisa",
  //   path: "/paymentOptionsbyVisa",
  //   component: payOptionbyVisa,
  // },
  // {
  //   name: "visaProceed",
  //   path: "/visaProceed",
  //   component: visaProceed,
  // },
  // {
  //   name: "bkashProceed",
  //   path: "/bkashProceed",
  //   component: bkashProceed,
  // },

  // {
  //   name: "bkashProceed2",
  //   path: "/bkashProceed2",
  //   component: bkashProceed2,
  // },

  // {
  //   name: "bkashProceed3",
  //   path: "/bkashProceed3",
  //   component: bkashProceed3,
  // },
  // {
  //   name: "paymentOptionsbyBkash",
  //   path: "/paymentOptionsbyBkash",
  //   component: payOptionbyBkash,
  // },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
