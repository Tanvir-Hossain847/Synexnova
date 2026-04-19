import { Roboto } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import LenisProvider from "@/LenisProverder/LenisProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata = {
  title: "SynexNova — One Platform. Every Solution.",
  description:
    "SynexNova is a USA-based technology company providing POS, Inventory, E-Commerce, HRM, CRM, Mobile Apps, and IUT solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <LenisProvider>
        <PageLoader />
        {children}
        </LenisProvider>
      </body>
    </html>
  );
}
