const TestimonialCard = ({
  content,
  author,
  rating,
  quote,
  className = "",
}) => {
  return (
    <article
      className={`flex relative flex-wrap items-end px-6 sm:px-10 pb-10 text-xl sm:text-2xl text-white rounded-3xl bg-neutral-900 min-h-[272px] w-full ${className}`}
    >
      <p className="z-0 leading-10 max-md:max-w-full">{content}</p>
      <div className="flex z-0 grow shrink gap-2.5 pl-2.5 tracking-tighter">
        <div className="self-start">
          <h3>{author}</h3>
          <img src={rating} className="mt-2 w-[85px]" alt="Rating" />
        </div>
      </div>
      <img src={quote} className="mt-2 w-[85px]" alt="Quote" />
    </article>
  );
};

export default TestimonialCard;
