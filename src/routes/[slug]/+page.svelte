<svelte:options accessors />
<script type="text/javascript">
	import {onMount} from "svelte"
	import MessagePrompt from "$lib/component/message-prompt.svelte"
	import VideoFrame from "$lib/component/video-frame.svelte"
	import Config from "$lib/menu/config.svelte"
	import Dialog from "$lib/component/confirm-dialog.svelte"
	import RegisterDialog from "$lib/component/register-dialog.svelte"
	import {devicesMedia as dm, constraintMediaDevices as cmd} from "$lib/component/store.js"
	export let data;
	
	let config = {};
	let closeRegister = false;
	let videoFrameConfig = {};

	let userVideo,confirmValue;
	let confirmCall;
	let callUsername = "";
	
	let me = null;
	let myStream;
	let isWsOpen = false;
	let username = "";
	const ws = new WebSocket(`wss://${location.hostname}:8080`);

	// get navbar height
	let nb = {height: 0}
	const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
	const peerConnection = new RTCPeerConnection(configuration);
	let navigationSize = {
		height: 90 /*in px*/
	}
	
	$: (()=>{
		dm.set(videoFrameConfig)
		if(myStream instanceof MediaStream){
			const [videoTrack] = myStream.getVideoTracks();
			
			// const sender = peerConnection
			// .getSenders().find((s) => s.track.kind === videoTrack.kind);
			// if(sender){
			// 	sender.replaceTrack(videoTrack);
			// }
		}
	})();
	$: cmd.set(config);

	function onClick({event,data,indexOfMenu}){
		if(data.iconState >= data.icon.length-1){
			menu[indexOfMenu].iconState = 0;
			return;
		}
		menu[indexOfMenu].iconState++;
	}
	
	// async function makeCall() {
	// 	if(myStream instanceof MediaStream){
	// 		myStream.getTracks().forEach(track => {
	// 		    peerConnection.addTrack(track, myStream);
	// 		});
	// 	}
	//     const offer = await peerConnection.createOffer();
	//     await peerConnection.setLocalDescription(offer);
	//     ws.send(JSON.stringify({'offer': offer,'user-id': username}));
	// }

	const menu = [
		{
			description: "Mute or unmute microphone",
			icon: [
				`<i class="fa-solid fa-microphone"></i>`,
				`<i class="fa-solid fa-microphone-slash"></i>`
			],
			iconState: 1,
			showInfo: false,
			onClick		
		},
		{
			description: "Stop video or resume video from camera",
			icon: [
				`<i class="fa-solid fa-video"></i>`,
				`<i class="fa-solid fa-video-slash"></i>`
			],
			iconState: 1,
			showInfo: false,
			onClick		
		},
		{
			description: "Manage all people in room",
			icon: [
				`<i class="fa-regular fa-user"></i>`
			],
			iconState: 0,
			showInfo: false,
			onClick		
		},
		{
			description: "Configuration",
			icon: [
				`<i class="fa-solid fa-gears"></i>`
			],
			iconState: 0,
			showInfo: false,
			onClick		
		}
	]

	function setStream(stream){
		myStream = stream;
	}

	function registerUser(_username){
		// ws.send(JSON.stringify({"registerId": _username}));
		username = _username;
		localStorage.setItem("username",username);
	}

	let allUsers = {};
	let registerError = false;

	onMount(()=>{
		
		// check if user has been register
		let prev_username = localStorage.getItem("username");
		if(prev_username){
			closeRegister = true;
			username = prev_username;
		}

		// let answerId = "",offerId = "";
		nb = navbar.getBoundingClientRect();
		// ws.onopen= _=> isWsOpen = true;
		// ws.addEventListener('message', async m => {
		//     const message = JSON.parse(m.data);
		//     if("answer" in message){
    	// 		const remoteDesc = new RTCSessionDescription(message.answer);
	    //         await peerConnection.setRemoteDescription(remoteDesc);
    	// 		answerId = message['user-id'];
    	// 	}
		//     if("offer" in message){
		//     	peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
		//         const answer = await peerConnection.createAnswer();
		//         await peerConnection.setLocalDescription(answer);
		//         ws.send(JSON.stringify({'answer': answer,'user-id': username}));
		//         offerId = message['user-id'];
		//         callUsername = offerId;
		//     }
		//     if("registerId" in message){
		//     	registerError = message['registerId'].isAvailable;
		//     	closeRegister = !registerError;
		//     }
		// });
		// peerConnection.addEventListener('track', async (event) => {
		// 	const [remoteStream] = event.streams;
		//     if(answerId.length === 0){
		//     	confirmCall.show();	    	
		// 	    confirmCall.onclose = _=>{
		// 	    	if(confirmCall.returnValue === "confirm"){
		// 		    	if(myStream !== remoteStream){	
		// 			    	allUsers = {...allUsers,[remoteStream.id]:{remoteStream,answerId,offerId}};
		// 			    	makeCall();
		// 			    }
		// 		    }else{
		// 		    	// do somenthing
		// 			}
		// 		}
		// 	}else{
		// 		if(myStream !== remoteStream){	
		// 	    	allUsers = {...allUsers,[remoteStream.id]: {remoteStream,answerId,offerId}};
		// 	    }
		// 	}

		// });

	});
</script>

<div style={`height: calc(100vh - ${nb.height + navigationSize.height}px)`} class="w-full justify-center items-center flex flex-wrap">
	
	<div class="w-[70%] h-[100%] bg-white shadow-inner flex justify-center items-center gap-2 content-center flex-wrap">
		<VideoFrame setStream={setStream} bind:config={videoFrameConfig} username={username} />
		{#each Object.keys(allUsers) as item, index}
			<VideoFrame outStream={allUsers[item].remoteStream} username={(allUsers[item].answerId.length > 0)? allUsers[item].answerId : allUsers[item].offerId} />	
		{/each}
	</div>
	<div class="w-[30%] h-[100%] bg-white flex justify-start items-center flex-col shadow-inner shadow-md">
		<Config bind:config={config} />
	</div>
</div>

<div style={`height: ${navigationSize.height}px;`} class=" w-full gap-[20px] bg-white shadow-md shadow-inner justify-center items-center flex-wrap flex">
	{#each menu as item, index}
		<div bind:this={me} on:mousemove={d => menu[index].showInfo = true} on:mouseout={d => menu[index].showInfo = false} on:click={async event =>{

			if(isWsOpen){
				await makeCall();
			}
			item.onClick({event,data:item,indexOfMenu: index});

		}} class="relative cursor-pointer rounded-full shadow-md bg-white-100 w-[60px] h-[60px] justify-center items-center flex-wrap flex text-2xl text-indigo-900 bg-indigo-100">
			{#if item.description.length > 0}
				<MessagePrompt parent={me} showMe={item.showInfo}>
					<p class="text-sm">
						{item.description}
					</p>
				</MessagePrompt>
			{/if}
			{@html item.icon[item.iconState]}
		</div>
	{/each}
</div>

<Dialog username={callUsername} bind:me={confirmCall}/>
<RegisterDialog closeRegister={closeRegister} error={registerError} onClick={user => registerUser(user)} />