import Image, { type ImageProps } from "next/image";

type LogoMarkProps = Omit<ImageProps, "src" | "width" | "height" | "alt"> & {
  /** Lato in px. Se omesso, le dimensioni arrivano dalla classe CSS. */
  size?: number;
  /** Se presente il logo è un'immagine con nome accessibile; altrimenti è decorativo. */
  alt?: string;
};

/**
 * Logo REALE di Triskell Ecosystem (medaglione ritagliato dal file originale su fondo trasparente).
 * Sorgente: brand-assets/triskell-logo-completo.png → public/brand/triskell-medallion.png (+ versioni WebP -128/-256/-448).
 */
export function LogoMark({ size, alt = "", style, ...props }: LogoMarkProps) {
  // WebP già ridimensionati (il PNG originale da 640px pesa ~600 KB): il più piccolo che resta nitido a 2x
  const px = size ?? (parseInt(String(props.sizes ?? ""), 10) || 640);
  const src = px <= 64 ? "/brand/triskell-medallion-128.webp" : px <= 128 ? "/brand/triskell-medallion-256.webp" : "/brand/triskell-medallion-448.webp";
  return (
    <Image
      src={src}
      width={640}
      height={640}
      alt={alt}
      sizes={size ? `${size}px` : undefined}
      style={size ? { width: size, height: size, ...style } : style}
      {...props}
    />
  );
}
