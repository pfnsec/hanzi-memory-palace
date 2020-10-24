
const user = {
    firestorePath: 'users/{userId}',
    firestoreRefType: 'doc', // or 'doc'
    moduleName: 'user',
    statePropName: 'data',
    namespaced: true, // automatically added
  
    state: {
        data: {
            starred: {},
            page: 0
        },
        userData: null
    },
    getters: {
        starred: state => {
            return state.data.starred
        },
        page: state => {
            return state.data.page
        },
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
  
  export default user