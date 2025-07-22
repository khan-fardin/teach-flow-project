import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Loading from '../Loading';

const MyEnrolledClasses = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: enrollments = [], isLoading, isError } = useQuery({
        queryKey: ['enrolled-classes', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data: enrolledList } = await axiosSecure.get(`/enrollments?email=${user.email}`);
            const classInfoRequests = enrolledList.map((item) =>
                axiosSecure.get(`/classes/by-classId/${item.classId}`)
            );

            const classInfos = await Promise.all(classInfoRequests);

            return enrolledList.map((enroll, i) => ({
                ...enroll,
                classInfo: classInfos[i].data,
            }));
        }
    });

    if (isLoading) return <Loading />;
    if (isError) return <p className="text-center text-lg py-10 text-red-500">Failed to load enrolled classes.</p>;
    if (enrollments.length === 0) return <p className="text-center text-lg py-10">No classes enrolled yet.</p>;

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
            <Helmet>
                <title>My Classes</title>
            </Helmet>
            {enrollments.map((item) => (
                <div key={item._id} className="bg-white rounded-2xl shadow-md p-4">
                    <img
                        src={item.classInfo?.image || 'https://img.freepik.com/premium-vector/loading-bar-bottoms-set-design_302792-78.jpg?w=826'}
                        alt={item.classInfo?.title}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <h3 className="text-xl font-semibold">{item.classInfo?.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                        <span className="font-medium">Instructor:</span> {item.classInfo?.teacherName}
                    </p>
                    <Link
                        to={`/dashboard/my-enrolled-class/${item.classId}`}
                        className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                    >
                        Continue
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default MyEnrolledClasses;
