<script type="text/javascript">
	import "@material/web/textfield/outlined-text-field"
	import "@material/web/button/elevated-button"
	import {onMount} from "svelte"

	let username;
	export let error = false;
	export let onClick;
	export let closeRegister = false;

	function register(){
		if(typeof onClick === "function"){
			onClick(username.value);
		}
	}

	onMount(()=>{
		if(username instanceof HTMLElement){
			username.onkeydown = e =>{
				if(e.keyCode === 13){
					register();
				}
			}
		}
	})

</script>
{#if !closeRegister}
	<div class="w-full h-full bg-[rgba(0,0,0,0.25)] fixed left-0 top-0"></div>
	<div class="max-w-[320px] min-w-[300px] h-fit justify-center flex py-[30px] flex-col items-center fixed left-0 right-0 gap-3 top-0 bottom-0 m-auto bg-white shadow-md rounded-2xl">
		<md-outlined-text-field error={error} error-text="Username not available" bind:this={username} prefix-text="@" supporting-text="*Username must be create to join room" class="w-[80%]" label="Username" />
		<md-elevated-button on:click={register} class="w-[80%] uppercase">
			Register
		</md-elevated-button>
	</div>
{/if}