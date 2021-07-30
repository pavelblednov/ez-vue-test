<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<style lang="scss">
*
{
	padding: 0;
	margin: 0;

	&,
	&::before,
	&::after {
		box-sizing: inherit;
	}
}

html
{
	box-sizing: border-box;
}

#app
{
	padding: 100px 0;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
</style>
