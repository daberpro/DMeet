<script type="text/javascript">

	import BG1 from "../Shiny Overlay.svg"
	import Header from "$lib/component/header.svelte"
	import {onMount} from "svelte"
</script>

<div class="w-full h-fit z-0 bg-indigo-100 flex flex-col justify-center items-center">
	<div class="w-full relative flex h-fit justify-center items-center flex-col">
		<div class="w-full h-[400px] flex flex-col justify-center items-center gap-2">
			<h1 class="font-extrabold poppins text-6xl text-indigo-900">
				Welcome <small class="font-medium">to DMeet</small>
			</h1>
			<p class="poppins whitespace-normal w-1/2 text-center text-xl text-gray-500">
				one view for all solutions, manage your works,
				and connected with your team
			</p>
		</div>

		<img src="{BG1}" class="w-full h-[150px] bottom-[-10px] left-0 absolute">
		<div class="absolute bottom-[-50px] rounded-full justify-center items-center flex flex-wrap w-[100px] h-[100px] shadow-md bg-white text-4xl">
			<i class="fa-solid fa-arrow-down"></i>
		</div>

	</div>
</div>

<Header/>