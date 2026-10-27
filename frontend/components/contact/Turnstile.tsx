"use client";

import { useEffect, useRef } from "react";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
      language?: string;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () =>
        window.turnstile
          ? resolve(window.turnstile)
          : reject(new Error("Turnstile is not available"));
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Failed to load Turnstile"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

type Props = {
  siteKey: string;
  // 合格したらトークン、期限切れ・エラーなら null を渡す
  onTokenChange: (token: string | null) => void;
  // この値が変わるたびにウィジェットをリセットする（トークンは1回しか使えないため）
  resetKey: number;
  onLoadError: () => void;
};

export function Turnstile({
  siteKey,
  onTokenChange,
  resetKey,
  onLoadError,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  // 最新のコールバックを ref で持ち、ウィジェットを作り直さずに済むようにする
  const onTokenChangeRef = useRef(onTokenChange);
  const onLoadErrorRef = useRef(onLoadError);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
    onLoadErrorRef.current = onLoadError;
  });

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;
        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          language: "ja",
          callback: (token) => onTokenChangeRef.current(token),
          "expired-callback": () => onTokenChangeRef.current(null),
          "error-callback": () => onTokenChangeRef.current(null),
        });
      })
      .catch(() => {
        if (!cancelled) onLoadErrorRef.current();
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  useEffect(() => {
    if (resetKey === 0) return;
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetKey]);

  return <div ref={containerRef} className="min-h-[65px]" />;
}
