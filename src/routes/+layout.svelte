<script type="text/javascript">
	import "../app.css"
	import {onMount} from "svelte"
	import Navbar from "$lib/component/navbar.svelte"
	import {showAdditionalMenu} from "$lib/component/store.js"
	export let data;

	$: (()=>{
		if(data.url === "meet"){
			return showAdditionalMenu.set(false)
		}
		showAdditionalMenu.set(true)
	})()
</script>

<Navbar/>
<slot/>
