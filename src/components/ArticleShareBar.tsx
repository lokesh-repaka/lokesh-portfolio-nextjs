"use client";

import React, { useState } from "react";
import { Share2, Copy, Check, Linkedin } from "lucide-react";
import { useToast } from "@/components/Toast";

interface ArticleShareBarProps {
  title: string;
}

export const ArticleShareBar: React.FC<ArticleShareBarProps> = ({ title }) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast("Article link copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareLinkedIn = () => {
    if (typeof window !== "undefined") {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        window.location.href
      )}`;
      window.open(url, "_blank", "width=600,height=600");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={shareLinkedIn}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-white/10 hover:border-gold-border/40 text-slate-200 text-xs font-mono transition-all"
        title="Share to LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5 text-gold-bright" />
        <span>Share</span>
      </button>

      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-white/10 hover:border-gold-border/40 text-slate-200 text-xs font-mono transition-all"
        title="Copy Link"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        <span>{copied ? "Copied" : "Copy Link"}</span>
      </button>
    </div>
  );
};
