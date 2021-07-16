import * as Cookies from 'js-cookie';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // baseUrl: 'https://mindshare-backend.df.r.appspot.com',
        baseUrl: '',
        userName: '',
        userEmail: '',
        authToken: '',
        loggedIn: false,
        templateCampaign: [],
        selectedPackage: '',
        currentPage: 'home',
        selPkgName: '',
        selPkgPrice: '',
        selPkgBand: '',
        selPkgDur: '',
        isPaid: false,
        comparedPkgs: []
    },
    getters: {
        isLoggedIn: state => {
            return state.loggedIn;
        },
        getTemplateCampaign: state => {
            return state.templateCampaign;
        },
        getAuthToken: state => {
            return state.authToken;
        },
        getUserName: state => {
            return state.userName;
        },
        getUserEmail: state => {
            return state.userEmail;
        },
        getBaseUrl: state => {
            return state.baseUrl;
        },
        getCurrentPage: state => {
            return state.currentPage;
        },
        getSelectedPackage: state => {
            return state.selectedPackage;
        },
        getSelPkgName: state => {
            return state.selPkgName;
        },
        getSelPkgPrice: state => {
            return state.selPkgPrice;
        },
        getSelPkgBand: state => {
            return state.selPkgBand;
        },
        getSelPkgDur: state => {
            return state.selPkgDur;
        },
        getComapredPkgs: state => {
            return state.comparedPkgs;
        },
        getIsPaid: state => {
            return state.isPaid;
        }
    },

    mutations: {
        setLoggedIn: state => {
            state.loggedIn = true;
        },
        setLoggedOut: state => {
            state.loggedIn = false;
        },
        setTemplateCampaign: (state, templateCampaign) => {
            state.templateCampaign = templateCampaign;
        },
        resetTemplateCampaign: state => {
            state.templateCampaign = [];
        },
        setAuthToken: (state, authToken) => {
            state.authToken = authToken;
        },
        setUserName: (state, userName) => {
            state.userName = userName;
        },
        setUserEmail: (state, userEmail) => {
            state.userEmail = userEmail;
        },
        setBaseUrl: (state, baseUrl) => {
            state.baseUrl = baseUrl;
        },
        resetAuthToken: state => {
            state.authToken = '';
        },
        resetUserEmail: state => {
            state.userEmail = '';
        },
        setCurrentPage: (state, currentPage) => {
            state.currentPage = currentPage;
        },
        setSelectedPackage: (state, selectedPackage) => {
            state.selectedPackage = selectedPackage;
        },
        setSelPkgName: (state, name) => {
            state.selPkgName = name;
        },
        setSelPkgPrice: (state, price) => {
            state.selPkgPrice = price;
        },
        setSelPkgBand: (state, band) => {
            state.selPkgBand = band;
        },
        setSelPkgDur: (state, dur) => {
            state.selPkgDur = dur;
        },
        setComparedPkgs: (state, comPacks) => {
            state.comparedPkgs = comPacks;
        },
        setIsPaid: (state, val) => {
            state.isPaid = val;
        }
    },

    actions: {},

    modules: {},

    plugins: [
        createPersistedState({
            getState: (key) => Cookies.getJSON(key),
            setState: (key, state) => Cookies.set(key, state),
            removeState: key => Cookies.remove(key)
        })
    ]
})
