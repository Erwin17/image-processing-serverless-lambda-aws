const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var s3 = new AWS.S3({apiVersion: '2006-03-01'});


class OperationS3{

    async getFileToS3(bucketName, fileName){
        const params = {
            Bucket: bucketName, 
            Key: fileName
        };
        
        try{
            const objectFile = await s3.getObject(params).promise();
            return objectFile.Body;
        }catch(err){
            throw Error("Error obteniendo el archivo desde S3", err);
        }
    }

    async uploadFileToS3(bucketName, fileName, buffer, contentType){
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: buffer,
            contentType: contentType
        };

        console.log("params", params);
        
        try{
            await s3.upload(params).promise().then(function(data){
                console.log("file upload successfully");
            }, function(err){
                console.log("error", err);
            });
        }catch(err){
            throw Error("Error en la subida del archivo: ", err);
        }
        return "Archivo subido exitosamente";
    }
}

module.exports = OperationS3;