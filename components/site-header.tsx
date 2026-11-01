"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { emailHref, links, nav } from "@/lib/site";
import { RandomFact } from "@/components/random-fact";
import { SocialIcon } from "@/components/social-icon";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const closeIndex = useCallback(() => {
    setOpen(false);
  }, []);

  const openIndex = useCallback(() => {
    setOpen(true);
  }, []);

  const handleIndexClick = useCallback(() => {
    openIndex();
  }, [openIndex]);
}
