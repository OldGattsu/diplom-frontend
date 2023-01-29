<template>
	<v-container>
		<v-card width="500" class="mx-auto mt-9">
			<v-card-title>Авторизоваться</v-card-title>
			<v-card-text>
				<v-text-field
					v-model="form.email"
					label="E-mail"
					prepend-icon="mdi-account-circle"
				/>
				<v-text-field
					v-model="form.password"
					label="Пароль"
					:type="showPassword ? 'text' : 'password'"
					prepend-icon="mdi-lock"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
				/>
			</v-card-text>

			<v-divider></v-divider>
			<v-card-actions>
				<v-btn
					color="info"
					@click="toRegistration"
				>
					Регистрация
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn
					color="success"
					@click="login"
				>
					Войти
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";

definePageMeta({
	layout: 'auth',
})
const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
	email: '',
	password: '',
})
const login = () => {
	authStore
		.login(form)
		.then((_response) => router.push("/"))
		.catch((error) => console.log("API error", error));
}

const toRegistration = () => router.push('/registration')

const showPassword = ref(false)
</script>