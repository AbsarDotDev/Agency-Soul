import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import localFont from "next/font/local";
import SidebarWithHeader from "@/components/Sidebar";

const Poppins = localFont({
  src: "./Poppins-Regular.ttf",
  display: "swap",
  variable: "--font-poppins",
});
export const metadata = {
  title: "Agency Soul",
  description: "Specialized ERP for E-commerce and Software agencies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en" className={`${Poppins.variable}`}>
        <head><link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css"  rel="stylesheet" />
</head>

      <body className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarWithHeader />
        {children}
        </ThemeProvider>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js" async></script>

</body>
    </html>
  );
}
