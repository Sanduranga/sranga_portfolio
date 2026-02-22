"use client";

import { useActionState, useOptimistic, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContactAction } from "@/actions/contact";
import { contactSchema, type ContactSchema, budgetOptions, timelineOptions } from "@/lib/schemas";
import type { PortfolioData, ActionState } from "@/types";
import { cn } from "@/lib/utils";

interface Props { data: PortfolioData; isActive: boolean }

const initialState: ActionState = { status: "idle", message: "" };

export function ContactPage({ data, isActive }: Props) {
  const { developer } = data;

  // ── React 19: useActionState ────────────────────────────────────────────────
  // Replaces the old pattern of managing pending/error state manually.
  // Works with Server Actions AND progressive enhancement (no-JS form POST).
  const [actionState, formAction, isPending] = useActionState(
    submitContactAction,
    initialState
  );

  // ── React 19: useOptimistic ─────────────────────────────────────────────────
  // Show optimistic "sent" state immediately while the server action runs
  const [optimisticSent, setOptimisticSent] = useOptimistic(
    actionState.status === "success"
  );

  // ── React Hook Form + Zod ───────────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactSchema>({ resolver: zodResolver(contactSchema) });

  // Merge RHF client validation with Server Action field errors
  const fieldErr = (field: keyof ContactSchema) =>
    errors[field]?.message ?? actionState.fieldErrors?.[field];

  // Client-side submit: RHF validates, then hands off to Server Action
  function onClientSubmit(data: ContactSchema) {
    startTransition(() => {
      setOptimisticSent(true); // instant optimistic update
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => { if (v) fd.append(k, v); });
      formAction(fd);
    });
  }

  return (
    <div className={cn("h-full overflow-y-auto", isActive && "page-enter")}>
      <div className="p-4">
        <div className="mb-4" style={{ borderBottom: "1px solid rgba(26,18,8,0.2)", paddingBottom: "0.5rem" }}>
          <p className="section-label">§ VI — Correspondence</p>
          <h2 className="headline-1">Send a Dispatch</h2>
        </div>

        <div className="grid grid-cols-12 gap-0">
          {/* Left: contact info */}
          <div className="col-span-4 col-rule pr-4">
            <div className="mb-4">
              <p className="section-label mb-2" style={{ borderBottom: "1px solid rgba(26,18,8,0.15)", paddingBottom: "0.25rem" }}>
                Reach the Correspondent
              </p>
              <p className="body-copy text-xs leading-relaxed">
                Whether you have a project in mind, want to discuss a technical problem, or
                simply wish to connect — every message is read and answered within 24 hours.
              </p>
            </div>

            <div className="ink-box mb-3">
              <p className="section-label mb-1.5">Current Status</p>
              <p className={cn(
                "body-copy text-sm font-bold",
                developer.availability === "available" ? "status-available" : "status-unavailable"
              )}>
                {developer.availability === "available"
                  ? "● Open to new engagements"
                  : developer.availability === "busy"
                  ? "◐ Limited availability"
                  : "○ Not currently available"}
              </p>
            </div>

            <div>
              <p className="section-label mb-2" style={{ borderBottom: "1px solid rgba(26,18,8,0.15)", paddingBottom: "0.25rem" }}>
                Other Channels
              </p>
              {developer.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-1.5 byline hover:underline text-ink"
                  style={{ borderBottom: "1px solid rgba(26,18,8,0.08)" }}
                >
                  → {link.label}
                </a>
              ))}
            </div>

            <div className="mt-3 pt-2" style={{ borderTop: "1px solid rgba(26,18,8,0.15)" }}>
              <p className="section-label mb-0.5">Response Time</p>
              <p className="body-copy text-xs">Within 24 hours, Monday – Friday.</p>
            </div>
          </div>

          {/* Right: form */}
          <div className="col-span-8 pl-4">
            {optimisticSent || actionState.status === "success" ? (
              /* Success state */
              <div className="ink-box-bold text-center py-10 flex flex-col items-center gap-3">
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem" }}>✦</p>
                <h3 className="headline-2">Dispatch Received</h3>
                <p className="body-copy text-sm max-w-xs text-center">{actionState.message}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="byline px-4 py-1.5 border-2 border-ink hover:bg-ink hover:text-paper transition-colors mt-2"
                >
                  Send Another
                </button>
              </div>
            ) : (
              /* Form — uses action= for progressive enhancement */
              <form action={formAction} onSubmit={handleSubmit(onClientSubmit)} noValidate className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="section-label block mb-1">Full Name *</label>
                    <input {...register("name")} name="name" placeholder="Your name" className="ink-input" />
                    {fieldErr("name") && <p className="caption text-red-800 mt-0.5">{fieldErr("name")}</p>}
                  </div>
                  <div>
                    <label className="section-label block mb-1">Email Address *</label>
                    <input {...register("email")} name="email" type="email" placeholder="you@example.com" className="ink-input" />
                    {fieldErr("email") && <p className="caption text-red-800 mt-0.5">{fieldErr("email")}</p>}
                  </div>
                </div>

                <div>
                  <label className="section-label block mb-1">Subject *</label>
                  <input {...register("subject")} name="subject" placeholder="Project enquiry, collaboration..." className="ink-input" />
                  {fieldErr("subject") && <p className="caption text-red-800 mt-0.5">{fieldErr("subject")}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="section-label block mb-1">Budget (optional)</label>
                    <select {...register("budget")} name="budget" className="ink-input" defaultValue="">
                      <option value="" disabled>Select range</option>
                      {budgetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="section-label block mb-1">Timeline (optional)</label>
                    <select {...register("timeline")} name="timeline" className="ink-input" defaultValue="">
                      <option value="" disabled>Select timeline</option>
                      {timelineOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="section-label block mb-1">Message *</label>
                  <textarea {...register("message")} name="message" placeholder="Describe your project or enquiry..." rows={5} className="ink-input resize-none" />
                  {fieldErr("message") && <p className="caption text-red-800 mt-0.5">{fieldErr("message")}</p>}
                </div>

                {actionState.status === "error" && !actionState.fieldErrors && (
                  <p className="caption text-red-800 border border-red-800/30 px-3 py-2">{actionState.message}</p>
                )}

                <div className="flex justify-between items-center pt-1">
                  <p className="caption">* Required fields</p>
                  <button
                    type="submit"
                    disabled={isPending}
                    className={cn(
                      "byline px-6 py-2 transition-colors",
                      isPending
                        ? "bg-fade text-paper cursor-not-allowed"
                        : "bg-ink text-paper hover:bg-ink/80"
                    )}
                  >
                    {isPending ? "Transmitting..." : "Send Dispatch →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
