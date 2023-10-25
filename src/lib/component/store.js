import {writable} from "svelte/store"

export const showAdditionalMenu = writable(true);
export const devicesMedia = writable({
	video: [],
	audio: []
});

export const constraintMediaDevices= writable({
    'audio': {
    	'echoCancellation': true,
    	'deviceId': ""
    },
    'video': {
        'deviceId': ""
    }
})