import { useAuthStore } from '~/store/auth'
const authStore = useAuthStore()

export default (url, params) => (
	$fetch(`http://localhost:2000/${url}`, {
		headers: {
			Authorization: authStore.token,
		},
		...params,
	}))
