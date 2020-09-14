let Url = 'http://www.zgkayida.com/'
const httpRequest = (opts, data, method) => {
	let httpDefaultOpts = {
		url: Url + opts,
		data: data,
		method: method
	}
	let promise = new Promise(function(resolve, reject){
		uni.request(httpDefaultOpts).then(
			res => {
				resolve(res[1])
			}
		).catch(
			response => {
				reject(response)
			}
		)
	})
	return promise
};

export default {
	Url,
	httpRequest
}