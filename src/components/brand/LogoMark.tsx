import Image, { type ImageProps } from "next/image";

type LogoMarkProps = Omit<ImageProps, "src" | "width" | "height" | "alt"> & {
  /** Lato in px. Se omesso, le dimensioni arrivano dalla classe CSS. */
  size?: number;
  /** Se presente il logo è un'immagine con nome accessibile; altrimenti è decorativo. */
  alt?: string;
};

/**
 * Logo REALE di Triskell Ecosystem (medaglione ritagliato dal file originale su fondo trasparente).
 * Sorgente: brand-assets/triskell-logo-completo.png → public/brand/triskell-medallion.png.
 */
export function LogoMark({ size, alt = "", style, ...props }: LogoMarkProps) {
  return (
    <Image
      src="/brand/triskell-medallion.png"
      width={640}
      height={640}
      alt={alt}
      sizes={size ? `${size}px` : undefined}
      style={size ? { width: size, height: size, ...style } : style}
      {...props}
    />
  );
}
