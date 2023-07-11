// schemas.js

class Composition {
	constructor(d = {}) {
		this.name = d.name.value
		this.width = d.video.width
		this.height = d.video.height
		this.layers = d.layers.map((x, i) => new Layer(x, i)).reverse()
		this.columns = d.columns.map(x => new Column(x))
		this.raw = {}

		Object.defineProperty(this, "raw", {get(){return d}})
	}
}

class Source {
	constructor(d = {}) {
		this.name = d.name
		this.id = d.idstring
		this.presets = d.presets || []
	}
}


class Layer {
	constructor(d = {}, index) {
		this.name = d.name.value
		this.index = index + 1
		this.id = d.id
		this.clips = d.clips.map((x, i) => new Clip(x, i))
		this.raw = {}

		Object.defineProperty(this, "raw", {get(){return d}})
	}
}

class Column {
	constructor(d = {}) {
		this.name = d.name.value
		// console.log(d)
		this.id = d.id
	}
}

class Clip {
	constructor(d = {}, index) {
		this.name = d.name.value || undefined
		this.index = index + 1
		this.id = d.id
		this.trigger
	}
}




module.exports = {Source, Layer, Clip, Composition}