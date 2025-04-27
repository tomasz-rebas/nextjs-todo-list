import { Providers } from "./providers";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="text-center">
          <h1 className="text-4xl my-8">ToDo List</h1>
        </header>
        <main className="flex justify-center px-4">
          <div className="w-full sm:w-[500px]">
            <Providers>{children}</Providers>
          </div>
        </main>
      </body>
    </html>
  );
}
