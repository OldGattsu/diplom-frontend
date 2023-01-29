<template>
	<v-row>
		<v-col>
			<v-sheet
				rounded="lg"
			>
				<v-card
					v-for="author in authors"
					:key="author.id"
					width="400"
					:title="author.name"
					subtitle="This is a subtitle"
					text="This is content"
				></v-card>
			</v-sheet>
		</v-col>
	</v-row>
</template>

<script setup>
import { ref } from 'vue'

const authors = ref()
const getAuthors = async () => {
	authors.value = await http('authors')
}
getAuthors()
</script>