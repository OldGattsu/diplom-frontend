<template>
	{{ author }}
</template>

<script setup>
import { ref } from 'vue'

const route = useRoute()

const author = ref()
const getAuthor = async () => {
	author.value = await http(`author/${route.params.id}`)
}
getAuthor()
</script>