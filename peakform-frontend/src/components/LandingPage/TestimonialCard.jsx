const TestimonialCard = ({
  content,
  author,
  rating,
  image,
  quote,
  className = "",
}) => {
  return (
    <article
      className={`flex relative flex-wrap items-end px-6 sm:px-10 pb-10 text-xl sm:text-2xl text-white rounded-3xl bg-neutral-900 min-h-[272px] w-full ${className}`}
    >
      <p className="z-0 leading-10 max-md:max-w-full">{content}</p>
      <div className="flex z-0 grow shrink gap-2.5 pl-2.5 tracking-tighter">
        <img
          src={image}
          className="object-contain shrink-0 w-[51px]"
          alt={author}
        />
        <div className="self-start">
          <h3>{author}</h3>
          <img src={rating} className="mt-2 w-[85px]" alt="Rating" />
        </div>
      </div>
      {quote && (
        <img
          src={quote}
          className="object-contain z-0 shrink-0 aspect-[1.42] w-[68px]"
          alt="Quote"
        />
      )}
    </article>
  );
};

export default TestimonialCard;
