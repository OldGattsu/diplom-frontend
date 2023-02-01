<template>
	<v-btn
		v-if="authStore.user.is_admin"
		class="mb-5"
		@click="newBookDialog = true"
	>
		Добавить книгу
	</v-btn>
	<div
		class="d-flex align-content-space-between flex-wrap"
		style="gap: 30px"
	>
		<v-card
			v-for="book in books"
			:key="book.id"
			width="350"
			@click="router.push(`/books/${book.id}`)"
		>
			<v-img
				:src="book.poster"
				height="200px"
			/>
			<v-card-title>{{ book.name }}</v-card-title>
			<v-card-subtitle>{{ book.description.substring(0, 60) }}</v-card-subtitle>
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
		v-model="newBookDialog"
		width="700"
	>
		<v-card>
			<v-card-text>
				<v-text-field
					v-model="newBook.name"
					label="Название"
				/>
				<v-textarea
					v-model="newBook.description"
					label="Описание"
				/>
				<v-file-input
					label="Обложка"
					@change="fileUpload"
				/>
				<v-select
					v-model="newBook.authors"
					:items="authors"
					item-value="id"
					item-title="name"
					multiple
					label="Авторы"
				/>
			</v-card-text>
			<v-card-actions>
				<v-btn
					color="error"
					@click="newBookDialog = false"
				>
					Закрыть
				</v-btn>
				<v-spacer />
				<v-btn
					color="success"
					@click="addBook"
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

const books = ref()
const getBooks = async () => {
	books.value = await http('books')
}
getBooks()

const newBook = reactive({
	name: '',
	description: '',
	poster: null,
	authors: [],
})
const newBookDialog = ref(false)
const addBook = async () => {
	await http('book', {
		method: 'POST',
		body: newBook,
	})
	await getBooks()

	newBookDialog.value = false
}
const fileUpload = (e) => {
	const file = e.target.files[0]

	const reader = new FileReader()
	reader.readAsDataURL(file);
	reader.onload = function () {
		newBook.poster = reader.result
	}
	reader.onerror = function (error) {
		console.log('Error: ', error);
	}
}

const authors = ref(null)
const getAuthors = async () => {
	authors.value = await http('authors')
}
getAuthors()
</script>