import "./globals.css";

import { ThemeProvider } from "../provider/themeProvider";
import Header from "./components/header";
import Footer from "./components/footer";
import TanStackProvider from "@/provider/tanstackProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` flex justify-between flex-col min-h-screen`}>
        <TanStackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
