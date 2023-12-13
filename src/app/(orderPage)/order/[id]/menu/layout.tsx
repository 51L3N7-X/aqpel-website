import "./globals.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--poppins-font",
  subsets: ["latin"],
});

export default function Menu({ children }: { children: React.ReactNode }) {
  return <div className={poppins.variable}>{children}</div>;
}
