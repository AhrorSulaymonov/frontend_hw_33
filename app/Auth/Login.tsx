import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { Button, Input } from "@/components";
import { LoginWrapper } from "./Login.styles";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }
    // Haqiqiy autentifikatsiya logikasi bu yerda bo'lishi kerak
    // Hozircha sodda tekshiruv
    if (username === "admin" && password === "password") {
      toast.success("Muvaffaqiyatli kirdingiz!");
      localStorage.setItem("isAuthenticated", "true"); // Oddiy belgi
      router.push("/students"); // Asosiy sahifaga yo'naltirish
    } else {
      toast.error("Login yoki parol noto'g'ri!");
    }
  };

  return (
    <LoginWrapper>
      <h1>Tizimga kirish</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Login (admin)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Parol (password)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" title="Kirish" />
      </form>
    </LoginWrapper>
  );
};

export default Login;
