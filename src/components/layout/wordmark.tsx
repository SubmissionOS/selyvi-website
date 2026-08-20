import { cn } from "@/lib/utils";
import { PRODUCT_NAME } from "@/config/brand";

/**
 * Wortmarke – Platzhalter.
 *
 * Ersetzen der Wortmarke durch ein Logo spaeter in genau EINER Zeile:
 * den <span>-Block unten gegen z. B.
 *   <Image src="/logo.svg" alt={PRODUCT_NAME} width={140} height={24} priority />
 * austauschen. Alle Aufrufer (Header, Footer, ...) bleiben unveraendert.
 *
 * Der Text selbst kommt aus PRODUCT_NAME in src/config/brand.ts.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-lg font-semibold tracking-tight text-brand-800 select-none",
        className,
      )}
    >
      {PRODUCT_NAME}
    </span>
  );
}
