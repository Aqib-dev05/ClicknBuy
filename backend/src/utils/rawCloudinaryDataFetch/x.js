// import {v2 as cloudinary} from 'cloudinary';
// import dotenv from 'dotenv';
// import fs from "fs"

// dotenv.config();
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

//  const fetchAllCloudinaryImages = async () => {
//     try {
//         // Cloudinary only returns a maximum of 500 items per request.
//         // This helper will paginate through all results using next_cursor
//         // and merge them into a single array.
//         let allResources = [];
//         let nextCursor;

//         do {
//             const result = await cloudinary.api.resources({
//                 type: 'upload',
//                 max_results: 500,
//                 next_cursor: nextCursor,
//             });

//             if (result && Array.isArray(result.resources)) {
//                 allResources = allResources.concat(result.resources);
//             }
//             nextCursor = result.next_cursor;
//         } while (nextCursor);

//         return allResources;
//     } catch (error) {
//         console.error('Error fetching Cloudinary images:', error);
//         throw error; // propagate so callers can handle it
//     }
// };

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