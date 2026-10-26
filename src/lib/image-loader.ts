"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Unsplash images are resized on Unsplash's CDN. Local files (e.g. client
 * photos dropped into /public later) are returned untouched.
 */
export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 72));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  return src;
}
