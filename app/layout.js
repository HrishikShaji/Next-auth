import AuthProvider from "@/context/AuthProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import Header from "@/components/Header";
import { Providers } from "./redux/provider";
import store from "./redux/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers store={store}>
          <AuthProvider>
            <UserProvider>
              <div>
                <Header />
                {children}
              </div>
            </UserProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
