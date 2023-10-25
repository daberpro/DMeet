<script type="text/javascript">
	import {onMount} from "svelte"
	import {showAdditionalMenu} from "./store.js"
	const config = {
		showAboutProfile: false
	}
	const menu = [
		{
			name: "Daberdev",
			active: true,
			icon: `<i class="fa-solid fa-code"></i>`,
			url: ``
		},
		{
			name: "Github",
			active: false,
			icon: `<i class="fa-brands fa-github"></i>`,
			url: ``
		},
		{
			name: "Youtube",
			active: false,
			icon: `<i class="fa-brands fa-youtube"></i>`,
			url: ``
		},
		{
			name: "Meet",
			active: false,
			icon: ``,
			url: `/meet`
		},
	]

	function activate(e){
		const btn = e.target;
		const index = btn.getAttribute("index");
		if(menu[index] instanceof Object && "active" in menu[index]){
			menu[index].active = true;
		}
		menu.forEach((d,i) => {
			if(parseInt(index) !== i) menu[i].active = false;
		})
	}

	function showAboutProfile(e){
		const el = e.target;
		if(el.matches("[profile]")){
			config.showAboutProfile = true;
		}
	}

	function hideAboutProfile(e){
		const el = e.target;
		if(el.matches("[profile]")){
			config.showAboutProfile = false;
		}
	}

	let showAdditional = true;
	showAdditionalMenu.subscribe(value =>{
		showAdditional = value;
	})
	onMount(()=>{
		document.body.onmousemove = showAboutProfile;
		document.body.onmouseout = hideAboutProfile;
		document.body.onclick = e =>{
			if(config.showAboutProfile){
				hideAboutProfile(e);
				return;
			}
			showAboutProfile(e);
		}
	})
</script>

<style type="text/css">
	.about{
		transition: 0.3s all;
		visibility: hidden;
		bottom: -130px;
		opacity: 0.0;
	}
	.show-about{
		transition: 0.3s all;
		visibility: visible;
		bottom: -110px;
		opacity: 1.0;
	}

	.active:before{
		position: absolute;
		content: "";
		width: 15px;
		height: 15px;
		bottom: -16px;
		transform: rotate(45deg);
		transition: 0.3s all;
		visibility: hidden;
		opacity: 0.5;
	}

	.active-show:before{
		transition: 0.3s all;
		visibility: visible;
		opacity: 1.0;
		bottom: -7.5px;
	}
</style>

<div id="navbar" class="w-full z-20 shadow-md bg-white h-fit justify-between items-center flex flex-wrap gap-[5px]">
	<div class="justify-start items-center flex flex-wrap gap-[5px] font-extrabold text-indigo-800 text-4xl poppins pl-6">
		<a data-sveltekit-preload-data="hover" href="/">Daber</a>
	</div>
	<div class="justify-center overflow-hidden relative h-[70px] items-center flex flex-wrap gap-[10px]">
		{#if showAdditional}
			{#each menu as item, index}
				<a data-sveltekit-preload-data="hover" href="{item.url}" on:mousemove={activate} on:mouseout={activate} class:active-show={item.active} on:click={activate} index={index} class="active before:bg-indigo-900 w-fit poppins text-lg h-fit p-2 text-indigo-900 rounded-lg font-bold bg-white justify-center items-center flex flex-wrap cursor-pointer gap-2">
					{@html item.icon}
					{item.name}
				</a>
			{/each}
		{/if}
	</div>
	<div class="justify-center w-[30%] items-center flex flex-wrap gap-[5px]">
		<div profile class="shadow-md relative cursor-pointer justify-center items-center flex flex-wrap w-[50px]  border-b-2 border-r-2 border-indigo-900 h-[50px] rounded-full bg-indigo-500">
			
			<div profile class:show-about={config.showAboutProfile} class="about absolute bottom-[-130px] bg-white z-20 shadow-md justify-center items-center flex flex-wrap rounded-lg w-[150px] h-[100px]">
				<div profile class="absolute top-[-10px] w-[20px] h-[20px] rotate-45 bg-white">
					
				</div>
			</div>
		</div>
	</div>
</div>