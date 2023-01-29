<template>
	<v-app-bar
		app
		color="white"
	>
		<v-container class="py-0 fill-height">
			<v-btn
				v-for="item in menu"
				:key="item.link"
				text
				@click="router.push(item.link)"
			>
				{{ item.name }}
			</v-btn>

			<v-spacer></v-spacer>

			<v-btn @click="logout">Выйти</v-btn>
		</v-container>
	</v-app-bar>

	<v-main class="grey lighten-3">
		<v-container>
			<slot />
		</v-container>
	</v-main>
</template>

<script setup>
import { useAuthStore } from "~/store/auth"
const authStore = useAuthStore()
const logout = () => {
	authStore.logout()
	router.push('/login')
}

const router = useRouter()
const menu = [
	{
		name: 'Книги',
		link: '/',
	},
	{
		name: 'Авторы',
		link: '/authors',
	},
]
</script>