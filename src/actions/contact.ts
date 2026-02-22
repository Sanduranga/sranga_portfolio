"use server";

/**
 * Server Actions — React 19 + Next.js 16
 *
 * Used with React 19's useActionState() for:
 * - Progressive enhancement (works without JS)
 * - Optimistic UI updates
 * - Field-level error display
 * - No client/server data fetching split
 */

import { revalidateTag } from "next/cache";
import { after } from "next/server"; // Next.js 15+ after() API
import { contactSchema } from "@/lib/schemas";
import type { ActionState } from "@/types";

export async function submitContactAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    budget: formData.get("budget") ?? undefined,
    timeline: formData.get("timeline") ?? undefined,
  };

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string") fieldErrors[field] = issue.message;
    }
    return { status: "error", message: "Please fix the errors below.", fieldErrors };
  }

  try {
    const apiBase = process.env.API_URL ?? "";
    if (apiBase) {
      const res = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error("API error");
    } else {
      // Dev: simulate latency
      await new Promise((r) => setTimeout(r, 700));
    }

    // Next.js 15+ after(): runs after the response is flushed
    // Perfect for analytics, Slack webhooks, email queues — non-blocking
    after(async () => {
      console.log(
        `[Contact] ${result.data.name} <${result.data.email}> at ${new Date().toISOString()}`
      );
    });

    return {
      status: "success",
      message: "Your dispatch has been received. I shall reply within 24 hours.",
    };
  } catch (err) {
    console.error("[Contact]", err);
    return {
      status: "error",
      message: "Transmission failed. Please try again or reach out directly via social links.",
    };
  }
}

// Called from CMS webhooks to bust cached data
export async function revalidatePortfolio(
  tag: string
): Promise<{ ok: boolean }> {
  const allowed = ["developer", "projects", "skills", "experience", "articles"];
  if (!allowed.includes(tag)) return { ok: false };
  revalidateTag(tag);
  return { ok: true };
}
