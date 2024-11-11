<script setup>
const route = useRoute();
const appParamsStore = useAppParamsStore();
</script>

<template>
	<Body :class="bodyClasses" />
	<div class="page">
		<slot name="page-header">
			<app-layout-header />
		</slot>
		<div class="page-wrapper">
			<div class="page-header d-print-none">
				<div class="container-xl">
					<div class="row g-2 align-items-center">
						<slot name="content-header">
							<app-layout-content-header />
						</slot>
					</div>
				</div>
			</div>
			<div class="page-body">
				<div class="container-xl page-content-wrapper">
					<div class="card page-content">
						<div class="card-body">
							<slot name="content-conent">
								<nuxt-page />
							</slot>
						</div>
					</div>
				</div>
			</div>
			<footer class="footer footer-transparent d-print-none">
				<div class="container-xl">
					<app-layout-content-footer />
				</div>
			</footer>
		</div>
	</div>
</template>

<style lang="less" scoped>
.page-body {
    margin-bottom: 0;
}
.footer {
    padding: 20px 0;
}
</style>
