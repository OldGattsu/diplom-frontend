<template>
	<div v-if="book">
		<p class="text-h3">{{ book.name }}</p>
		<span
			class="text-h5 mb-3"
			v-for="a in book.authors"
			:key="a.id"
		>
			{{ a.name }}
		</span>.&nbsp;

		<v-row class="mt-4">
			<v-col>
				<v-img src="/images/cover.webp" />
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
						@click="editBookDialog = true"
					>
						Изменить
					</v-btn>
				</div>
			</v-col>
		</v-row>
		<v-row
			v-if="comments"
			class="mt-7"
		>
			<v-col>
				<p class="text-h4">Комментарии</p>
				<div class="mt-4">
					<v-alert
						v-for="comment in comments"
						:key="comment.id"
						class="mb-4"
						border="start"
						border-color="deep-purple accent-4"
						elevation="2"
					>
						<span class="font-weight-bold">{{ comment.user_id }}:</span> {{ comment.text }}
					</v-alert>
				</div>
				<div class="d-flex">
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
		v-model="editBookDialog"
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
			</v-card-text>
			<v-card-actions>
				<v-btn
					color="error"
					@click="editBookDialog = false"
				>
					Закрыть
				</v-btn>
				<v-spacer />
				<v-btn
					color="success"
					@click="editBook"
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
const comments = ref()
const getComments = async () => {
	console.log('book', book.value)
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

const editBookDialog = ref(false)
const editBook = () => {
	console.log('edit')
}
</script>