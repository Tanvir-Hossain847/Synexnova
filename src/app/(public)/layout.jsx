import LenisProvider from "@/LenisProverder/LenisProvider";

export default function PublicLayout({ children }) {
  return <LenisProvider>{children}</LenisProvider>;
}
