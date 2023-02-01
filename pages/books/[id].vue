<template>
	<div v-if="book">
		<p class="text-h3">{{ book.name }}</p>
		<span v-if="authors" class="text-h5 mb-3" v-once>{{ authors }}.</span>

		<v-row class="mt-4">
			<v-col>
				<v-img
					:src="book.poster"
					width="600"
				/>
			</v-col>
			<v-col>
				<p class="text-h4 mb-2">Описание</p>
				<p class="text-subtitle1">{{ book.description }}</p>

				<div
					v-if="authStore.user.is_admin"
					class="d-flex mt-8"
				>
					<v-btn
						class="mr-3"
						color="error"
						@click="deleteBook"
					>
						Удалить
					</v-btn>
					<v-btn
						color="info"
						@click="updateBookDialog = true"
					>
						Изменить
					</v-btn>
				</div>
			</v-col>
		</v-row>
		<v-row
			class="mt-7"
		>
			<v-col>
				<p class="text-h4 mb-4">Комментарии</p>
				<div
					v-if="comments"
					class="mt-4"
				>
					<v-alert
						v-for="comment in comments"
						:key="comment.id"
						class="mb-4"
						border="start"
						border-color="deep-purple accent-4"
						elevation="2"
					>
						<span class="font-weight-bold">{{ comment.user.name }}:</span> {{ comment.text }}
					</v-alert>
				</div>
				<div v-if="!authStore.user.is_blocked" class="d-flex">
					<v-text-field
						v-model="newComment"
						placeholder="Введите ваш комментарий"
						outlined
						clearable
					/>
					<v-btn
						class="ml-4"
						outlined
						size="x-large"
						color="deep-purple"
						@click="addComment"
					>
						Отправить
					</v-btn>
				</div>
			</v-col>
		</v-row>
	</div>
	<v-dialog
		v-model="updateBookDialog"
		width="700"
	>
		<v-card>
			<v-card-text>
				<v-text-field
					v-model="book.name"
					label="Название"
				/>
				<v-textarea
					v-model="book.description"
					label="Описание"
				/>
				<v-select
					v-model="book.authors"
					:items="authorsList"
					item-value="id"
					item-title="name"
					multiple
					label="Авторы"
				/>
			</v-card-text>
			<v-card-actions>
				<v-btn
					color="error"
					@click="updateBookDialog = false"
				>
					Закрыть
				</v-btn>
				<v-spacer />
				<v-btn
					color="success"
					@click="updateBook"
				>
					Применить
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from "~/store/auth";

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const book = ref()
const getBook = async () => {
	book.value = await http(`book/${route.params.id}`)
}
const authors = computed(() => {
	if (book.value.authors) book.value.authors.map(a => a.name).join(', ')
	return null
})

const comments = ref()
const getComments = async () => {
	comments.value = await http(`comments/${book.value.id}`)
}

(async () => {
	await getBook()
	await getComments()
})()

const newComment = ref('')
const addComment = async () => {
	await http('comment', {
		method: 'POST',
		body: {
			book_id: book.value.id,
			user_id: authStore.user.id,
			text: newComment.value,
		},
	})

	getComments()
	newComment.value = ''
}

const deleteBook = async () => {
	await http(`book/${book.value.id}`, {
		method: 'DELETE',
	})

	router.push('/')
}

const updateBookDialog = ref(false)
const updateBook = async () => {

	await http('book', {
		method: 'PUT',
		body: {
			id: book.value.id,
			name: book.value.name,
			description: book.value.description,
			authors: book.value.authors,
		},
	})

	await getBook()

	updateBookDialog.value = false
}

const authorsList = ref(null)
const getAuthorsList = async () => {
	authorsList.value = await http('authors')
}
getAuthorsList()
</script>