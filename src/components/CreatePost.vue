<template>
	<validation-observer v-slot="{ handleSubmit }">
		<form class="form" @submit.prevent="handleSubmit(onSubmit)">
			<h2 class="form__title">Create Post</h2>

			<validation-provider class="input-wrp" rules="required" name="Title" v-slot="{ errors }">
				<input class="textfield" v-model="oFormData.title" type="text" placeholder="Post title" />
				<span class="textfield-error">{{ errors[0] }}</span>
			</validation-provider>

			<validation-provider class="input-wrp" rules="required" name="Body" v-slot="{ errors }">
				<textarea class="textfield" v-model="oFormData.body" placeholder="Post content"></textarea>
				<span class="textfield-error">{{ errors[0] }}</span>
			</validation-provider>

			<button type="submit" class="btn" :disabled="isSubmitting">Save</button>
			<button type="button" class="btn" :disabled="isSubmitting" @click="onClickCancel">Cancel</button>
		</form>
	</validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, length } from "vee-validate/dist/rules";

extend('required', {
	...required,
	message: 'This field is required'
});

extend('length', {
	...length,
	message: 'This field must have 2 options'
});

export default {
	name: 'create-post',

	components: {
		'validation-observer': ValidationObserver,
		'validation-provider': ValidationProvider
	},
	
	data: function ()
	{
		return {
			oFormData: {
				title: '',
				body: '',
				userId: 1
			},
			isSubmitting: false
		}
	},

	methods: {
		onSubmit: async function ()
		{
			this.isSubmitting = true;

			await this.$store.dispatch('CREATE_POST', this.oFormData);

			this.isSubmitting = false;

			this.$emit('hide', 'Form has been submitted!');
		},

		onClickCancel: function ()
		{
			this.$emit('hide');
		}
	}
}
</script>

<style lang="scss">
.form
{
	max-width: 400px;
	margin:auto;

	&__title
	{
		margin-bottom: 20px;
	}

	.btn
	{
		&:last-child
		{
			margin-left: 15px;
		}
	}
}

.input-wrp
{
	position: relative;
	display: block;
	width: 100%;
	line-height: 1;
	margin-bottom: 20px;
}

.textfield
{
	display: block;
	float: none;
	width: 100%;
	background: none transparent;
	background-clip: padding-box;
	border: none;
	border-bottom: 1px solid #e5e5e5;
	line-height: 1.2;
	font-size: 16px;
	font-family: inherit;
	color: #777;
	appearance: none;
	outline: none;
	padding: 15px 0;
	box-shadow: none;
	border-radius: 0;

	&:focus
	{
		border-color: #131313;
	}
}

.textfield-error
{
	display: block;
	margin-top: 5px;
	font-size: 14px;
	color: #F56C6C;
}

textarea
{
	resize: vertical;
	min-height: 130px;
	height: 100%;
}
</style>
