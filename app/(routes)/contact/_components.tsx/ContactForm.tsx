"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel, // FormLabel ReCAPTCHA için genellikle kullanılmaz ama FormField içinde kalabilir.
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReCAPTCHA from "react-google-recaptcha";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "İsim en az 2 karakter olmalı.", 
  }),
  email: z.string().email({
    message: "Lütfen geçerli bir e-posta adresi girin.", 
  }),
  message: z.string().min(10, {
    message: "Mesaj en az 10 karakter olmalı.", 
  }),
  recaptcha: z.string().min(1, "Lütfen robot olmadığınızı doğrulayın."),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      recaptcha: "", 
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      const response = await fetch("api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });

      if (response.ok) {
        form.reset(); // Formu sıfırla
        alert('Mesajınız başarıyla gönderildi! Teşekkür ederiz, en kısa sürede geri döneceğim.');
      } else {
        const errorData = await response.json();
        alert(`Mesaj gönderilirken bir sorun oluştu: ${errorData.message || 'Bilinmeyen Hata'}. Lütfen tekrar deneyin.`);
      }

    } catch (error) {
      console.error("Mesaj gönderme sırasında bir ağ hatası oluştu:", error);
      alert('Mesajınız gönderilemedi. Lütfen internet bağlantınızı kontrol edin veya daha sonra tekrar deneyin.');
    }
  }

  return (
    <div className="bg-gray-100 max-w-md mx-auto py-6 px-12 border-4 mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adınız</FormLabel>
                <FormControl>
                  <Input placeholder="Adınız Soyadınız" {...field} />
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
                <FormLabel>E-posta</FormLabel>
                <FormControl>
                  <Input placeholder="eposta@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mesajınız</FormLabel>
                <FormControl>
                  <Textarea placeholder="Mesajınızı buraya yazın..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ReCAPTCHA alanı için FormField kullanımı */}
          <FormField
            control={form.control}
            name="recaptcha"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ReCAPTCHA
                    sitekey="6LfUsY8rAAAAAALBuOqK18L6TEHw5EAz4SjZad4X"
                    onChange={(token) => {
                      field.onChange(token || ""); // Zod doğrulamasını tetiklemek için token'ı veya boş string'i field'a set ediyoruz
                    }}
                    onExpired={() => {
                      field.onChange(""); // Süresi dolarsa alanı boşalt
                    }}
                  />
                </FormControl>
                {/* ReCAPTCHA seçilmediğinde hata mesajı burada gösterilecek */}
                <FormMessage /> 
              </FormItem>
            )}
          />

          <Button type="submit">Mesajı Gönder</Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;