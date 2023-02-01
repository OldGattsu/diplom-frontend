<template>
	<div v-if="author">
		<p class="text-h3">{{ author.name }}</p>
		<v-row class="mt-4">
			<v-col>
				<p class="text-h4 mb-2">Описание</p>
				<p class="text-subtitle1">{{ author.description }}</p>

				<template v-if="author.books">
					<p class="text-h4 mt-4 mb-2">Книги</p>
					<div
						class="d-flex align-content-space-between flex-wrap"
						style="gap: 30px"
					>
						<v-card
							v-for="book in author.books"
							:key="book.id"
							:title="book.name"
							@click="router.push(`/books/${book.id}`)"
						/>
					</div>
				</template>
			</v-col>
		</v-row>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from "~/store/auth";

const route = useRoute()
const router = useRouter()

const author = ref()
const getAuthor = async () => {
	author.value = await http(`author/${route.params.id}`)
}
getAuthor()
</script>