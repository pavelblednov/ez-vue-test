<template functional>
	<table v-if="props.aComments.length" class="content-table">
		<thead>
			<tr>
				<th>Post ID</th>
				<th>Comment Title</th>
				<th>Comment Content</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="oComment in props.aComments" :key="oComment.id">
				<td v-text="oComment.postId || ''"></td>
				<td v-text="oComment.name || ''"></td>
				<td v-text="oComment.body || ''"></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: 'comments-table',

	props: {
		aComments: {
			type: Array,
			default: function () { return []; }
		}
	}
}
</script>
