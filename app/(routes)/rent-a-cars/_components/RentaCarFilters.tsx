import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter} from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const filterSchema = z.object({
  rating: z.string().optional(),
  priceMin: z.string().optional(),
  priceMax: z.string().optional(),
});

type FilterValues = z.infer<typeof filterSchema>;


const RentaCarFilters = () => {


    const router = useRouter()

     const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      rating: "",
      priceMin: "",
      priceMax: "",
    },
  });

   function onSubmit(values: FilterValues) {
    const params = new URLSearchParams();
    if (values.rating) params.set("rating", values.rating);
    if (values.priceMax) params.set("priceMax", values.priceMax);
    if (values.priceMin) params.set("priceMin", values.priceMin);

    router.push(`/trips?${params.toString()}`);
  }


  return (
     <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 4.5"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceMin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Min</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Minimum price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceMax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Max</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Maximum price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
  )
}

export default RentaCarFilters
