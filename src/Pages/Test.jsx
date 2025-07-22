import React, { useState } from 'react';
import ReactStars from 'react-stars';

const Test = () => {
  const [rating, setRating] = useState(3.5); // Default rating

  return (
    <div className="flex flex-col items-center min-h-screen justify-center p-8">
      {/* Vertical Stars */}
      <div className="flex flex-col items-center gap-4">
        <ReactStars
          count={5}
          value={rating}
          onChange={(newRating) => setRating(newRating)}
          size={40}
          color2="#ffd700" // Filled stars (gold)
          color1="#e0e0e0" // Empty stars (light gray)
          half={true}      // Enable half-star selection
        />
        <p className="text-xl mt-4">
          Current Rating: <span className="font-bold">{rating}</span>
        </p>
      </div>
    </div>
  );
};

export default Test;