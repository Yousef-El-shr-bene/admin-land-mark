import Heder from "../home/Heder";
export const metadata = {
  title: "admin-land-mark",
  description: "Generated by admin-land-mark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full">
      <Heder/>
      {children}
    </div>
  );
}
