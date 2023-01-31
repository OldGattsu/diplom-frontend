import { defineStore } from 'pinia'

// const config = useRuntimeConfig()
// const { backendUrl } = config.public

const baseUrl = 'http://127.0.0.1:2000'

export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		user: JSON.parse(localStorage.getItem('user')),
		token: JSON.parse(localStorage.getItem('token')),
	}),
	actions: {
		async registration(loginForm) {
			await $fetch(`${baseUrl}/registration`, {
				method: 'POST',
				body: loginForm,
			})
				.then(response => {
					this.user = response.user
					this.token = response.token

					localStorage.setItem('user', JSON.stringify(this.user))
					localStorage.setItem('token', JSON.stringify(this.token))
				})
				.catch(error => { throw error })
		},
		async login(loginForm) {
			await $fetch(`${baseUrl}/login`, {
				method: 'POST',
				body: loginForm,
			})
				.then(response => {
					this.user = response.user
					this.token = response.token

					localStorage.setItem('user', JSON.stringify(this.user))
					localStorage.setItem('token', JSON.stringify(this.token))
				})
				.catch(error => { throw error })
		},
		logout() {
			this.user = null
			this.token = null

			localStorage.removeItem('user')
			localStorage.removeItem('token')
		},
	}
})