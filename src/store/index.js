import Vue  from 'vue';
import Vuex from 'vuex';

import posts    from "./posts";
import users    from "./users";
import comments from "./comments";

Vue.use(Vuex);

export default new Vuex.Store({
	strict: (process.env.NODE_ENV !== 'production'),

	state: {

	},

	mutations: {

	},

	actions: {

	},

	modules: {
		posts, users, comments
	}
})
