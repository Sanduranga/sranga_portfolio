import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Must be at least 5 characters").max(120),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export type ContactSchema = z.infer<typeof contactSchema>;

export const budgetOptions = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Let's discuss",
] as const;

export const timelineOptions = [
  "ASAP",
  "Within a month",
  "1 – 3 months",
  "3 – 6 months",
  "Flexible",
] as const;
