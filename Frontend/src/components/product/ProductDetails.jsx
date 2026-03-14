import React from "react";
import RatingStars from "./RatingStars";

function ProductDetails() {
  return (
    <section>
      <div className="left"></div>
      <div className="right">
        <h2 className="text-xl mb-3 font-semibold">Havic HV I phone 13</h2>
        <RatingStars />
        {/* Price */}
        <div className="mt-1 flex items-center gap-2 text-lg">
          <span className="font-medium text-xl my-1 ">
            {/* ${discountedPrice ?? basePrice ?? 120} */}${120}
          </span>
          {/* {basePrice && (
          <span className="text-xs text-gray-400 line-through">
            ${basePrice}
          </span>
        )} */}
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          mollitia dolorem aliquam quibusdam, repudiandae voluptatibus
          dignissimos? Sit, omnis velit.
        </p>
      </div>
    </section>
  );
}

export default ProductDetails;
