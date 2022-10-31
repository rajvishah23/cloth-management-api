const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

/**
 * This method deletes in the images folder, the image whose
 * the URL was passed to it as a parameter
 */
exports.deleteImage = (filePath) => {
    filePath = path.join(__dirname, '..', filePath);
    console.log(filePath);
    // setTimeout(() => { //I used it to clearly see the deletion of the image
    fs.unlink(filePath, error => {
        if (error) throw error;
        console.log('img was deleted');
    });
    // }, 3000);
};

/**
 * This method allows to validate the fields sent by the user.
 */
exports.validators = (req) => {
    let errorMessage = null;
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        console.log('VALIDATION ERROR', validationErrors.array()[0]);
        errorMessage = validationErrors.array()[0].msg;
        if (req.file) {
            this.deleteImage(req.file.path.replace("\\", "/"));
        }

    }
    return errorMessage;
}

