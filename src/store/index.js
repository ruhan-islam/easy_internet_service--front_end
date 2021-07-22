import Cookies from 'js-cookie';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // baseUrl: 'https://mindshare-backend.df.r.appspot.com',
        baseUrl: '',
        loginState: false,
        authToken: '',
        userData: '',
        userID: '',
        userName: '',
        userType: '',
        userEmail: '',
        userPkgID: '',
        // 
        notificationCount: 0,
        selectedPackage: '',
        currentPage: 'home',
        isPaid: false,
        comparedPkgs: [],
    },

    getters: {
        getBaseUrl: state => {
            return state.baseUrl;
        },
        getLoginState: state => {
            return state.loginState;
        },
        getAuthToken: state => {
            return state.authToken;
        },
        getUserData: state => {
            return state.userData;
        },
        getUserID: state => {
            return state.userID;
        },
        getUserName: state => {
            return state.userName;
        },
        getUserType: state => {
            return state.userType;
        },
        getUserEmail: state => {
            return state.userEmail;
        },
        getUserPkgID: state => {
            return state.userPkgID;
        },
        //
        getNtfCount: state => {
            return state.notificationCount;
        },
        getSelectedPkg: state => {
            return state.selectedPackage;
        },
        getCurrentPage: state => {
            return state.currentPage;
        },
        getComapredPkgs: state => {
            return state.comparedPkgs;
        },
        getIsPaid: state => {
            return state.isPaid;
        }
    },

    mutations: {
        setBaseUrl: (state, baseUrl) => {
            state.baseUrl = baseUrl;
        },
        setLoginState: (state, loginState) => {
            state.loginState = loginState;
        },
        setAuthToken: (state, authToken) => {
            state.authToken = authToken;
        },
        setUserData: (state, userData) => {
            state.userData = userData;
        },
        setUserID: (state, userID) => {
            state.userID = userID;
        },
        setUserName: (state, userName) => {
            state.userName = userName;
        },
        setUserType: (state, userType) => {
            state.userType = userType;
        },
        setUserEmail: (state, userEmail) => {
            state.userEmail = userEmail;
        },
        setUserPkgID: (state, userPkgID) => {
            state.userPkgID = userPkgID;
        },
        //
        setNtfCount: (state, notificationCount) => {
            state.notificationCount = notificationCount;
        },
        decNtfCount: (state, needToDecrease) => {
            if (needToDecrease && state.notificationCount > 0)
                state.notificationCount--;
        },
        setSelectedPkg: (state, selectedPackage) => {
            state.selectedPackage = selectedPackage;
        },
        setCurrentPage: (state, currentPage) => {
            state.currentPage = currentPage;
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
