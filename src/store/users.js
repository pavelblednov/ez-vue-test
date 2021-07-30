import axios from 'axios';

export default {
	state: {
		users: {}
	},

	mutations: {
		SET_AUTHOR_INFO: function (_state, _oUser)
		{
			_state.users = _oUser;
		}
	},

	actions: {
		FETCH_AUTHOR_INFO: async function ({commit}, _oPayload)
		{
			try
			{
				var oResp = await axios.get(process.env.VUE_APP_API_URL + '/users', {
						params: {
							id: _oPayload.id
						}
					});

				commit('SET_AUTHOR_INFO', oResp.data[0]);

				return oResp.data[0];
			}
			catch (e)
			{
				console.error(e);

				return e;
			}
		}
	}
};