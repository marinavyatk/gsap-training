import s from "./footer-animation.module.scss";
import ShineIcon from "../../assets/shine.svg?react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const FooterAnimationPage = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const footerHeight = footer.offsetHeight;
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "footer",
        trigger: ".main",
        start: "bottom bottom",
        end: "bottom top", //default value
        pin: true,
        scrub: true,
        pinSpacing: false,
      },
    });

    tl.to(footer, { yPercent: `-${footerHeight}px` }, 0).to(
      ".overlay",
      { opacity: 1 },
      0,
    );

    return () => {
      ScrollTrigger.getById("footer")?.kill();
    };
  }, []);

  return (
    <div className={s.pageContainer}>
      <div className={s.bgIllustration}></div>
      <div className={s.footerPage}>
        <main className={s.main + " main"}>
          <h1>Footer Animation</h1>
          <p className={s.description}>
            When you scroll to the end of the page, the page becomes fixed, and
            the footer reveals over the content
          </p>
          <div className={s.content}>
            <div className={s.contentText}>
              <div className={s.block}>
                <p> Some content</p>
                <p>(I decided to include my experience with this animation)</p>
              </div>
              <div className={s.block}>
                <p>
                  This animation fixes the main page content during the footer
                  animation, creating the effect as if the footer slides from
                  the top over the main content. Notes on working with the
                  animation:
                </p>
                <dl>
                  <dt>Style issues:</dt>
                  <dd>
                    The main difficulty lies in the fact that styles are applied
                    to the main container that holds all the page content. This
                    can affect the styling since the container’s positioning
                    changes to fixed. Also the height of the page without the
                    footer must be at least 100vh.
                  </dd>
                  <dt>Spacing usage:</dt>
                  <dd>
                    To create spacing above and below the fixed content, it is
                    better to use padding instead of margins. Fixed positioning
                    causes jerky animation at the beginning and end.
                  </dd>
                  <dt>Issues with dynamic content:</dt>
                  <dd>
                    This animation is better suited for pages with static
                    content. If the page contains dynamic elements (for example,
                    text appears when a button is clicked), it is necessary for
                    ScrollTrigger to recalculate the animation when the content
                    changes. This becomes especially challenging if the new
                    content appears with a smooth animation and is located near
                    the footer. Organizing a recalculation is not difficult with
                    the <code>refresh()</code> method for a specific
                    ScrollTrigger, but the layout will change abruptly. Making a
                    smooth transition is significantly more complex.
                  </dd>
                  <dt>Conflicts with other animations:</dt>
                  <dd>
                    Since the main content is fixed, conflicts with other
                    animations on the page may arise. As a result, this can lead
                    to the appearance of additional workarounds in the code.
                    Recalculation when switching pages: It is also important to
                    consider that when switching between pages, the trigger
                    needs to be updated. Therefore, it is recommended to link
                    the <code>refresh()</code> method call to changes in the URL
                    path.
                  </dd>
                  <dt>Responsiveness testing:</dt>
                  <dd>
                    Testing the page for responsiveness becomes more challenging
                    because every time the screen size changes, the animation
                    recalculates, causing a sudden style shift. This makes
                    debugging and testing the layout on different devices and
                    screen resolutions more difficult.
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <p className={s.end}>End of the content</p>
        </main>
        <footer className={s.footer} ref={footerRef}>
          <div className={s.footerLogo}>
            <ShineIcon />
            Footer
          </div>
          <p className={s.footerHeader}>
            This is a <span>footer</span> with very <span>important</span>{" "}
            <span>information</span> that you should pay attention to!
          </p>
          <div className={s.textContainer}>
            <div className={s.footerText}>
              <p>
                If the footer is taller than the screen height, it will be
                scrollable. Or, you can set it to the screen height and make the
                content scrollable. If it is too short, the animation may feel
                abrupt and end too quickly.
              </p>
              <p className={s.action}>
                You really need to look here! Look at me! Attention! Don’t miss
                this! Take a look! Fill out the form! Leave a request! Place the
                order! Give us a call! Make a purchase! Subscribe! Share it! Act
                now! Go Go Go!
              </p>
              <p>
                If the footer height meets or exceeds the screen height, the
                overlay color will follow the style settings. Otherwise, it will
                be an intermediate shade because the bottom of the footer won't
                reach the top of the trigger.
              </p>
            </div>
          </div>
          <div className={s.bottom}>
            <hr />
            <div>
              <span>Look at this!</span>
              <span>Look at this!</span>
              <span>Look at this!</span>
              <span>Look at this!</span>
              <span>Look at this!</span>
              <span>Look at this!</span>
              <span>Look at this!</span>
              <span>Look at this!</span>
              <span>Look at this!</span>
              <span>Look at this!</span>
              <span>Look at this!</span>
            </div>
          </div>
        </footer>
        <div className={s.overlay + " overlay"}></div>
      </div>
    </div>
  );
};
