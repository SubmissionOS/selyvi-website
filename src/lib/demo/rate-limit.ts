/**
 * Einfaches In-Memory-Rate-Limit pro IP.
 *
 * GRENZEN – bitte vor dem Livegang lesen:
 * Der Zaehler lebt im Arbeitsspeicher des jeweiligen Node-Prozesses. Das
 * bedeutet:
 *   - Bei mehreren Instanzen zaehlt jede fuer sich.
 *   - In serverlosen Umgebungen (Vercel Functions, Lambda) ist der Speicher
 *     nach einem Kaltstart leer.
 *   - Ein Neustart setzt alles zurueck.
 *
 * Als Bremse gegen simple Skripte reicht das. Wer ernsthaft missbraucht, umgeht
 * es. Fuer mehr braeuchte es einen geteilten Speicher (Redis o. ae.) oder das
 * Rate-Limit der vorgelagerten Plattform – bewusst nicht Teil dieses Schritts,
 * weil es eine Infrastruktur-Entscheidung ist.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 Minuten
const MAX_REQUESTS = 5;

/** IP -> Zeitstempel der Anfragen innerhalb des Fensters. */
const hits = new Map<string, number[]>();

/**
 * Verhindert unbegrenztes Wachstum der Map, falls viele verschiedene IPs
 * anfragen. Laeuft bei jedem Aufruf mit, nicht als Timer.
 */
function prune(now: number) {
  for (const [key, timestamps] of hits) {
    const fresh = timestamps.filter((t) => now - t < WINDOW_MS);
    if (fresh.length === 0) {
      hits.delete(key);
    } else {
      hits.set(key, fresh);
    }
  }
}

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  prune(now);

  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = Math.min(...timestamps);
    return { allowed: false, retryAfterMs: WINDOW_MS - (now - oldest) };
  }

  timestamps.push(now);
  hits.set(ip, timestamps);

  return { allowed: true, retryAfterMs: 0 };
}
