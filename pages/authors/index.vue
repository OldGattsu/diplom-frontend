<template>
	<v-btn
		v-if="authStore.user.is_admin"
		class="mb-5"
		@click="newAuthorDialog = true"
	>
		Добавить автора
	</v-btn>
	<div
		class="d-flex align-content-space-between flex-wrap"
		style="gap: 30px"
	>
		<v-card
			v-for="author in authors"
			:key="author.id"
			width="350"
			@click="router.push(`/authors/${author.id}`)"
		>
			<v-card-title>{{ author.name }}</v-card-title>
			<v-card-subtitle>{{ author.description.substring(0, 60) }}</v-card-subtitle>
			<v-card-actions>
				<v-btn
					variant="text"
					color="primary"
				>
					Посмотреть
				</v-btn>
			</v-card-actions>
		</v-card>
	</div>
	<v-dialog
		v-model="newAuthorDialog"
		width="700"
	>
		<v-card>
			<v-card-text>
				<v-text-field
					v-model="newAuthor.name"
					label="Имя"
				/>
				<v-textarea
					v-model="newAuthor.description"
					label="Описание"
				/>
			</v-card-text>
			<v-card-actions>
				<v-btn
					color="error"
					@click="newAuthorDialog = false"
				>
					Закрыть
				</v-btn>
				<v-spacer />
				<v-btn
					color="success"
					@click="addAuthor"
				>
					Применить
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup>
import { useAuthStore } from "~/store/auth"
const authStore = useAuthStore()

const router = useRouter()

const authors = ref(null)
const getAuthors = async () => {
	authors.value = await http('authors')
}
getAuthors()

const newAuthor = reactive({
	name: '',
	description: '',
})
const newAuthorDialog = ref(false)
const addAuthor = async () => {
	await http('author', {
		method: 'POST',
		body: newAuthor,
	})
	await getAuthors()

	newAuthorDialog.value = false
}
</script>