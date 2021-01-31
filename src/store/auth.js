
const auth = {
    moduleName: 'auth',
    namespaced: true, // automatically added
  
    state: {
        userData: null
    },
    getters: {
        userData: state => {
            return state.data.userData
        }
    },
    mutations: {
        setUserData(state, userData) {
            state.userData = userData
        }
    },
    actions: {},
  }
  
  export default auth