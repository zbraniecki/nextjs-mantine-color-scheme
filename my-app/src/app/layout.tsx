import { ThemeProvider } from "../components/ThemeProvider";
import { ChromeLayout } from "../components/Chrome";
import "./globals.css";

export const metadata = {
  title: "My App",
  description: "My Demo App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ChromeLayout>{children}</ChromeLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
