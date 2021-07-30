import axios from 'axios';

export default {
	state: {
		list: []
	},

	mutations: {
		SET_COMMENTS: function (_state, _aList)
		{
			_state.list = _aList;
		}
	},

	actions: {
		FETCH_COMMENTS: async function ({commit}, _oPayload)
		{
			try
			{
				var oResp = await axios.get(process.env.VUE_APP_API_URL + '/comments', {
						params: {
							postId: _oPayload.postId
						}
					});

				commit('SET_COMMENTS', oResp.data);

				return oResp.data;
			}
			catch (e)
			{
				console.error(e);

				return e;
			}
		}
	}
};
