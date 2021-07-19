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
import notFound from "../components/notFound";
//
import NTTN_dashboard from "../components/NTTN/dashboard";
import NTTN_home from "../components/NTTN/home";
import NTTN_notifications from "../components/NTTN/notifications";
import NTTN_packages from "../components/NTTN/packages";
import NTTN_payments from "../components/NTTN/payments";




Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: login,
  },
  {
    path: "/login",
    component: login,
  },
  //
  {
    path: "/ISP/home",
    component: ISP_home,
  },
  {
    path: "/ISP/packages",
    component: ISP_packages,
  },
  {
    path: "/ISP/payments",
    component: ISP_payments,
  },
  {
    path: "/ISP/notifications",
    component: ISP_notifications,
  },
  {
    path: "/ISP/dashboard",
    component: ISP_dashboard,
  },
  //
  {
    path: "/NTTN/home",
    component: NTTN_home,
  },
  {
    path: "/NTTN/packages",
    component: NTTN_packages,
  },
  {
    path: "/NTTN/payments",
    component: NTTN_payments,
  },
  {
    path: "/NTTN/notifications",
    component: NTTN_notifications,
  },
  {
    path: "/NTTN/dashboard",
    component: NTTN_dashboard,
  },
  //
  {
    path: '*', 
    component: notFound,
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
