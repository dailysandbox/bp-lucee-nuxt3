<script setup>
const appParamsStore = useAppParamsStore();
const { pagePreTitle, pageTitle, isCompactLayout } = storeToRefs(appParamsStore);
</script>
<template>
	<div class="col">
		<div class="page-pretitle">
			{{ pagePreTitle }}
		</div>
		<h2 class="page-title">
			{{ pageTitle }}
		</h2>
	</div>
	<div class="col-auto ms-auto d-print-none">
		<slot name="content-header-controls">
			<div class="d-flex align-items-center p-2">
				<span class="me-2">Compact Layout</span>
				<ToggleSwitch v-model="isCompactLayout" />
			</div>
		</slot>
	</div>
</template>

<style lang="less"></style>
