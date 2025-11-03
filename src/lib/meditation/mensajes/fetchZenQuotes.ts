export type Quote = {
  q: string;
  a: string;
  s?: string;
  tag?: string;
};

/**
 * API base: https://api.quotable.io
 * Documentación: https://github.com/lukePeavey/quotable
 */

const QUOTABLE_BASE = "https://api.quotable.io";

async function fetchFromQuotableTag(tag: string): Promise<Quote | null> {
  try {
    const res = await fetch(`${QUOTABLE_BASE}/random?tags=${encodeURIComponent(tag)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      q: data.content,
      a: data.author || "Desconocido",
      s: "Quotable",
      tag,
    };
  } catch {
    return null;
  }
}

async function fetchFromZenQuotes(): Promise<Quote | null> {
  try {
    const res = await fetch("https://zenquotes.io/api/random");
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || !data[0]) return null;
    const first = data[0];
    return { q: first.q, a: first.a, s: "ZenQuotes" };
  } catch {
    return null;
  }
}

function fallbackLocal(): Quote {
  const frases = [
    { q: "Cada respiración es una nueva oportunidad para empezar.", a: "MindBalance" },
    { q: "Suelta lo que no puedes controlar, abraza lo que sí puedes disfrutar.", a: "MindBalance" },
    { q: "La calma no se busca afuera, se cultiva dentro.", a: "MindBalance" },
  ];
  const random = frases[Math.floor(Math.random() * frases.length)];
  return { ...random, s: "Local" };
}

/**
 * Obtiene una frase según categoría o aleatoria.
 * @param tag Categoría de frase (por ejemplo 'inspirational', 'life', 'happiness')
 * @param forceRefresh Forzar nueva petición (ignora caché)
 */

export async function fetchZenQuotes(tag?: string, forceRefresh = false): Promise<Quote> {
  const tags = tag
    ? [tag]
    : ["inspirational", "life", "wisdom", "happiness", "success", "friendship"];
  const randomTag = tags[Math.floor(Math.random() * tags.length)];

  let quote: Quote | null = null;

  quote = await fetchFromQuotableTag(randomTag);
  if (quote) return quote;

  quote = await fetchFromZenQuotes();
  if (quote) return quote;

  return fallbackLocal();
}
