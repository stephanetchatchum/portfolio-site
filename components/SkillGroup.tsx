// One row of the toolkit panel: a practice area and what sits inside it.
export default function SkillGroup({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="grid gap-3 px-6 py-5 sm:grid-cols-[13rem_1fr] sm:gap-8 sm:py-6">
      <h3 className="text-[1rem] font-medium tracking-[-0.01em] text-ink">
        {title}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-[3px] border border-line bg-vacuum/50 px-2.5 py-1 font-mono text-[0.8125rem] text-muted"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
