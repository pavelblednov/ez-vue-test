<template functional>
	<table v-if="props.oAuthorInfo" class="content-table">
		<tr v-if="props.oAuthorInfo.id">
			<td>User ID</td>
			<td>{{ props.oAuthorInfo.id }}</td>
		</tr>
		<tr v-if="props.oAuthorInfo.username">
			<td>User Name</td>
			<td>{{ props.oAuthorInfo.username }}</td>
		</tr>
		<tr v-if="props.oAuthorInfo.name">
			<td>Name</td>
			<td>{{ props.oAuthorInfo.name }}</td>
		</tr>
		<tr v-if="props.oAuthorInfo.phone">
			<td>Phone</td>
			<td>{{ props.oAuthorInfo.phone }}</td>
		</tr>
		<tr v-if="props.oAuthorInfo.email">
			<td>Email</td>
			<td><a :href="'mailto:'+ props.oAuthorInfo.email">{{ props.oAuthorInfo.email }}</a></td>
		</tr>
		<tr v-if="props.oAuthorInfo.website">
			<td>Website</td>
			<td><a :href="props.oAuthorInfo.website">{{ props.oAuthorInfo.website }}</a></td>
		</tr>
		<tr v-if="props.oAuthorInfo.address">
			<td>Address</td>
			<td>
				{{ props.oAuthorInfo.address.city }},
				{{ props.oAuthorInfo.address.street }},
				{{ props.oAuthorInfo.address.zipcode }},
				{{ props.oAuthorInfo.address.suite }},
				{{ props.oAuthorInfo.address.geo.lat }}
				{{ props.oAuthorInfo.address.geo.lng }}
			</td>
		</tr>
		<tr v-if="props.oAuthorInfo.company">
			<td>Company</td>
			<td>
				{{ props.oAuthorInfo.company.name }},
				{{ props.oAuthorInfo.company.catchPhrase }},
				{{ props.oAuthorInfo.company.bs }}
			</td>
		</tr>
	</table>
</template>

<script>
export default {
	name: 'author-info',

	props: {
		oAuthorInfo: {
			type: Object,
			default: null
		}
	}
}
</script>