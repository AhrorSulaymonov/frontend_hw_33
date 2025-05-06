import MainLayout from "@/layout";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// QueryClient ni bir marta yaratamiz
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
    setLoadingAuth(false);

    // Bu logikani biroz soddalashtiramiz
    if (!loadingAuth) {
      // Faqat autentifikatsiya tekshiruvi tugagandan keyin yo'naltiramiz
      if (!authStatus && router.pathname !== "/login") {
        router.push("/login");
      } else if (authStatus && router.pathname === "/login") {
        router.push("/students");
      }
    }
  }, [router.pathname, loadingAuth, isAuthenticated, router]); // isAuthenticated ni ham qo'shdim

  // Birinchi yuklanishda autentifikatsiya tekshirilguncha hech narsa ko'rsatmaymiz
  if (loadingAuth) {
    return (
      <QueryClientProvider client={queryClient}>
        {" "}
        {/* Loader uchun ham Provider kerak bo'lishi mumkin */}
        <div>Yuklanmoqda...</div>
        <ToastContainer autoClose={3000} hideProgressBar />
      </QueryClientProvider>
    );
  }

  // QueryClientProvider ni eng yuqoriga chiqaramiz
  return (
    <QueryClientProvider client={queryClient}>
      {
        router.pathname === "/login" ? (
          <Component {...pageProps} />
        ) : isAuthenticated ? ( // Faqat autentifikatsiyadan o'tgan bo'lsa MainLayout
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        ) : // Agar tizimga kirmagan va login sahifasida bo'lmasa (bu holatga tushmasligi kerak,
        // chunki yuqoridagi useEffect yo'naltiradi), lekin himoya uchun
        null // Yoki yana login sahifasiga yo'naltirish mumkin, ammo bu loopga olib kelishi mumkin
      }
      <ToastContainer autoClose={3000} hideProgressBar />
    </QueryClientProvider>
  );
}
