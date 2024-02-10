const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) =>{
        cb(null, req.userId + file.originalname + file.fieldname);
    }
})

const tipoviFilter = (req, file, cb) => {
    const tipovi = ["image/png", "image/jpeg", "image/jpg"];
    if(file && tipovi.includes(file.mimetype)){
        return cb(null, true);
    }
    return cb(null, false);
}

const upload = multer({storage: storage, filter: tipoviFilter});

module.exports = upload;

