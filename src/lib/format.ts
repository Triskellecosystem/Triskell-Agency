/** Formatta un numero in italiano con le cifre decimali richieste. */
export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("it-IT", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Segnaposto visibile solo in sviluppo: `data-todo` evidenzia i dati da sostituire. */
export const isDev = process.env.NODE_ENV !== "production";
