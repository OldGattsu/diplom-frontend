<template>
	<v-app>
		<v-app-bar
			app
			color="white"
		>
			<v-container class="py-0 fill-height">
				<v-avatar
					class="mr-10" color="grey darken-1"
					size="32"
				></v-avatar>

				<v-btn
					v-for="link in links"
					:key="link"
					text
				>
					{{ link }}
				</v-btn>

				<v-spacer></v-spacer>
			</v-container>
		</v-app-bar>
		§

		<v-main class="grey lighten-3">
			<v-container>
				<v-row>
					<v-col>
						<v-sheet
							rounded="lg"
						>
							<v-card
								v-for="book in books"
								:key="book.id"
								width="400"
								:title="book.name"
								subtitle="This is a subtitle"
								text="This is content"
							></v-card>
						</v-sheet>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup>
import { ref } from 'vue'

const links = [
	'Dashboard',
	'Messages',
	'Profile',
	'Updates',
]

const books = ref()
const getBooks = async () => {
	books.value = await $fetch('http://127.0.0.1:2000/books')
}
getBooks()
</script>