import "./globals.css";

import { Poppins } from "next/font/google";
import StyledComponentsRegistry from "./register";
import NavBar from "@/app/(orderPage)/components/order/Menu/NavBar/NavBar";
import localFont from "next/font/local";
import { join } from "path";
// const poppins = Poppins({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--poppins-font",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   style: ["normal"],
// });

// const poppins = localFont({
//   src: [
//     {
//       path: "../../../../../../public/fonts/Poppins-Thin.ttf",
//       weight: "100",
//     },
//     {
//       path: "../../../../../../public/fonts/Poppins-ExtraLight.ttf",
//       weight: "200",
//     },
//     {
//       path: "../../../../../../public/fonts/Poppins-Light.ttf",
//       weight: "300",
//     },
//     {
//       path: "../../../../../../public/fonts/Poppins-Regular.ttf",
//       weight: "400",
//     },
//     {
//       path: "../../../../../../public/fonts/Poppins-Medium.ttf",
//       weight: "500",
//     },
//     {
//       path: "../../../../../../public/fonts/Poppins-SemiBold.ttf",
//       weight: "600",
//     },
//     {
//       path: "../../../../../../public/fonts/Poppins-Bold.ttf",
//       weight: "700",
//     },
//     {
//       path: "../../../../../../public/fonts/Poppins-ExtraBold.ttf",
//       weight: "800",
//     },
//     {
//       path: "../../../../../../public/fonts/Poppins-Black.ttf",
//       weight: "900",
//     },
//   ],
//   variable: "--font-poppins",
// });

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <StyledComponentsRegistry>
        <div>{children}</div>
        <NavBar></NavBar>
      </StyledComponentsRegistry>
    </div>
  );
}
