import Link from "next/link";
import { services } from "@/content/services";
import { cloth } from "./cloth";
import { THREAD_HEIGHT } from "./threadHeight";

const CHAR_WIDTH = 7.5; // rough width of one spine letter, in px
const LINE_WIDTH = 19;

// Book sizes are varied but fixed, so server and browser always agree. A title too
// long for its spine wraps onto a second line, which makes that book thicker.
function spineSize(index: number, title: string) {
  const height = 244 + ((index * 53) % 7) * 11;
  const room = height - 84; // keep clear of the foil bands and the stitch
  const lines = Math.ceil((title.length * CHAR_WIDTH) / room);
  const width = lines * LINE_WIDTH + 18 + ((index * 29) % 4) * 3;
  return { height, width };
}

export function Shelf() {
  return (
    <div data-shelf className="relative z-10">
      <div className="overflow-x-auto pt-4 [scrollbar-width:thin]">
        <ul className="page relative flex w-max min-w-full items-end gap-[2px] !max-w-none xl:!px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {/* The thread runs behind the books. It only shows between them and on each stitch. */}
          <li aria-hidden className="absolute inset-x-0 right-3 h-0.5 bg-gold" style={{ bottom: THREAD_HEIGHT }} />
          {services.map((service, index) => {
            const { height, width } = spineSize(index, service.title);
            const style = cloth[service.category];
            return (
              <li key={service.slug} className="relative" style={{ flex: `${width} 0 ${width}px` }}>
                <Link
                  prefetch={false}
                  href={`/services/${service.slug}`}
                  title={service.shortDescription}
                  style={{ height }}
                  className={`spine relative flex w-full justify-center overflow-hidden rounded-t-[3px] pb-[58px] pt-5 ${style.surface}`}
                >
                  <span aria-hidden className={`absolute inset-x-0 top-2.5 h-px ${style.foil}`} />
                  <span
                    className="display-small relative text-[0.92rem] leading-[1.25] [writing-mode:vertical-rl]"
                    style={{ maxHeight: height - 78 }}
                  >
                    {service.title}
                  </span>
                  {/* Every other book carries a visible stitch, so the thread reads as sewn through. */}
                  {index % 2 === 0 && (
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 h-0.5 ${style.foil}`}
                      style={{ bottom: THREAD_HEIGHT }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div aria-hidden className="h-3 bg-ink-green shadow-[0_10px_18px_-8px_rgb(31_59_45/0.5)]" />
    </div>
  );
}
