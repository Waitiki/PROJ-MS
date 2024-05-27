<template>
	<div class="app">
		<!-- Sidebar -->
		<Sidebar />

		<!-- Content -->
		<div class="content">
			<router-view />
		</div>
	</div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import { RouterView, RouterLink } from 'vue-router';
</script>

<style lang="scss">
:root {
	--primary: #4ade80;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	// font-family: ui-monospace;
	font-family: 'Fira sans', sans-serif;
}

body {
	background: var(--light);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;
	height: 100vh;
	overflow: hidden;

	.sidebar {
		flex: 0 0 var(--sidebar-width);
	}

	.content {
		flex: 1;
		overflow-y: auto;
		padding: 2rem;
	}

	main {
		flex: 1 1 0;
		// padding: 2rem;

		@media (max-width: 1024px) {
			padding-left: 1.5rem;
		}
	}

	/* rgba(30,41,59,255)    
white - rgba(241,245,249,255)    
green -  rgba(74,222,128,255) */

/* Styles for larger screens */
@media only screen and (min-width: 768px) {
    
}

/* Styles for smaller screens */
@media only screen and (max-width: 767px) {
    main{
		padding-left: 1.3rem;
	}
}
}
</style>
