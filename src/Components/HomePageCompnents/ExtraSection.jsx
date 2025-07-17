import React from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaLaptopCode, FaUserGraduate } from 'react-icons/fa6';

const ExtraSection = () => {
    return (
        <div>
            <section className="bg-base-100 py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-10 text-primary">Student Success Stories</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Arif Hossain',
                                story: 'After completing the web development class, I landed my first freelance project!',
                                image: 'https://i.pravatar.cc/150?img=3',
                            },
                            {
                                name: 'Samia Rahman',
                                story: 'The Python crash course helped me crack my university lab exam confidently.',
                                image: 'https://i.pravatar.cc/150?img=6',
                            },
                            {
                                name: 'Tariq Islam',
                                story: 'Thanks to the platform, I now work as a junior front-end developer!',
                                image: 'https://i.pravatar.cc/150?img=9',
                            },
                        ].map((student, idx) => (
                            <div key={idx} className="bg-base-200 p-6 rounded-xl shadow-md text-left">
                                <div className="flex items-center gap-4 mb-4">
                                    <img src={student.image} alt={student.name} className="w-14 h-14 rounded-full" />
                                    <h4 className="font-semibold text-lg">{student.name}</h4>
                                </div>
                                <p className="text-base-content">{student.story}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="bg-base-200 py-16 px-6 text-primary">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-10">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-base-100 p-6 rounded-xl shadow-md">
                            <FaUserGraduate className="text-4xl mb-4 mx-auto" />
                            <h4 className="text-xl font-semibold mb-2">1. Join as a Learner</h4>
                            <p>Sign up for free, browse through hundreds of classes and pick your favorite.</p>
                        </div>
                        <div className="bg-base-100 p-6 rounded-xl shadow-md">
                            <FaChalkboardTeacher className="text-4xl mb-4 mx-auto" />
                            <h4 className="text-xl font-semibold mb-2">2. Learn From the Best</h4>
                            <p>Study under expert instructors, get assignments, and complete classes at your pace.</p>
                        </div>
                        <div className="bg-base-100 p-6 rounded-xl shadow-md">
                            <FaLaptopCode className="text-4xl mb-4 mx-auto" />
                            <h4 className="text-xl font-semibold mb-2">3. Apply Your Skills</h4>
                            <p>After completing classes, use your new skills in real projects, jobs, or freelancing.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExtraSection;