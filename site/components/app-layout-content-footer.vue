<script setup>
const year = new Date().getFullYear();
</script>

<template>
	<div class="row text-center align-items-center flex-row-reverse">
		<div class="col-lg-auto ms-lg-auto">
			<ul class="list-inline list-inline-dots mb-0">
				<li class="list-inline-item">
					<nuxt-link to="/privacy" target="_blank" class="link-secondary" rel="noopener">
						Privacy
					</nuxt-link>
				</li>
				<li class="list-inline-item">
					<nuxt-link to="/terms" class="link-secondary">
						Terms
					</nuxt-link>
				</li>
			</ul>
		</div>
		<div class="col-12 col-lg-auto mt-3 mt-lg-0">
			<ul class="list-inline list-inline-dots mb-0">
				<li class="list-inline-item">
					Copyright &copy; {{ year }}. All rights reserved.
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="less" scoped></style>
