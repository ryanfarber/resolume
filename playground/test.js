// test.js

const Resolume = require("../src")
const r = new Resolume({
	debug: true
})

// r.getComposition().then(console.log)
// r.findLayer("cameras").then(console.log)
r.play("1665269579976")