<template>
	<v-table>
		<thead>
		<tr>
			<th class="text-left">
				ID
			</th>
			<th class="text-left">
				Имя
			</th>
			<th class="text-left">
				Заблокирован
			</th>
			<th></th>
		</tr>
		</thead>
		<tbody>
		<tr
			v-for="user in users"
			:key="user.id"
		>
			<td>{{ user.id }}</td>
			<td>{{ user.name }}</td>
			<td>{{ user.is_blocked ? 'Да' : 'Нет' }}</td>
			<td>
				<v-btn
					v-if="!user.is_blocked"
					@click="() => blockUser(user.id, true)"
				>
					Заблокировать
				</v-btn>
				<v-btn
					v-else
					@click="() => blockUser(user.id, false)"
				>
					Разблокировать
				</v-btn>
			</td>
		</tr>
		</tbody>
	</v-table>
</template>

<script setup>
const users = ref()
const getUsers = async () => {
	users.value = await http('users')
}
getUsers()

const blockUser = async (id, is_blocked) => {
	await http('user-block', {
		method: 'POST',
		body: {
			id,
			is_blocked,
		},
	})

	getUsers()
}
</script>