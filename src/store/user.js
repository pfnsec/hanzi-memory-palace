
const user = {
    //firestorePath: 'users/{userId}',
    //firestoreRefType: 'doc', // or 'doc'
    //moduleName: 'user',
    //statePropName: 'data',
    namespaced: true, // automatically added
    /*
    sync: {
        fill: ["starred"],
        guard: ["userData"],
    },
    */
  
    state: {
        starred: {},
        page: 0,
        userData: null
    },
    getters: {
        starred: state => {
            return state.starred
        },
        page: state => {
            return state.page
        },
        userData: state => {
            return state.userData
        },
    },
    mutations: {
        setUserData(state, userData) {
            state.userData = {
                photoURL: userData.photoURL,
                displayName: userData.displayName,
                uid: userData.uid,
            }
        }
    },
    actions: {},
  }
  
  export default user