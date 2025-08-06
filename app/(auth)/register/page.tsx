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

const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, "email is required")
    .email("please enter a validation"),
  username: z.string().min(1, "username is required"),
  password: z.string().min(1, "password must be at least 6 characters."),
  firstName: z.string().min(1, "first name is required."),
  lastName: z.string().min(1, "last name is required"),
});

type RegisterFormValues = z.infer<typeof RegisterSchema>;

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [state, setState] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "test@gmail.com",
      username: "test",
      password: "123456",
      firstName: "test",
      lastName: "test",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
  setError("");
  setSuccess("");
  setState(true)
  console.log(data);

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setSuccess("Kayıt işlemi başarılı!");
       setTimeout(() => {
        setState(false)
         router.push("/login");
       }, 2000);
       
    } else {
      setState(false)
      const text = await response.text();
      const result = text ? JSON.parse(text) : {};
      setError(result.message || "Kayıt işlemi başarısız oldu.");
    }
  } catch (error) {
    setState(false)
    // Ağ hatası veya diğer beklenmedik hatalar
    console.error(error);
    setError("Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.");
  }
};
  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="firstName" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="lastName" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-row items-center justify-between">
              <Button type={state ?"button":"submit"}>{state ? "Loading" : "Register"}</Button>
              <Link
                href="/login"
                className="font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
