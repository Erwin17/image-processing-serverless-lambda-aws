'use strict';
const OperationS3 = require('./functions/OperationS3');
const factoryProcessing = require('./functions/FabricaProcesamiento');

module.exports.handler = async (event) => {
  
    console.log("Eventos de entrada: \n", JSON.stringify(event));

    var srcBucket = event.Records[0].s3.bucket.name;
    var srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    var dstBucket = srcBucket + "-output";
    var dstKey = "output-" + srcKey;

        //Validamos que el bucket en entrada no sea igual al de la salida
        if (srcBucket == dstBucket) {
            return "Los cubos de origin y destino son los mismos";
        }

        
        console.log("Buscando el tipo de imagen: ");
        var typeMatch = srcKey.match(/\.([^.]*)$/);
        if (!typeMatch) {
            return "No se determino el tipo de imagen";
        }

        var imageType = typeMatch[1];
        console.log("Para mantenerlo simple, solo aceptaremos tipos de imágenes png o jpeg");
        if (imageType != "jpg" && imageType != "png") {
            return `No se soporta el tipo de imagen: ${imageType}`;
        }

        console.log("Primero descargaremos la imagen de S3, luego la transformaremos para luego almacenarla en el depósito S3 de destino.");

        const operationS3 = new OperationS3();

        //Obtenemos el archivo desde S3
        const data = await operationS3.getFileToS3(srcBucket, srcKey);

        //Aplicamos cambio de imagen
        const buffer = await factoryProcessing(data);

        if(!buffer) throw Error("Error en el procesamiento de la imagen");
        
        //Subimos el archivo a S3
        const result = await operationS3.uploadFileToS3(dstBucket, dstKey, buffer, imageType);
        console.log(result);
        return result;
        
};
