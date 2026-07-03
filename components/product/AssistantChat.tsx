"use client";

import { useState } from "react";
import { ASSISTANT_NAME_PLACEHOLDER } from "@/lib/site-config";

interface ChatMessage {
  from: "assistant" | "client";
  text: string;
}

const SCRIPTED_QA: { prompt: string; reply: string }[] = [
  {
    prompt: "What is a home study, and why do we need one?",
    reply:
      "A home study is a review of your household — background checks, references, financials, and a home visit — that the court or agency uses to confirm your home is safe and ready for a child. Your attorney reviews everything before it's submitted; I'm just here to help you gather it faster.",
  },
  {
    prompt: "We're already married — why do we still need to adopt?",
    reply:
      "Great question for your attorney to confirm for your exact situation, but generally: a marriage certificate doesn't always guarantee every state will recognize both parents' parentage the same way a court adoption judgment does. Your attorney can explain what applies to your family specifically.",
  },
  {
    prompt: "When will our case be finished?",
    reply:
      "Timelines vary by pathway and by court schedule, so I can't give you a specific date — your attorney tracks that. What I can tell you is exactly which items on your checklist are still open, so you know what's slowing things down.",
  },
  {
    prompt: "I'm trans — will my documents need to match a prior name or gender marker?",
    reply:
      "Your firm will guide you on keeping your current name and gender marker consistent across background checks, home-study paperwork, and the birth certificate. Flag any name or document mismatch to your attorney early so it doesn't hold up your file later.",
  },
];

export function AssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      from: "assistant",
      text: `Hi, I'm the ${ASSISTANT_NAME_PLACEHOLDER}. Ask a routine question below — I can explain paperwork in plain language, but I don't give legal advice.`,
    },
  ]);

  function ask(prompt: string, reply: string) {
    setMessages((prev) => [
      ...prev,
      { from: "client", text: prompt },
      { from: "assistant", text: reply },
    ]);
  }

  const askedPrompts = new Set(
    messages.filter((m) => m.from === "client").map((m) => m.text)
  );

  return (
    <div className="rounded-2xl border border-line bg-paper">
      <div className="border-b border-line px-5 py-3">
        <p className="text-sm font-medium text-ink">{ASSISTANT_NAME_PLACEHOLDER}</p>
        <p className="text-xs text-ink-soft">
          Scripted demo conversation — not a live AI assistant. See README.
        </p>
      </div>
      <div className="max-h-80 space-y-3 overflow-y-auto px-5 py-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
              m.from === "assistant"
                ? "bg-paper-dim/70 text-ink"
                : "ml-auto bg-ink text-paper"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 border-t border-line px-5 py-4">
        {SCRIPTED_QA.filter((qa) => !askedPrompts.has(qa.prompt)).map((qa) => (
          <button
            key={qa.prompt}
            onClick={() => ask(qa.prompt, qa.reply)}
            className="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-clay hover:text-clay"
          >
            {qa.prompt}
          </button>
        ))}
        {SCRIPTED_QA.every((qa) => askedPrompts.has(qa.prompt)) && (
          <p className="text-xs text-ink-soft">
            That&rsquo;s every scripted question in this demo.
          </p>
        )}
      </div>
    </div>
  );
}
