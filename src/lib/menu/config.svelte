<script type="text/javascript">
	import "@material/web/select/outlined-select"
	import "@material/web/select/select-option"
	import "@material/web/button/filled-button"
	import "@material/web/textfield/outlined-text-field"
	import {devicesMedia as dm} from "../component/store.js"
	import {onMount} from "svelte"

	// export let username = "";
	let videoSelectElement;
	let audioSelectElement;
	let devicesMedia = {
		video: [],
		audio: []
	};
	dm.subscribe(d =>{
		if("video" in d && "audio" in d){
			devicesMedia = d;
		}
	});

	export let config = {};
	onMount(_=>{
		config = {
			video:{
				deviceId: ""
			},
			audio:{
				deviceId: ""
			}
		}
	})

</script>
<div class="w-full h-full flex items-center justify-start flex-col">

	<div class="w-full h-[100px] flex items-center text-2xl poppins flex-col justify-center shadow-md">
		Audio and video
	</div>

	{#if devicesMedia.video.length > 0}
		<div class="flex w-full h-fit border-b-[1px] border-b-indigo-300 bg-indigo-100 px-2 py-4 justify-start items-center gap-[20px]">
			<span class="w-[100px] text-center font-bold text-indigo-900 uppercase">video</span>
			<md-outlined-select bind:this={videoSelectElement} on:change={e =>{
				config.video.deviceId = e.target.value;
			}} style="width:calc(100% - 100px);">
			  <!-- <md-select-option aria-label="blank"></md-select-option> -->
			  {#each devicesMedia.video as item, index}
			  	  <md-select-option selected value="{item.deviceId}">
				    <div class="poppins" slot="headline">{item.label}</div>
				  </md-select-option>
			  {/each}
			</md-outlined-select>
		</div>
	{/if}

	{#if devicesMedia.audio.length > 0}
		<div class="flex w-full h-fit border-b-[1px] border-b-indigo-300 bg-indigo-100 px-2 py-4 justify-start items-center gap-[20px]">
			<span class="w-[100px] text-center font-bold text-indigo-900 uppercase">Audio</span>
			<md-outlined-select bind:this={audioSelectElement} on:change={e =>{
				config.audio.deviceId = e.target.value;
			}} style="width:calc(100% - 100px);">
			  <!-- <md-select-option aria-label="blank"></md-select-option> -->
			  {#each devicesMedia.audio as item, index}
			  	<md-select-option selected value="{item.deviceId}">
				    <div class="poppins" slot="headline">{item.label}</div>
				  </md-select-option>
			  {/each}
			</md-outlined-select>
		</div>
	{/if}

	<!-- <div on:change={d =>{
		// console.log(d.target.value)
	}} class="flex w-full h-fit border-b-[1px] border-b-indigo-300 bg-indigo-100 px-2 py-4 justify-start items-center gap-[20px]">
		<span class="w-[100px] text-center font-bold text-indigo-900 uppercase">username</span>
		<md-outlined-text-field value="" on:input={e => username = e.target.value} style="width:calc(100% - 100px);" label="username"/>
	</div> -->

</div>
