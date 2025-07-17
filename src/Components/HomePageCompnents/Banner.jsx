import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80',
      title: 'Learn From Expert Instructors',
      description: 'Join thousands of students mastering new skills',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      title: 'Expand Your Knowledge',
      description: 'Discover courses in various disciplines',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      title: 'Teach What You Love',
      description: 'Share your expertise with eager learners',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl shadow-lg">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 h-[500px] md:h-[600px] relative"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center justify-center">
              <div className="text-center text-white px-6 max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-2xl font-medium">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
              currentSlide === index
                ? 'bg-white border-white scale-125'
                : 'bg-gray-400 border-transparent'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          setCurrentSlide((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
          )
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-900 p-2 rounded-full transition"
        aria-label="Previous Slide"
      >
        ❮
      </button>
      <button
        onClick={() =>
          setCurrentSlide((prev) =>
            prev === slides.length - 1 ? 0 : prev + 1
          )
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-900 p-2 rounded-full transition"
        aria-label="Next Slide"
      >
        ❯
      </button>
    </div>
  );
};

export default Banner;
