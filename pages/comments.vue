<template>
	<v-table>
		<thead>
		<tr>
			<th class="text-left">
				ID
			</th>
			<th class="text-left">
				Пользователь
			</th>
			<th class="text-left">
				Книга
			</th>
			<th class="text-left">
				Текст
			</th>
			<th></th>
		</tr>
		</thead>
		<tbody>
		<tr
			v-for="comment in comments"
			:key="comment.id"
		>
			<td>{{ comment.id }}</td>
			<td>{{ comment.user.name }}</td>
			<td>{{ comment.book.name }}</td>
			<td>{{ comment.text }}</td>
			<td>
				<v-btn @click="() => deleteComment(comment.id)">Удалить</v-btn>
			</td>
		</tr>
		</tbody>
	</v-table>
</template>

<script setup>
const comments = ref()
const getComments = async () => {
	comments.value = await http('all-comments')
}
getComments()

const deleteComment = async (id) => {
	await http(`comment/${id}`, {
		method: 'DELETE',
	})

	getComments()
}
</script>