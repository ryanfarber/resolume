// resolume.js

const axios = require("axios")
const {Source, Layer, Clip, Composition} = require("./schemas.js")
const Logger = require("@ryanforever/logger").v2



class Resolume {
	constructor(config = {}) {

		const logger = new Logger(__filename, {debug: config.debug})
		const port = config.port || 8080
		axios.defaults.baseURL = `http://localhost:${port}/api/v1`


		/** test */
		this.test = async() => {
			logger.debug("testing...")
			let res = await axios.get("/product")
			console.log(`connected to resolume @ ${axios.defaults.baseURL}`)
			let data = res.data
			console.log(data)
			return data
		}

		/** sources */
		this.sources = async() => {
			let res = await axios.get("/sources")
			let data = res.data
			return data
		}

		/** composition */
		this.composition = async() => {
			logger.debug("getting composition...")
			let res = await axios.get("/composition")
			let raw = res.data
			// console.log(data)
			let composition = new Composition(raw)
			// let layers = data.layers.map(x => new Layer(x))
			// console.log(layers)
			return composition
		}
		this.getComposition = this.composition

		this.layer = async(layerIndex) => {
			let res = await axios.get(`/composition/layers/${layerIndex}`)
			let raw = res.data
			let layer = new Layer(raw)
			return layer
		}

		/** find layer */
		this.findLayer = async(id) => {
			let comp = await this.composition()
			let layers = comp.layers
			let layer = layers.find(x => x.name.toLowerCase() == id || x.id == id)
			return layer
		}

		this.play = async(id) => {
			logger.debug(`playing clip ${id}...`)
			let res = await axios.post(`/composition/clips/by-id/${id}/connect`)
		}
		this.connect = this.play

		this.clearLayer = async(id) => {
			logger.log(`clearing layer "${id}"`)
			let layer = await this.findLayer(id)
			let layerId = layer.id
			// console.log(layer)
			let res = await axios.post(`/composition/layers/by-id/${layerId}/clear`)
		}
	}
}



module.exports = Resolume