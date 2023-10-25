<script type="text/javascript">
	import {onMount} from "svelte";
	import {constraintMediaDevices as cmd} from "$lib/component/store.js"
	export let video;
	export let username = "";
	export let mediaStream = null;
	export let setStream = _=> null;
	export let outStream = null;
	export let config = {
		video: [],
		audio: []
	}

    async function getConnectedDevices(type) {
	    const devices = await navigator.mediaDevices.enumerateDevices();
	    return devices.filter(device => device.kind === type)
	}

	async function init(){
		try{
			await navigator.mediaDevices.getUserMedia({video: true, audio: true});
			const devicesVideo = await getConnectedDevices("videoinput");
			const devicesAudio = await getConnectedDevices("audioinput");
			const constraints = {
			    'audio': {
			    	'echoCancellation': true,
			    	'deviceId': devicesAudio[0].deviceId
			    },
			    'video': {
			        'deviceId': devicesVideo[0].deviceId,
		        	// 'width': {'min': 1280},
		        	// 'height': {'min': 720}
		        }
		    }
		    // watch
		    cmd.subscribe(async d =>{
		    	if(typeof d === "object" && "audio" in d && "video" in d){
		    		mediaStream = await navigator
		    		.mediaDevices.getUserMedia(d);
		    
				    if(video instanceof HTMLVideoElement){
				    	setStream(mediaStream);
				    	video.srcObject = mediaStream;
				    	video.play();
				    }
	    		}
		    })
		    mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
		    
		    if(video instanceof HTMLVideoElement){
		    	if(video.srcObject === null){
		    		video.srcObject = mediaStream;
		    		video.play();
		    	}
		    }

		}catch(err){
			console.log(err.message)
			console.log("the app need access to camera and microphone");
		}
	}

	onMount(async ()=>{
		if(outStream === null){
			await init();
			const video = await getConnectedDevices("videoinput");
			const audio = await getConnectedDevices("audioinput");
			config = {
				video,
				audio
			}
			setStream(mediaStream);
		}else{
			if(video instanceof HTMLVideoElement && outStream instanceof MediaStream){
		    	if(video.srcObject === null){
		    		video.srcObject = outStream;
		    		video.play();
		    	}
		    } 
		}
	});

</script>
<div class="rounded-sm aspect-video shadow-md bg-white w-fit relative flex justify-center items-center flex-wrap">
	
	<video bind:this={video} width={`${(1080/720) * 200}px`} class="rounded-sm">
		
	</video>
	<div class="bottom-0 absolute w-full p-3 left-0 bg-[rgba(0,0,0,0.25)] text-white poppins rounded-bl-sm rounded-br-sm">
		<b>{username}</b>
	</div>

</div>