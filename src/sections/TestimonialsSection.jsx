export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote:
        "Ethan completely transformed our website. The design felt modern, clean, and exactly aligned with our brand — and the whole process was smooth from start to finish.",
      name: "Sophie Marlowe",
      role: "Marketing Lead",
    },
    {
      id: 2,
      quote:
        "Working with Ethan was effortless. He understood our vision immediately and delivered a site that not only looks great but actually converts. Highly recommended!",
      name: "Gabriel Nunes",
      role: "Product Manager",
    },
    {
      id: 3,
      quote:
        "Great attention to detail and outstanding communication throughout the project. Our new portfolio represents our agency perfectly.",
      name: "Marcus Vance",
      role: "Creative Director",
    },
  ];

  return (
    <section className="bg-gray-100 py-20 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-2xl font-medium text-gray-900 mb-8">
          Testimonials
        </h2>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-gray-200/70 border border-gray-300/40 rounded-3xl p-8 flex-shrink-0 w-[85%] md:w-[320px] flex flex-col justify-between snap-start"
            >
              {/* Quote Text */}
              <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-8">
                {item.quote}
              </p>

              {/* Client Info */}
              <div>
                <h3 className="text-gray-900 font-semibold text-base">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm mt-0.5">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}