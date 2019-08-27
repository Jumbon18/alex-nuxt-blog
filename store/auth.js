import Cookie from 'cookie';
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null
});

export const mutations = {
  setToken(state, token) {

    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  }
};

export const actions = {
  async login({commit, dispatch}, formData) {
    try {

      commit('clearError', null, {root: true});
      const {token} = await this.$axios.$post('/api/auth/admin/login', formData);
      //const token = await this.$axios.$get('http://localhost:3000/api/auth/admin/test');
      console.log(token);
      dispatch('setToken', token);
    } catch (e) {
      commit('setError', e, {root: true});
      console.log(e);
      throw e;
    }
  },
  setToken({commit}, token) {
    this.$axios.setToken(token, 'Bearer');
    commit('setToken', token);
    Cookies.set('jwt-token', token);
  },
  logout({commit}) {
    this.$axios.setToken(false);
    commit('clearToken');
    Cookies.remove('jwt-token');
  },
  async createUser({commit}, payload) {
    try {
      const newUser = await this.$axios.$post('/api/auth/admin/create', payload);

    } catch (e) {
      commit('setError', e, {root: true});
      throw e;
    }
  },
  autoLogin({dispatch}) {
    const cookieStr = process.browser ? document.cookie : this.app.context.req.headers.cookie;
    const cookies = Cookie.parse(cookieStr || '') || {};
    const token = cookies['jwt-token'];
    if (isJwtValid) {
      dispatch('setToken', token);
    } else {
      dispatch('logout');
    }
  }
};

export const getters = {
  isAuth: state => !!state.token,
  token: state => state.token
};

function isJwtValid(token) {
  if (!token) {
    return false;
  }
  const jwtData = jwtDecode(token) || {};
  const expires = jwtData.exp || 0;

  return (new Date().getTime() / 1000) < expires;

}
