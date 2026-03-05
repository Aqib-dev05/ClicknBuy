// import fs from "fs"
// import {fetchAllCloudinaryImages} from "./cloudinaryFetch.js";

// // do not invoke automatically; let callers decide when to fetch

// (async () => {
//     try {
//         console.log('Starting Cloudinary fetch test...');
//         const images = await fetchAllCloudinaryImages();
//         const transformedImages = images.reduce((acc, img) => {
//             // Only keep relevant fields to reduce file size
//             acc.push({
//                 asset_folder: img.asset_folder,
//                 images: {
//                     url: img.secure_url,
//                     public_id: img.public_id,
//                 }
//             });
//             return acc;
//         }, []);
        
//         fs.writeFileSync('cloudinary_images.json', JSON.stringify(transformedImages, null, 2));
         

//         console.log('Fetched', transformedImages.length, 'images from Cloudinary');
//         // Uncomment below to inspect result data
//     } catch (err) {
//         console.error('Test failed with error:', err);
//     }
// })();