export default function FaqList({ items, heading = 'Questions MSPs ask' }) {
  return (
    <section aria-label={heading} className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-brand-700 md:text-4xl">{heading}</h2>
          <div className="mt-8 divide-y divide-brand-100 border-y border-brand-100">
            {items.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none font-semibold text-brand-700">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-brand-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
