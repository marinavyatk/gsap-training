import { useEffect, useRef, useState } from "react";
import s from "./navbarAnimation.module.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  {
    name: "Home",
    color: "#a5a7ff",
    href: "#",
  },
  {
    name: "About",
    color: "#abd63d",
    href: "#",
  },
  {
    name: "Catalog",
    color: "#f8cd23",
    href: "#",
  },
  {
    name: "Reviews",
    color: "#df836c",
    href: "#",
  },
  {
    name: "Contacts",
    color: "#a83e67",
    href: "#",
  },
];

type NavbarAnimationProps = {
  links: { name: string; color: string; href: string }[];
};

const Navbar = (props: NavbarAnimationProps) => {
  const { links } = props;
  const root = useRef<HTMLDivElement>(null);
  const indicator1 = useRef<HTMLDivElement>(null);
  const indicator2 = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const animate = () => {
    const activeItem = document.querySelector(".active");
    if (!root.current || !activeItem) return;
    // Because the indicators have absolute positioning, it is necessary to calculate x and y relative to the navbar, not the browser window.
    const menuOffset = root.current.getBoundingClientRect();
    const { width, height, top, left } = activeItem.getBoundingClientRect();

    const settings = {
      x: left - menuOffset.x,
      y: top - menuOffset.y,
      width: width,
      // height: height,
      backgroundColor: links[active].color,
      ease: "elastic.out(.7, .7)",
      duration: 0.8,
    };

    const permanentSettings = {
      height: height,
    };

    gsap.fromTo(indicator1.current, permanentSettings, {
      ...settings,
    });

    gsap.fromTo(indicator2.current, permanentSettings, {
      ...settings,
      duration: 1,
    });
  };

  useEffect(() => {
    animate();
    window.addEventListener("resize", animate);

    return () => {
      window.removeEventListener("resize", animate);
    };
  }, [active]);

  return (
    <nav ref={root} className={s.nav}>
      {links.map((item, index) => (
        <a
          key={item.name}
          className={clsx(
            s.item,
            active === index && s.active,
            active === index && "active",
          )}
          onMouseEnter={() => {
            setActive(index);
          }}
          href={item.href}
        >
          {item.name}
        </a>
      ))}
      <div ref={indicator1} className={s.indicator} />
      <div ref={indicator2} className={s.indicator} />
    </nav>
  );
};

export const NavbarAnimation = () => {
  return (
    <div>
      <header>
        <Navbar links={navLinks} />
      </header>
      <main className={s.main}>
        <h1>Navbar Animation</h1>
        <p>
          This animation creates a smooth "liquid" background transition effect
          on link hover. It works by animating two absolutely positioned
          background containers that dynamically match the hovered link’s size
          and position. The first indicator reacts immediately, while the second
          follows with a slight delay and an elastic easing, producing a soft
          trailing or "jelly-like" motion.
        </p>
        <p>To ensure seamless behavior:</p>
        <ul>
          <li>
            Avoid large delays between the two indicators, as it may break the
            illusion of continuity, especially during initial load.
          </li>
          <li>
            Define non-animated properties like height upfront to prevent
            unwanted "jumps" due to easing effects.
          </li>
        </ul>
      </main>
    </div>
  );
};
