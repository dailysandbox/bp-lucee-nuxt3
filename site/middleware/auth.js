import { useUserStore } from '@/stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
	const userStore = useUserStore();

	if (!userStore.auth) 
		return navigateTo(`/login`);
});
