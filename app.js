const express = require('express')
const app = express()
const port = 3000


app.use("/", express.static(__dirname + '/public'));


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.post('/toConvertir', (req, res) => {
	const { promisify } = require('util');
	const fs = require('fs');
	const convert = require('heic-convert');
	const regex = /HEIC$/

	// console.log(req.body)
	let arrFitxers = req.body.fitxers;
	let format = req.body.format;

	arrFitxers = (typeof arrFitxers == "string") ? [arrFitxers] : arrFitxers;
	
	(async () => {
		await Promise.all (arrFitxers.map(function(fitxer){
			(async () => {
			if (regex.test(fitxer)){

				// (async () => {
					try {
						console.log("inputBuffer")
						const inputBuffer = await promisify(fs.readFile)(`./public/fitxersHEIC/${fitxer}`);
						console.log("outputBuffer")
						const outputBuffer = await convert({
							buffer: inputBuffer, // the HEIC file buffer
							format: format,      // output format
							quality: 0.4           // the jpeg compression quality, between 0 and 1
						});
		
						console.log("gravacio a fitxer");
						await promisify(fs.writeFile)(`./public/fitxersHEIC/fitxersConvertits/${fitxer}.${format}`, outputBuffer);
						console.log("Fitxer convertit\n -----------------\n")
							
					} catch (error) {
						console.log(error)
					}

				// })();
		
			} else {
				console.log( `${fitxer}: NO és un fitxer HEIC` )
			}
			})();

		}));

		res.send('Fitxers convertits!')
	})();

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})