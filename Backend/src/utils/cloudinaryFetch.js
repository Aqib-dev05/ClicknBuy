// import {v2 as cloudinary} from 'cloudinary';
// import dotenv from 'dotenv';
// import fs from "fs";


// dotenv.config();
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const fetchAllCloudinaryImages = async () => {
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

