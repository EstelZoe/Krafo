
export default function BlogCard({ title, description, image, onReadMore }) {




  return (
    <div className="group bg-white/5 p-6 rounded-2xl border border-[#F2600B22] shadow-xl hover:shadow-[0_20px_40px_rgba(242,96,11,0.3)] backdrop-blur-lg hover:-translate-y-2 transition-all duration-300">
      {/* Thumbnail */}
      <div className="bg-gradient-to-br from-[#F2600B22] to-[#ffffff0d] h-32 rounded-xl flex items-center justify-center text-xs text-orange-200 mb-4 overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover rounded-xl" />
        ) : (
          "Article Thumbnail"
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg text-white group-hover:text-[#F2600B] transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-300 mt-2">{description}</p>

      {/* Read More Button */}
     <button onClick={onReadMore} className="mt-4 px-4 py-2 text-sm font-medium text-white bg-[#F2600B] rounded-lg hover:bg-[#d84e09] focus:outline-none focus:ring-2 focus:ring-[#F2600B] focus:ring-offset-2 focus:ring-offset-black transition-all duration-300" > Read More → </button>

    </div>
  );
}
