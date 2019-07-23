import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: {
            title: '',
            state: false
        }
    },

    mutations: {
        showLoading(state, payLoad) {
            state.loading.title = payLoad.title
            state.loading.state = true
        },

        hideLoading(state) {
            state.loading.state = false
        }
    },

    actions: {

    }
})
