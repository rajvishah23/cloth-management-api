const Cloth = require('../models/clothModel');
const utilFunctions = require('../utils/utils.js');

exports.getAllClothes = async (req, res, next) => {
    try {
        const list = await Cloth.find()
        res.status(200).json({ message: "List of Clothes", list: list });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }
};

exports.getSingleCloth = async (req, res, next) => {
    const clothId = req.params.clothId;
    try {
        const cloth = await Cloth.findById(clothId)
        if (!cloth) {
            return res.status(404).json({ message: 'cloth not found!' });
        }
        res.status(200).json({ message: "Retrieved Cloth", cloth: cloth });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }

};

exports.addCloth = async (req, res, next) => {
    const errorMessage = utilFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation error', error: errorMessage });
    }
    if (!req.file) {
        return res.status(422).json({ message: 'Please add an image!' });
    }

    const cloth = new Cloth({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        photoUrl: req.file.path.replace("\\", "/") // If you are on Linux or Mac just use req.file.path
    });

    try {
        const result = await cloth.save()
        console.log('result', result);
        return res.status(201).json({
            message: "Cloth is successfully added!",
            cloth: result
        });
    } catch (error) {
        console.log('error', error);
        if (req.file) {
            utilFunctions.deleteImage(cloth.photoUrl);
        }
        res.status(500).json({ message: 'Creation failed!' });
    }
};

exports.updateCloth = async (req, res, next) => {
    const errorMessage = utilFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation failed!', error: errorMessage });
    }

    let photoUrl = req.body.image;
    if (req.file) {
        photoUrl = req.file.path.replace("\\", "/");
    }
    if (!photoUrl) {
        return res.status(422).json({ message: 'Please add an image!' });
    }

    const clothId = req.params.clothId;
    try {
        const cloth = await Cloth.findById(clothId);
        if (!cloth) {
            utilFunctions.deleteImage(req.file.path.replace("\\", "/"));
            return res.status(404).json({ message: 'Cloth not found!' });
        }
        if (photoUrl !== cloth.photoUrl) {
            utilFunctions.deleteImage(cloth.photoUrl);
        }
        cloth.title = req.body.title;
        cloth.price = req.body.price;
        cloth.description = req.body.description;
        cloth.photoUrl = photoUrl;
        const result = await cloth.save();
        res.status(200).json({ 'message': 'Modification successfully completed!', cloth: result });

    } catch (error) {
        console.log('error', error);
        if (req.file) {
            utilFunctions.deleteImage(cloth.photoUrl);
        }
        res.status(500).json({ message: 'Update failed!' });
    }

};

exports.deleteCloth = async (req, res, next) => {
    const clothId = req.params.clothId;
    try {
        const cloth = await Cloth.findById(clothId);
        if (!cloth) {
            return res.status(404).json({ message: 'cloth not found!' });
        }

        utilFunctions.deleteImage(cloth.photoUrl);
        await Cloth.findByIdAndRemove(clothId);
        res.status(200).json({ 'message': 'Deletion completed successfully!' });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Delete failed!' });
    }
};

