const functions = require("firebase-functions");
const os = require("os");
const path = require("path");
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require("fs");

const gcconfig = {
  projectId: "bt3103-e1798",
  keyFilename: "bt3103-e1798-d576a0b5acbb.json"
};

const {Storage} = require("@google-cloud/storage");
const gcs= new Storage(gcconfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
functions.logger.info("Hello logs!", {structuredData: true});
response.send("Hello from Firebase!");
 });

exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "Not allowed"
      });
    }
    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", () => {
      const bucket = gcs.bucket("bt3103-e1798.appspot.com");
      bucket
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
          .then(async (data) => {
              const file = data[0];
              const signedUrlData = await file.getSignedUrl({ action: 'read', expires: '03-17-2025' });
              const url = signedUrlData[0];
              res.status(200).json({
                  message: "It worked!", url: url
              });
	return true;
        })
          .catch(err => {
            console.log(err)
          res.status(500).json({
            error: err
          });
        });

    });
    busboy.end(req.rawBody);
  });
});