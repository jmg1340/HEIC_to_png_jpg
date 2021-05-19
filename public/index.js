
document.addEventListener("DOMContentLoaded", function(event){



	//Convert the main image in a HEIC to JPEG


	funcHeic2JPG = function(HeicFile) {

		const { promisify } = require('util');
		const fs = require('fs');
		const convert = require('heic-convert');

		(async () => {
			const inputBuffer = await promisify(fs.readFile)(HeicFile);
			const outputBuffer = await convert({
				buffer: inputBuffer, // the HEIC file buffer
				format: 'JPEG',      // output format
				quality: 1           // the jpeg compression quality, between 0 and 1
			});

			await promisify(fs.writeFile)(`./fitxersHEIC/fitxersConvertits/${HeicFile}.jpg`, outputBuffer);
		})();

	}

	funcHeic2PNG = function (HeicFile) {
		const { promisify } = require('util');
		const fs = require('fs');
		const convert = require('heic-convert');

		(async () => {
			const inputBuffer = await promisify(fs.readFile)(HeicFile);
			const outputBuffer = await convert({
				buffer: inputBuffer, // the HEIC file buffer
				format: 'PNG'        // output format
			});

			await promisify(fs.writeFile)(`./fitxersHEIC/fitxersConvertits/${HeicFile}.png`, outputBuffer);
		})();
	}

	var format = null
	posarVermell = function(format) {
		var btJPG = document.getElementById("labelJPG")
		var btPNG = document.getElementById("labelPNG")

		if (format === 'png') {
			format = "png"
			btJPG.classList.remove("btn-danger")
			btJPG.classList.add("btn-secondary")
			btPNG.classList.remove("btn-secondary")
			btPNG.classList.add("btn-danger")
		}
		if (format === 'jpg') {
			format = "jpg"
			btJPG.classList.remove("btn-secondary")
			btJPG.classList.add("btn-danger")
			btPNG.classList.remove("btn-danger")
			btPNG.classList.add("btn-secondary")
		}

	}






})