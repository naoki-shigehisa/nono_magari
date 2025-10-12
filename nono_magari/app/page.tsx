import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans text-foreground bg-background">
      {/* Hero */}
      <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/nono_logo.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />

      </section>

      {/* Concept */}
      <section className="px-6 sm:px-10 py-16 sm:py-24 max-w-[1024px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">一日のはじまりに、余白とやすらぎを。</h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-700">
            旬の食材、心地よい空間、素材の味を大切に。東京の真ん中で、やさしい朝ごはんをどうぞ。
          </p>
        </div>
        <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-white shadow-sm">
          <Image src="/nono_3.jpg" alt="nono_3" fill className="object-cover" />
        </div>
      </section>

      {/* Takeout */}
      <section className="px-6 sm:px-10 py-16 sm:py-24 max-w-[1024px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900">一日のはじまりに、余白とやすらぎを。</h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-700">
            1つ1つの素材にこだわった朝ごはんをお楽しみください。
          </p>
        </div>
        <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-white shadow-sm">
          <Image src="/nono_4.jpg" alt="nono_4" fill className="object-cover" />
        </div>
      </section>

      {/* Info / Access */}
      <section className="flex justify-center px-6 sm:px-10 py-16 sm:py-24">
        <div className="max-w-[1024px] text-center">
          <h3 className="text-xl sm:text-2xl font-semibold">野々</h3>
          <ul className="mt-4 space-y-2 text-sm sm:text-base">
            <li>OPEN 10:00 / CLOSE 13:00</li>
            <li>NEXT OPEN 10/26 (日)</li>
            <li>東京都杉並区宮前5-9-8 okatte にしおぎ</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-10 py-10 border-t border-black/10 dark:border-white/10 text-center text-xs sm:text-sm">
        <p>Copyright © 2025 野々</p>
      </footer>
    </div>
  );
}
