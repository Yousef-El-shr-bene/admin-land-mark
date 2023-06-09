import { Inter } from "next/font/google";
import Heder from './Heder'
const inter = Inter({ subsets: ["latin"] });

interface Page {
  params : {name : string}
}

export const metadata = {
  title: "admin-land-mark",
  description: "Generated by admin-land-mark",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div>
      <Heder />
      {children}
    </div>
  );
}
