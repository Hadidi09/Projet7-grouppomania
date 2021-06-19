const multer = require('multer')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) =>
    {
        // console.log(file);
        // console.log(req);
        callback(null, './uploads')
    },

    filename: (req, file, callback) =>
    {
        // console.log(req);
        // console.log(file);
        // const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype]
        callback(null, Date.now() + "." + extension)
    },
})

const upload = multer({ storage: storage})

module.exports = upload;