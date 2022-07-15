const sharp = require('sharp');

class ProcessingImage{

    async negativeImage(body){
       return sharp(body).greyscale().toBuffer();
    }

    async tinte(body){
        return sharp(body).tint({r: 255, g: 240, b: 16}).toBuffer();
    }

    async negate(body){
        return sharp(body).negate().toBuffer();
    }

    async blur(body){
        return sharp(body).blur().toBuffer();
    }


}
module.exports = ProcessingImage;
