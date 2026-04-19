import { Roboto, Odibee_Sans, Anta } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import LenisProvider from "@/LenisProverder/LenisProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const anta = Anta({
  variable: "--font-anta",
  subsets: ["latin"],
  weight: ["400"], // Anta only has 400
});

const odibee = Odibee_Sans({
  variable: "--font-odibee",
  subsets: ["latin"],
  weight: ["400"], // Odibee Sans only has 400
});

export const metadata = {
  title: "SynexNova — One Platform. Every Solution.",
  description:
    "SynexNova is a USA-based technology company providing POS, Inventory, E-Commerce, HRM, CRM, Mobile Apps, and IUT solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${anta.variable} ${odibee.variable} antialiased`}>
        <LenisProvider>
        <PageLoader />
        {children}
        </LenisProvider>
      </body>
    </html>
  );
}
