import "./globals.css";

import { Poppins } from "next/font/google";
import StyledComponentsRegistry from "./register";
import NavBar from "@/app/(orderPage)/components/order/Menu/NavBar/NavBar";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--poppins-font",
  subsets: ["latin"],
  display: "swap",
});

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <div className={poppins.variable}>{children}</div>
      <NavBar></NavBar>
    </StyledComponentsRegistry>
  );
}
