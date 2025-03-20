import { clsx } from "clsx";
import { ComponentPropsWithoutRef } from "react";
import s from "./card.module.scss";
import Arrow from "../../assets/arrow.svg?react";
import { Link } from "react-router";

type CardTheme = "light" | "dark" | "color";

type CardProps = {
  header: string;
  image: string;
  variant?: CardTheme;
  link: string;
} & ComponentPropsWithoutRef<"a">;

export const Card = (props: CardProps) => {
  const {
    header,
    image,
    variant = "light",
    link,
    className,
    ...restProps
  } = props;
  const classNames = clsx(s.card, s[variant], className);
  return (
    <Link
      {...restProps}
      className={classNames}
      to={link}
      aria-label={`See more about ${header}`}
    >
      <div className={s.textContainer}>
        <h2 className={s.header}>{header}</h2>
        <div className={s.link}>
          <div className={s.arrowContainer}>
            <Arrow className={s.arrow} />
          </div>
          See more
        </div>
      </div>
      <img src={image} alt="" className={s.image} />
    </Link>
  );
};
