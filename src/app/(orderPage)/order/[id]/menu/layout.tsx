import "./globals.css";

import { Poppins } from "next/font/google";
import StyledComponentsRegistry from "./register";
import NavBar from "@/app/(orderPage)/components/order/Menu/NavBar/NavBar";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--poppins-font",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
});

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={poppins.variable}>
      <StyledComponentsRegistry>
        <div>{children}</div>
        <NavBar></NavBar>
      </StyledComponentsRegistry>
    </div>
  );
}
