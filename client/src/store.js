import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist'

Vue.use(Vuex);

/**
 * Makes an instance of VuexPersist.
 */
const vuexLocalStorage = new VuexPersist({
  key: 'vuex-persistance',
  storage: window.localStorage
});

/**
 * Makes an instance of Vuex.
 */
const store = new Vuex.Store({
	plugins: [vuexLocalStorage.plugin],
	state: {
		user: {
			name: null,
			role: null,
			token: null
		},
		form: {
			email: null,
			password: null
		}
	},
	mutations: {
		login: (state, newUserState) => {
			state.user = newUserState;
		},
		logout: (state) => {
			state.user.name = null;
			state.user.role = null;
			state.user.token = null;
    },
	},
	actions: {
		login: ({commit}, payload) => {
			commit('login', payload);
		},
		logout: ({commit}) => {
			commit('logout');
		}
	}
});

export default store;