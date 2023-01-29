import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware(async (to) => {
	const authStore = useAuthStore()
	if (!authStore.token && to.name !== 'registration' && (to.name !== 'login')) {
		return navigateTo('/login');
	}

	// if (to.name !== 'Login' && !localStorage.getItem('auth-token')) {
	// 	return navigateTo('/login');
	// } else if (to.name !== 'Login' && !authStore.user) {
	// 	authStore.setAuthUser(await $fetch('/api/getauthuser', {
	// 		headers: authHeader,
	// 	}));
	// }
});