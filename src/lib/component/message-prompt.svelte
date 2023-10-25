<script type="text/javascript">
	import {onMount} from "svelte"
	export let showMe = false;
	export let parent;
	export let width = 200;
	let me = document.createElement("div");

</script>

<style type="text/css">
	.me{
		transition: 0.3s all;
		bottom: calc(var(--bottom) + 10px);
		opacity: 0.0;
	}

	.show-me{
		transition: 0.3s all;
		bottom: var(--bottom);
		opacity: 1.0;
	}
</style>

<div bind:this={me} style={`--bottom: ${(parent?.getBoundingClientRect() ?? {height: 100}).height+30}px;width: ${width}px;`}  class:show-me={showMe} class="absolute bottom-[30px] h-fit rounded-lg bg-white shadow-md justify-center items-center flex-col flex pb-[20px] me p-[5px]">
	<div class="absolute bg-white w-[20px] h-[20px] rotate-45 bottom-[-10px]"></div>

	<slot/>
		
</div>