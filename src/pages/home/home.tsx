import { Card } from "../../components/card/card.tsx";
import { paths } from "../../common/router/routing.tsx";
import s from "./home.module.scss";

export const HomePage = () => {
  return (
    <div className={s.pageContainer}>
      <div className={s.page}>
        <div className={s.startScreen}>
          <div className={s.greeting}>
            <h1 className={s.header}>
              Learning GSAP and diving into animations
            </h1>
            <p className={s.description}>
              I'm learning to work with GSAP and sharing what comes out of it.
              Maybe someone will find it useful! Here you'll find simple
              animations, experiments, and practice examples.
            </p>
          </div>
          <img src="/main-cover.png" alt="" className={s.cover} />
        </div>

        <div className={s.links}>
          <Card
            header={"Footer  Animation"}
            image={"/card-cover.png"}
            variant={"light"}
            link={paths.footerAnimation}
          />
          <Card
            header={"GSAP Animation 2"}
            image={"/card-cover.png"}
            variant={"dark"}
            link={paths.pinAnimation}
          />
          <Card
            header={"GSAP Animation 3"}
            image={"/card-cover.png"}
            variant={"color"}
            link={paths.someAnimation}
          />
        </div>
      </div>
    </div>
  );
};
