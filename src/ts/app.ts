import Map from './modules/Map.js'
import 'promise-polyfill/src/polyfill'


new Map();


(async () => {
   const m = await import("./modules/Vector")
         .then(m => m.default)

   const vector = new m()
   vector.pointLv()
})()

console.log('jhoss');
