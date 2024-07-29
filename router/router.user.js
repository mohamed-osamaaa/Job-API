const express = require('express');
const router = express.Router();
const multer = require('multer');
const controllerUser = require('../controlers/controllers.user');
const verifyToken = require('../middelwares/verifyToken');
const role = require('../utels/roles');
const allow = require('../middelwares/allowTo');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        const fileName = `img-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
});
const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];

    if (imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(appError.create('file must be an image', 400), false)
    }
};
const upload = multer({
    storage,
    fileFilter
});



router.route('/')
    .get(verifyToken, allow(role.ADMIN), controllerUser.getAllUsers);
router.route('/:id')
    .get(verifyToken, allow(role.ADMIN), controllerUser.getUser);
router.route('/register')
    .post(upload.single('avatar'), controllerUser.register);
router.route('/login')
    .post(controllerUser.login);
router.route('/:id')
    .delete(verifyToken, allow(role.ADMIN), controllerUser.deleteUser);

module.exports = router;
