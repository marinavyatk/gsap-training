import { HomePage } from "../../pages/home/home.tsx";
import { FooterAnimationPage } from "../../pages/footerAnimation/footer-animation.tsx";
import { PinAnimationPage } from "../../pages/pinAnimation/pin-animation.tsx";

export const paths = {
  home: "/",
  footerAnimation: "/footer-animation",
  pinAnimation: "/pin-animation",
  someAnimation: "/some-animation",
} as const;

export const pages = [
  { path: paths.home, element: <HomePage /> },
  { path: paths.footerAnimation, element: <FooterAnimationPage /> },
  { path: paths.pinAnimation, element: <PinAnimationPage /> },
  { path: paths.someAnimation, element: <div>Here will be something!</div> },
] as const;
