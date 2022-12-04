const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

// Model
const { AccommodationImg } = require("../models/accommodationImg.model");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

// Storage service
const storage = getStorage(firebaseApp);

const uploadAccommodationImgs = async (imgs, accommodationId) => {
  // Map async -> Async operations with arrays
  const imgsPromises = imgs.map(async (img) => {
    // Create firebase reference
    const [originalName, ext] = img.originalname.split(".");

    const filename = `accommodations/${accommodationId}/${originalName}-${Date.now()}.${ext}`;
    const imgRef = ref(storage, filename);

    // Upload image to Firebase
    const result = await uploadBytes(imgRef, img.buffer);

    return await AccommodationImg.create({
      imgUrl: result.metadata.fullPath,
      accommodationId,
    });
  });

  await Promise.all(imgsPromises);
};

const getAccommodationsImgsUrls = async (accommodations) => {
  // Loop through posts to get to the postImgs
  const accommodationsWithImgsPromises = accommodations.map(
    async (accommodation) => {
      // Get imgs URLs
      const accommodationImgsPromises = accommodation.accommodationImgs.map(
        async (accommodationImg) => {
          const imgRef = ref(storage, accommodationImg.imgUrl);
          const imgUrl = await getDownloadURL(imgRef);

          accommodationImg.imgUrl = imgUrl;
          return accommodationImg;
        }
      );

      // Resolve imgs urls
      const accommodationImgs = await Promise.all(accommodationImgsPromises);

      // Update old postImgs array with new array
      accommodation.accommodationImgs = accommodationImgs;
      return accommodation;
    }
  );

  return await Promise.all(accommodationsWithImgsPromises);
};

const getAccommodationImgsUrlsbyID = async (accommodation) => {
  const accommodationImgsPromises = accommodation.accommodationImgs.map(
    async (accommodationImg) => {
      const imgRef = ref(storage, accommodationImg.imgUrl);
      const imgUrl = await getDownloadURL(imgRef);

      accommodationImg.imgUrl = imgUrl;
      return accommodationImg;
    }
  );

  const accommodationImgs = await Promise.all(accommodationImgsPromises);

  // Update old postImgs array with new array
  accommodation.accommodationImgs = accommodationImgs;
  return accommodation;
};

module.exports = {
  storage,
  uploadAccommodationImgs,
  getAccommodationsImgsUrls,
  getAccommodationImgsUrlsbyID,
};
