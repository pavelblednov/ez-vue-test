<template>
	<div class="home">
		<div class="wrapper">
			<create-post v-if="sCurrContent === 'create-post'" @hide="onHideCreateForm" />

			<single-post v-if="sCurrContent === 'single-post'" :oPost="oSinglePost" @hide="onHideSinglePost" />

			<button type="button"
				v-if="sCurrContent === 'posts'"
				v-text="'Create Post'"
				@click="sCurrContent = 'create-post'"
				class="btn"
			></button>

			<table v-if="sCurrContent === 'posts' && aPosts.length" class="content-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Comments</th>
						<th>Author</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="oPost in aPosts" :key="oPost.id">
						<td v-text="oPost.id"></td>
						<td><a href="#" v-text="oPost.title" @click.prevent="onShowSinglePost(oPost)"></a></td>
						<td><a href="#" v-text="'Comments'" @click.prevent="onShowComments(oPost.id)"></a></td>
						<td><a href="#" v-html="'Author ' + oPost.userId" @click.prevent="onShowAuthorInfo(oPost.userId)"></a></td>
					</tr>
				</tbody>

				<tfoot>
					<tr>
						<td colspan="4">
							<div class="pagination">
								<button
									type="button"
									class="pagination__btn btn"
									:disabled="iCurrentPage === 1"
									@click="onCliclPrevPage"
									v-text="'Prev'"
								></button>

								<span class="pagination__count">{{ iCurrentPage }}/{{ iTotalPage }}</span>

								<button
									type="button"
									class="pagination__btn btn"
									:disabled="iCurrentPage === iTotalPage"
									@click="onCliclNextPage"
									v-text="'Next'"
								></button>
							</div>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>

		<vue-modal v-model="bShowAuthorModal" title="Информация об авторе" modal-class="my-modal">
			<author-info :oAuthorInfo="oAuthorInfo" />
		</vue-modal>

		<vue-modal v-model="bShowCommentsModal" title="Комментарии к посту" modal-class="my-modal">
			<comments-table :aComments="aComments" />
		</vue-modal>
	</div>
</template>

<script>
// @ is an alias to /src
import CreatePost    from '@/components/CreatePost.vue';
import SinglePost    from '@/components/SinglePost.vue';
import AuthorInfo    from '@/components/AuthorInfo.vue';
import CommentsTable from '@/components/CommentsTable.vue';

import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';

export default {
	name: 'Home',

	components: {
		'create-post': CreatePost,
		'single-post': SinglePost,
		'author-info': AuthorInfo,
		'comments-table': CommentsTable,
		'vue-modal': VueModal
	},
	
	data: function ()
	{
		return {
			aPosts: [],
			aComments: [],
			oAuthorInfo: {},

			iTotalPage: 0,
			iCurrentPage: parseInt(this.$route.query.page) || 1,

			sCurrContent: 'posts',

			bShowCommentsModal: false,
			bShowAuthorModal: false,

			oSinglePost: null
		}
	},

	created: async function ()
	{
		this.aPosts = await this.$store.dispatch('FETCH_POSTS', this.iCurrentPage);

		this.iTotalPage = Math.ceil(this.$store.getters['GET_POST_COUNT'] / 10);
	},

	methods: {
		onHideCreateForm: function (_sMessage)
		{
			if (_sMessage)
			{
				alert(_sMessage);
			}

			this.sCurrContent = 'posts';
		},

		onShowSinglePost: async function (oPost)
		{
			var aComments = await this.$store.dispatch('FETCH_COMMENTS', {
					postId: oPost.id
				});

			this.sCurrContent = 'single-post';

			this.oSinglePost = {
				post: oPost,
				comments: aComments
			};
		},
		onHideSinglePost: function ()
		{
			this.sCurrContent = 'posts';
			this.oSinglePost = null;
		},

		onShowComments: async function (_iPostID)
		{
			this.aComments = await this.$store.dispatch('FETCH_COMMENTS', {
				postId: _iPostID
			});

			this.bShowCommentsModal = true;
		},

		onShowAuthorInfo: async function (_iUserID)
		{
			this.oAuthorInfo = await this.$store.dispatch('FETCH_AUTHOR_INFO', {
				id: _iUserID
			});

			this.bShowAuthorModal = true;
		},
		
		onCliclPrevPage: async function ()
		{
			if (this.__is_loading) return;


			this.iCurrentPage--;

			this.__is_loading = true;
			this.aPosts = await this.$store.dispatch('FETCH_POSTS', this.iCurrentPage);
			this.__is_loading = false;

			this.onChangePage(this.iCurrentPage);
		},
		onCliclNextPage: async function ()
		{
			if (this.__is_loading) return;


			this.iCurrentPage++;

			this.__is_loading = true;
			this.aPosts = await this.$store.dispatch('FETCH_POSTS', this.iCurrentPage);
			this.__is_loading = false;

			this.onChangePage(this.iCurrentPage);
		},
		onChangePage: function (_iPage)
		{
			var path = this.$route.path + '?page=' + _iPage;

			this.$router.push(path);
		},
	}
}
</script>

<style lang="scss">
.wrapper
{
	max-width: 800px;
	margin: 0 auto;
}

.content-table
{
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
	text-align: left;

	tbody
	{
		tr
		{
			&:nth-of-type(even) { background-color: #f9f9f9; }
		}
	}

	tr
	{
	
	}

	th,
	td
	{
		padding: 10px 5px;
		border: 1px solid #dee2e6;

		&:first-child
		{
			white-space: nowrap;
		}

		a
		{
			color: #2c3e50;

			&:hover,
			&:focus
			{
				text-decoration: none;
			}
		}
	}
}

.my-modal
{
	max-width: 800px;
}

.btn
{
	display: inline-block;
	margin-bottom: 10px;
	padding: 10px;
	font-size: 16px;
	line-height: 1.2;
	color: #fff;
	background: #007bff;
	border: none;
	box-shadow: none;
	border-radius: 5px;
	cursor: pointer;

	&:disabled
	{
		opacity: 0.6;
		cursor: not-allowed;
	}
}

.pagination
{
	line-height: 1;
	text-align: center;

	&__count
	{
		padding: 0 15px;
	}

	.btn
	{
		margin-bottom: 0;
	}
}
</style>
