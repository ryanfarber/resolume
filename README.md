# resolume
a simple interface to control the resolume arena API.

## quick start
```javascript
const Resolume = require("@ryanforever/resolume")
const resolume = new Resolume({
    port: 8080 // optional, defaults to 8080
})

resolume.play("1688874211471") // trigger a clip
```
