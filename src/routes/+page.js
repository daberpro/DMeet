export const ssr = false

export function load({params}){
	return {
		url: params.slug
	}
}