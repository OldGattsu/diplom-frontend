<template>
	<v-app-bar
		app
		color="white"
	>
		<v-container class="py-0 fill-height">
			<v-btn
				prepend-icon="mdi-book"
				text
				@click="router.push('/')"
			>
				Книги
			</v-btn>
			<v-btn
				prepend-icon="mdi-account-search"
				text
				@click="router.push('/authors')"
			>
				Авторы
			</v-btn>
			<template v-if="authStore.user.is_admin">
				<v-btn
					prepend-icon="mdi-account-supervisor"
					text
					@click="router.push('/users')"
				>
					Пользователи
				</v-btn>
				<v-btn
					prepend-icon="mdi-comment-eye"
					text
					@click="router.push('/comments')"
				>
					Комментарии
				</v-btn>
			</template>

			<v-spacer></v-spacer>
			<v-avatar
				color="primary"
				size="small"
			>
				{{ authStore.user.name.substring(0,1).toUpperCase() }}
			</v-avatar>
			<v-btn
				prepend-icon="mdi-logout"
				@click="logout"
			>
				Выйти
			</v-btn>
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
</script>