import React from 'react'
import { Star } from 'lucide-react'
function RatingStars({rating=3.5,reviews=120}) {
  return (
      <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5"
              fill={i < Math.round(rating) ? "#FBBF24" : "none"}
              stroke={i < Math.round(rating) ? "#FBBF24" : "#9CA3AF"}
            />
          ))}
        </div>
        <span className="ml-1 text-[11px] text-gray-600">
          {rating.toFixed(1)} ({reviews + 1 })
        </span>
      </div>
  )
}

export default RatingStars