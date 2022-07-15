const ProcessingImage = require('./processingImage');

var typeProcessing = process.env.typeProcessing || 'greyscale';

module.exports = factoryProcessing= (buffer)=>{

    const fabricaProcesamiento = new ProcessingImage();
    
    switch(typeProcessing){
        case 'greyscale': 
            return fabricaProcesamiento.negativeImage(buffer);
        break;
        case 'tinte' :
            return fabricaProcesamiento.tinte(buffer);
        break;
        case 'negate' :
            return fabricaProcesamiento.negate(buffer);
        break;
        case 'blur' :
            return fabricaProcesamiento.blur(buffer);
        break;
        default: 
            console.log('No existe casos para el procesamiento');
    }
    
    return null;

}