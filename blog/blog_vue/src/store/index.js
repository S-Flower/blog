import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    selectValue: null
  },
  getters: {
  },
  mutations: {
    GetMarker (state, data) {
      state.token = data.token
      state.user = data.FindUser
      localStorage.token = state.token
    },
    OutFun (state) {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
    },
    selectValue (state, value) {
      state.selectValue = value
    }
  },
  actions: {
    async a_userUpData ({ commit }) {
      if (!localStorage.token) return
      const { data } = await Vue.prototype.$http.get('/api/token')
      if (data.status !== 200) return Vue.prototype.$message.error(data.msg)
      this.state.token = data.LocalToken
      this.state.user = data.LocalUser
    }
  },
  modules: {
  }
})
