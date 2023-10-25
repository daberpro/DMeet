<script type="text/javascript">
	import BG from "../../Simple Shiny.svg"
	const about = [
		{
			title: "Local Communication",
			description: "With local communication, we can provide more services, and optimize our time and resource"
		},
		{
			title: "Real-Time",
			description: "Real time data transfer between to client or more!, with WebRTC and websocket"
		},
		{
			title: "Custom Black Board",
			description: "Add matematical function to your meet and customize any function an UI using plugin and API"
		}
	]
</script>
<style type="text/css">
	.mgrid{
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(300px,100%),1fr));
		gap: 20px;
		justify-content: center;
		align-content: center;
		align-items: center;
	}
</style>
<div class="w-full p-3 h-fit bg-gray-100 mgrid mt-[70px] mb-10">
	
	{#each about as item, index}
		<div class="w-[100%] h-[100%] rounded-lg">
			<div class="w-full h-[100px] bg-indigo-200 rounded-tl-lg rounded-lg flex justify-center items-center font-extrabold text-xl text-indigo-900 relative bg-no-repeat bg-cover">
				<b class="poppins">{item.title}</b>
			</div>
			<div class="bg-white w-full rounded-b-lg h-fit p-[20px] text-gray-600 text-lg tn">
				{item.description}
			</div>
		</div>
	{/each}

</div>