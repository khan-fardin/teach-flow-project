import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaStar } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const FeedbackSection = () => {
  const axiosSecure = useAxios();

  const { data: feedbacks = [], isLoading, isError, error } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      const res = await axiosSecure.get('/feedback');
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 2, // Retry failed requests twice
  });

  if (isLoading) {
    return (
      <section className="py-12 px-4">
        <Skeleton height={100} count={3} style={{ marginBottom: '1rem' }} />
      </section>
    );
  };

  if (isError) {
    return <div>Error loading feedback: {error.message}</div>;
  }

  return (
    <section className="py-12 px-4 bg-base-100 rounded-2xl max-w-6xl mx-auto">
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
        {feedbacks.map(({ _id, student, image, className, comment, rating }) => (
          <SwiperSlide key={_id} className="bg-base-200 p-6 rounded-lg shadow-md my-2">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={image || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1753123007~exp=1753126607~hmac=3ac9fba701468e51f6fcc2db04f7c865d4f97fd0a7d39013b78c212dffa811dc&w=826"}
                alt={`${student} avatar`}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{student}</h3>
                <p className="text-sm text-gray-500">{className}</p>
              </div>
            </div>
            <p className="mb-4 text-gray-500 italic h-20">"{comment}"</p>
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
