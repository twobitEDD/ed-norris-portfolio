"use client";

import Link from "next/link";
import { DeviceViewer } from "@/components/physical-ui/DeviceViewer";
import { products } from "@/data/site";

function ProductsScreen() {
  return (
    <div className="ent-springboard-wallpaper flex h-full flex-col px-4 pb-5 pt-6">
      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/45">Our products</p>
      <div className="mt-4 flex flex-1 flex-col justify-center gap-3">
        {products.map((product) => (
          <Link
            key={product.name}
            href={product.href}
            target="_blank"
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 p-3 transition hover:border-technology/30"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg text-white"
              style={{ background: product.gradient }}
            >
              {product.glyph}
            </div>
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold text-white">{product.name}</p>
              <p className="text-[10px] text-technology">{product.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ProductStrip() {
  return (
    <div className="mx-auto mt-12 flex justify-center">
      <div className="w-full max-w-[220px] rotate-[2deg]">
        <DeviceViewer device="phone" size="sm" glow="cyan">
          <ProductsScreen />
        </DeviceViewer>
      </div>
    </div>
  );
}
