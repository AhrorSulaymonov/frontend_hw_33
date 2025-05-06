import { useEffect } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // localStorage faqat client-side da mavjud
    if (typeof window !== "undefined") {
      const isAuthenticated =
        localStorage.getItem("isAuthenticated") === "true";
      if (isAuthenticated) {
        router.replace("/students"); // Tizimga kirgan bo'lsa o'quvchilar sahifasiga
      } else {
        router.replace("/login"); // Aks holda kirish sahifasiga
      }
    }
  }, [router]);

  return <div>Yo'naltirilmoqda...</div>; // Yoki chiroyliroq loader
}
