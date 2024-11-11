<script setup>
const appParamsStore = useAppParamsStore();

//appParamsStore.setPagePreTitle('genesis v2.0');
appParamsStore.setPageTitle('Dashboard');
</script>

<template>
	<nuxt-layout name="app-layout">
		<template #content-conent>
			<iframe
				title="Orders"
				width="1140"
				height="541.25"
				src="https://app.powerbi.com/reportEmbed?reportId=4bd71490-59dd-4f1e-a11a-df77acbb21cc&autoAuth=true&ctid=d5b62efe-5e09-453a-8996-b7464c017f36"
				frameborder="0"
				allowFullScreen="true"
			/>
			<ng-iframe v-show="false" />
		</template>
	</nuxt-layout>
</template>

<style lang="less" scoped></style>
