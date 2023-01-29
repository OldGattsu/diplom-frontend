<template>
	{{ book }}
	<v-file-input v-model="file" @update:modelValue="upload"></v-file-input>
	{{ file }}
</template>

<script setup>
import { ref } from 'vue'

const route = useRoute()

const book = ref()
const getBook = async () => {
	book.value = await http(`book/${route.params.id}`)
}
getBook()

const file = ref()
const upload = async () => {
	console.log(file)
	await nextTick()
	let url = ''
	const reader = new FileReader()
	reader.onload = e => {
		url = e.target.result
		console.log('url', url)
	}
	// reader.readAsDataURL(file.value)
	http('book', {
		body: {
			file: url,
		},
		method: "POST"
	})
}
</script>