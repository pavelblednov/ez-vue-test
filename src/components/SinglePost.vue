<template>
	<article v-if="oPost" class="single-post">
		<button type="button"
			@click="onClickHide"
			v-text="'Back to posts'"
			class="btn"
		></button>

		<h2 v-text="oPost.post.title"
			class="single-post__title"
		></h2>

		<p v-html="oPost.post.body"></p>

		<div class="single-post__comments">
			<h3>Comments:</h3>

			<ul v-if="oPost.comments.length" class="comment-list">
				<li v-for="oComment in oPost.comments" :key="oComment.id"
					class="comment-list__item"
				>
					<h4 v-text="oComment.name"></h4>

					<p v-text="oComment.body"></p>

					<p>Reply: <a :href="'mailto:' + oComment.email" v-text="oComment.email"></a></p>
				</li>
			</ul>
		</div>
	</article>
</template>

<script>
export default {
	name: 'single-post',

	props: {
		oPost: {
			type: Object,
			default: null
		}
	},

	methods: {
		onClickHide: function ()
		{
			this.$emit('hide');
		}
	}
}
</script>

<style lang="scss">
.single-post
{
	&__title
	{
		margin-bottom: 30px;
	}

	&__comments
	{
		margin-top: 30px;
		padding-top: 20px;
		border-top: 1px solid #5c5c5c;
	}

	.comment-list
	{
		list-style: none;

		&__item
		{
			margin-top: 20px;
			padding: 15px;
			border: 1px solid #efefef;
		}
	}

	p
	{
		margin: 15px 0;

		a
		{
			color: inherit;
		}
	}
}
</style>
