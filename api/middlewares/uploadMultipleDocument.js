/* 
    -   IMPORTING MODULES
*/
const multer = require("multer");
const fs = require("fs");

/* MULTER FUNCTIONS */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, "public/documents/");

    },
    filename: (req, file, cb) => {
        try {

            const date = Date.now()
            /* IF FILE ALREADY EXISTS, DELETE THE PREVIOUS FILE */
            const fullFilePath = `./public/documents/${date}-${file.originalname}`;
 
            /* 
              IF A FILE IN THE GIVEN DIRECTORY DOES NOT EXIST
              ,THEN CREATE A NEW FILE THERE OTHERWISE LEAVE AS IT IS
            */

            fs.mkdirSync("public/documents/", { recursive: true });

            req.fileName = `${file.originalname}`;
 
            let fileName = req.fileName;
 
            req.fullFilePath = fullFilePath;
 
            cb(null, date + '-' + fileName);
        } catch (error) {
            console.log("error in uploading document", error);
        }
    }
});

const limits = {
    fileSize: (1024 * 1024)*5 // 1MB
};

const fileFilter = (req, file, cb) => { 

    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/svg+xml" ||
        file.mimetype === "text/plain" ||
        file.mimetype === "text/html" ||
        file.mimetype === "text/javascript"

    ) {
        cb(
            new Error(
                "ERROR: You are trying to upload a file with unsupported file type. Images are not supported."
            ),
            false
        );

    } else {

        cb(null, true);

    }
};

/* INITIALIZING MULTER */
const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
