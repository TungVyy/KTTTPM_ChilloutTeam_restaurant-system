function PageBanner({ image, title, subtitle }) {
  return (
    <section className="relative mb-7 h-[190px] overflow-hidden rounded-2xl border border-line shadow-sm flex items-center justify-center">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-[#9ccbc0]/65 to-black/15" />
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-handwritten text-[#2c4740] font-normal leading-tight drop-shadow-sm">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 text-base md:text-xl font-handwritten text-[#3c5950] font-medium opacity-90">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export default PageBanner;
