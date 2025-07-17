import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure'; // your axiosSecure hook
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaStar } from 'react-icons/fa';

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Demo mode: load local JSON instead of backend
    fetch('/demo-feedback.json')
      .then(res => res.json())
      .then(data => setFeedbacks(data))
      .catch(console.error)
      .finally(() => setLoading(false));

    // Uncomment below for production backend call
    /*
    axiosSecure.get('/feedbacks')
      .then(res => setFeedbacks(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
    */
  }, [axiosSecure]);

  if (loading) {
    return (
      <section className="py-12 px-4">
        <Skeleton height={200} count={3} style={{ marginBottom: '1rem' }} />
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-base-100 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">What Students Say</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {feedbacks.map(({ _id, userName, userPhoto, classTitle, comment, rating }) => (
          <SwiperSlide key={_id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={userPhoto}
                alt={`${userName} avatar`}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{userName}</h3>
                <p className="text-sm text-gray-500">{classTitle}</p>
              </div>
            </div>
            <p className="mb-4 text-gray-700 italic h-20">"{comment}"</p>
            <div className="flex gap-1 text-yellow-400">
              {[...Array(rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeedbackSection;
