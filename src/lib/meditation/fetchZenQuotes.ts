// src/lib/meditation/fetchZenQuotes.ts

export type Quote = {
  q: string;
  a: string; 
  s?: string; 
};

const CACHE_KEY = "mindbalance_daily_quote";
const CACHE_TTL_MS = 1000 * 60 * 60 * 12;

function getCachedQuote(): Quote | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { quote: Quote; ts: number };
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    return parsed.quote;
  } catch {
    return null;
  }
}

function setCachedQuote(quote: Quote) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ quote, ts: Date.now() })
    );
  } catch {}
}

/** Llama ZenQuotes (sin API key). */
async function fetchFromZenQuotes(signal?: AbortSignal): Promise<Quote | null> {
  const res = await fetch("https://zenquotes.io/api/random", { signal });
  if (!res.ok) return null;
  const data = (await res.json()) as Array<{ q: string; a: string }>;
  if (!Array.isArray(data) || data.length === 0) return null;
  const first = data[0];
  return { q: first.q, a: first.a, s: "ZenQuotes" };
}

/** Respaldo con Quotable (sin API key). */
async function fetchFromQuotable(signal?: AbortSignal): Promise<Quote | null> {
  const res = await fetch("https://api.quotable.io/random", { signal });
  if (!res.ok) return null;
  const data = (await res.json()) as { content?: string; author?: string };
  if (!data?.content) return null;
  return { q: data.content, a: data.author || "Unknown", s: "Quotable" };
}

/** Último recurso: frase local. */
function fallbackLocal(): Quote {
  return {
    q: "Respira. Este momento es suficiente.",
    a: "MindBalance",
    s: "Local",
  };
}

/**
 * Obtiene una frase “del día”:
 * 1) intenta caché; 2) ZenQuotes; 3) Quotable; 4) fallback local.
 */
export async function fetchZenQuotes(): Promise<Quote> {
  const cached = getCachedQuote();
  if (cached) return cached;

  const controller = new AbortController();
  const { signal } = controller;

  try {
    const fromZen = await fetchFromZenQuotes(signal);
    if (fromZen) {
      setCachedQuote(fromZen);
      return fromZen;
    }
  } catch {}

  try {
    const fromQuotable = await fetchFromQuotable(signal);
    if (fromQuotable) {
      setCachedQuote(fromQuotable);
      return fromQuotable;
    }
  } catch {}

  const fb = fallbackLocal();
  setCachedQuote(fb);
  return fb;
}
