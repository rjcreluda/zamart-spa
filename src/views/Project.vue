<template>
	<div class="project px-4 py-4">
		<h1 class="subheading">Projects List</h1>
		<v-container class="my-5">
			<v-card flat v-for="project in projects" :key="project.title">
				<v-layout row wrap :class="`pa-3 pro ${project.status}`">
					<v-flex xs12 md6>
						<div class="caption grey--text">PROJECT TITLE</div>
						<div>{{ project.title }}</div>
					</v-flex>
					<v-flex xs6 sm4 md2>
						<div class="caption grey--text">Person</div>
						<div>{{ project.person }}</div>
					</v-flex>
					<v-flex xs6 sm4 md2>
						<div class="caption grey--text">DUE DATE</div>
					<div>{{ project.due }}</div>
					</v-flex>
					<v-flex xs2 sm4 md2>
						<div class="caption grey--text">STATUS</div>
					<div>{{ project.status }}</div>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
			</v-card>
		</v-container>
	</div>
</template>

<script>
// @ is an alias to /src
////import HelloWorld from '@/components/HelloWorld.vue'

export default {
	name: 'Project',
	data: () => ({
		projects: [
			{ title: 'Project one', person: 'John Doe', due: '2021-05-08', status: 'ongoing' },
			{ title: 'Project two', person: 'John Doe', due: '2021-05-08', status: 'complete' },
			{ title: 'Project three', person: 'John Doe', due: '2021-05-08', status: 'ongoing' },
			{ title: 'Project four', person: 'John Doe', due: '2021-05-08', status: 'complete' },
			{ title: 'Project last', person: 'John Doe', due: '2021-05-08', status: 'overdue' },
		]
	})
}
</script>

<style type="text/css" scoped>
	.pro.ongoing{
		border-left: 4px solid orange;
	}
	.pro.complete{
		border-left: 4px solid green;
	}
	.pro.overdue{
		border-left: 4px solid tomato;
	}
</style>