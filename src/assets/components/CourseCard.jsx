export default function CourseCard({ title, description, image }) {
    return (
        <div className="bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden max-w-sm mx-auto">
            <img src={image} alt={title} className="w-full h-32 object-cover" />
            <div className="p-4">
                <h3 className="text-base font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
                <button className="mt-4 bg-black text-orange-600 py-2 px-4 rounded hover:bg-orange-600 hover:text-black transition-colors duration-200 text-sm font-medium">
                    View Course Details
                </button>
            </div>
        </div>
    );
}
