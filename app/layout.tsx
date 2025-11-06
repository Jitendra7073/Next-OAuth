import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` flex justify-between flex-col min-h-screen`}>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
