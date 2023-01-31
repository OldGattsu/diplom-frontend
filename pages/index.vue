<template>
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
				src="/images/cover.webp"
				height="200px"
			/>

			<v-card-title>
				{{ book.name }}
			</v-card-title>

			<v-card-subtitle>
				1,000 miles of wonder
			</v-card-subtitle>

			<v-card-actions>
				<v-btn
					variant="text"
					color="teal-accent-4"
				>
					Learn More
				</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const router = useRouter()

const books = ref()
const getBooks = async () => {
	books.value = await http('books')
}
getBooks()
</script>