<script setup>
const appParamsStore = useAppParamsStore();
const { isHorizontalLayout } = storeToRefs(appParamsStore);
const navbarClasses = computed(() => {
	return {
		navbar: true,
		'navbar-vertical': !isHorizontalLayout.value,
		'navbar-transparent': !isHorizontalLayout.value,
		'navbar-expand-md': true
	};
});
const brandClasses = computed(() => {
	return {
		'navbar-brand navbar-brand-autodark': true,
		'd-none-navbar-horizontal pe-0 pe-md-3': isHorizontalLayout.value
	};
});
</script>

<template>
	<header :class="navbarClasses">
		<div class="container-xl">
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#sidebar-menu"
				aria-controls="sidebar-menu"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon" />
			</button>
			<div :class="brandClasses">
				<nuxt-link to="/">
					<img
						src="/images/legacy/bridgewater-sm.png"
						alt="Tabler"
						class="navbar-brand-image"
					>
				</nuxt-link>
			</div>
			<div id="sidebar-menu" class="collapse navbar-collapse">
				<slot name="header-menu">
					<app-layout-header-menu />
				</slot>
			</div>
			<slot name="header-controls">
				<app-layout-header-controls />
			</slot>
		</div>
	</header>
</template>

<style lang="less" scoped></style>
