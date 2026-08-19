export default function PhotoGalleryMarquee() {
  // Sample placeholder photos
  const photos = [
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80",
  ];

  return (
    <div className="w-full overflow-hidden py-6 select-none">
      <div className="animate-marquee flex gap-4">
        {/* Unang Loop */}
        {photos.map((src, idx) => (
          <div
            key={`photo1-${idx}`}
            className="w-64 h-40 sm:w-80 sm:h-52 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-300 shadow-sm"
          >
            <img
              src={src}
              alt="Gallery item"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        ))}
        {/* Duplicate Loop para sa seamless infinite scroll */}
        {photos.map((src, idx) => (
          <div
            key={`photo2-${idx}`}
            className="w-64 h-40 sm:w-80 sm:h-52 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-300 shadow-sm"
          >
            <img
              src={src}
              alt="Gallery item"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}