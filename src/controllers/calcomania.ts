import { Request, Response } from 'express';
import { formatFinalError } from '../helpers/error-messages';
import Calcomania from '../models/calcomania';
import { generateQRCode } from '../utils/barchode';

export const obtenerCodigoQR = async (req: Request, res: Response) => {
	try {

		const { _id } = req.params;

		const computadora = await Calcomania.findById(_id);

		// const imageCanvas = generateCodeBar( computadora!._id.toString() );

		const imageCanvas = await generateQRCode(
			`${process.env.BASE_URL}/calcomania?calcomaniaId=${computadora!._id.toString()}`
		);

		//create the headers for the response
		//200 is HTTTP status code 'ok'
		res.writeHead(
			200,
			//this is the headers object
			{
				//content-type: image/png tells the browser to expect an image
				"Content-Type": "image/jpeg",
			}
		);

		//ending the response by sending the image buffer to the browser
		res.end(imageCanvas.toBuffer('image/jpeg'));


	} catch (error) {
		console.log(error);

		res
			.status(500)
			.json(formatFinalError(error, 'No se pudo crear computadora'))
	}
}