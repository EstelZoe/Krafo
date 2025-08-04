export default function CourseCard({ title, description, image }) {
    return (
        <div className="group relative bg-[#0e0e0e] border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-orange-500/30 transition-all duration-300 max-w-sm mx-auto">
    <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
    />
    <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2 leading-snug group-hover:text-orange-500 transition-colors">
            {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-6">
            {description}
        </p>
        <button className="w-full py-2 px-4 rounded-md bg-orange-600 text-white font-medium text-sm hover:bg-orange-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md shadow-orange-600/20">
            View Course Details
        </button>
    </div>
</div>

    );
}