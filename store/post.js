export const actions = {
  async getAnalytic({commit}) {
    try {
      return await  this.$axios.$get(`/api/post/admin/get/analytics`);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e;
    }
  },
  async fetchAdmin({commit}) {
    try {
      const posts = await this.$axios.$get('/api/post/admin');
      commit('adminPosts', posts);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e;
    }

  },
  async fetch({commit}) {
    try {
      const posts = await this.$axios.$get('/api/post');
      commit('allPosts', posts);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e;
    }
  },
  async addView({commit}, {views, _id}) {
    try {
      await this.$axios.$put(`/api/post/add/view/${_id}`, {views})
    } catch (e) {
      commit('setError', e, {root: true});
      throw e;
    }
  },
  async remove({commit}, id) {
    try {
      await this.$axios.$delete(`/api/post/admin/${id}`);
      commit('removePost', id);

    } catch (e) {
      commit('setError', e, {root: true});
      throw e;
    }
  },

  async update({}, {id, text}) {
    try {
      return await this.$axios.$put(`/api/post/admin/${id}`, {text});
      commit('removePost', id);

    } catch (e) {
      commit('setError', e, {root: true});
      throw e;
    }
  },

  async fetchAdminById({commit, state}, id) {
    return state.posts.find(p => p._id === id);
  },

  async fetchById({commit, state}, id) {
    try {
      return await this.$axios.$get(`api/post/${id}`)
    } catch (e) {
      commit('setError', e, {root: true});
      throw e;

    }
  },
  async create({commit}, {title, text, image}) {
    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('text', text);
      fd.append('image', image, image.name);

      return await this.$axios.$post('/api/post/admin', fd);

    } catch (e) {
      commit('setError', e, {root: true});
      throw e;

    }


  }
};
export const mutations = {
  adminPosts(state, payload) {
    state.posts = payload
  },
  allPosts(state, posts) {
    state.posts = posts;
  },
  removePost(state, id) {
    state.posts = state.posts.filter(p => p._id !== id);
  }
};

export const state = () => ({
  posts: []
});

export const getters = {
  adminPosts: state => state.posts,
  allPosts: state => state.posts

};

