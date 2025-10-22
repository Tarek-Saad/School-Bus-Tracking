"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"success" | "error" | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log("Form submitted:", data);
      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Get in Touch</CardTitle>
        <CardDescription>
          Send us a message and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name *
              </label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Your name"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="your@email.com"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject *
            </label>
            <Input
              id="subject"
              {...register("subject")}
              placeholder="What's this about?"
              className={errors.subject ? "border-destructive" : ""}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-destructive">{errors.subject.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message *
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows={6}
              placeholder="Tell us more..."
              className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
                errors.message ? "border-destructive" : ""
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>

          {submitStatus === "success" && (
            <Alert>
              <AlertDescription>
                Thank you! Your message has been sent successfully.
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === "error" && (
            <Alert variant="destructive">
              <AlertDescription>
                Something went wrong. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
