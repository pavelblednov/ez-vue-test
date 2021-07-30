import axios from 'axios';

export default {
	state: {
		list: [],
		count: 0
	},

	mutations: {
		SET_POSTS: function (_state, _aList)
		{
			_state.list = _aList;
		},
		SET_COUNT: function (_state, _iCount)
		{
			_state.count = _iCount;
		}
	},

	actions: {
		FETCH_POSTS: async function ({commit}, _iCurrentPage)
		{
			try
			{
				var oResp = await axios.get(process.env.VUE_APP_API_URL + '/posts', {
						params: {
							_page: _iCurrentPage,
							_limit: 10,
							_sort: 'title'
						}
					});

				commit('SET_POSTS', oResp.data);
				commit('SET_COUNT', parseInt(oResp.headers['x-total-count']));

				return oResp.data;
			}
			catch (e)
			{
				console.error(e);

				return e;
			}
		},
		CREATE_POST: async function ({commit}, _oPayload)
		{
			try
			{
				var oResp = await axios.post(process.env.VUE_APP_API_URL + '/posts', _oPayload);

				return oResp.data;
			}
			catch (e)
			{
				console.error(e);

				return e;
			}
		}
	},

	getters: {
		GET_POST_COUNT: function (_state)
		{
			return _state.count;
		}
	}
};
