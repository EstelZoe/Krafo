export default function CourseCard({ course }) {
    return (
        <div
            className={`rounded-lg shadow-lg p-6 flex flex-col justify-between ${course.bg} ${course.ring}`}
        >
            {/* Image at the top */}
            {course.image && (
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
            )}

            {/* Title */}
            <h3 className={`text-xl font-bold mb-4 ${course.tierColor}`}>
                {course.title}
            </h3>

            {/* Features */}
            <ul className="mb-6 space-y-2 text-gray-300">
                {course.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>

            {/* Price */}
            {course.price && (
                <p className="text-lg font-semibold mb-4 text-white">
                    {course.price}
                </p>
            )}

            {/* Button */}
            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                Enroll Now
            </button>
        </div>
    );
}
