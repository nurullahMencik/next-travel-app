"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "email is required")
    .email("please enter a validation"),
  password: z.string().min(1, "password must be at least 6 characters."),
});

type loginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [error, setError] = useState("");
  const [state,setState] = useState(false)
  const router = useRouter();

  const form = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: loginFormValues) => {
    setError("");
    setState(true);

    try {
      const res = await signIn("credentials", {
        email: data.email.trim().toLowerCase(),
        password: data.password,
        redirect: false,
      });

      // signIn ag hatasinda undefined donebiliyor; sadece res.error'a bakmak
      // bu durumda kullaniciyi hatali sekilde ana sayfaya yonlendiriyordu.
      if (!res || res.error || !res.ok) {
        setError("E-posta veya sifre hatali.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Beklenmedik bir hata olustu. Lutfen tekrar deneyin.");
    } finally {
      setState(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row items-center justify-between">
              <Button type="submit" disabled={state}>{state ? "Loading" : "Login"}</Button>
              <Link
                href="/register"
                className="font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Register
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
