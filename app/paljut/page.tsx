import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import BookingCalendar from "@/components/BookingCalendar"; // Tuodaan uusi kalenterikomponentti

// Data tälle yhdelle paljulle.
const paljuData = {
  name: "Käsinrakennettu Paljukärrymme",
  capacity: "6-8 hengelle",
  description:
    "Nauti mukavista ja rentouttavista hetkistä tässä laadukkaassa käsintehdyssä paljukärryssä. Tiekäyttöön rekisteröity kärry on helppo kuljettaa ja pystyttää. Tehokas puukamiina takaa nopean lämmityksen ja rentouttavan kylpykokemuksen.",
  included: [
    "Tehokas uppopumppu täyttöön",
    "Poistoletku tyhjennystä varten",
    "Yksi pesällinen polttopuita alkuun pääsemiseksi",
  ],
  pricing: [
    { period: "Vuorokausi (ma-to)", price: "90€" },
    { period: "Viikonloppu vrk (pe tai la)", price: "120€" },
    { period: "Koko viikonloppu (pe-su)", price: "200€" },
    { period: "Koko viikko", price: "300€" },
    { period: "Juhlapyhät (Juhannus, joulu, uusi vuosi)", price: "alk. 300€" },
  ],
  mainImageUrl: "/IMG_20201104_150509__01.jpg", // Varmista, että tämä kuva on /public-kansiossa
  galleryImages: [
    // Varmista, että myös nämä kuvat ovat /public-kansiossa
    "/kylpytynnyri-karry-pahkina-lasiluukullinen-kamiina.png",
    "/44_1d9b8dc0-d162-4723-b03e-d7fefa5fbeaf.jpg",
    "/8DFCC0D9-9750-4238-A645-B452770ADBC9_1_201_a-scaled-1.jpeg",
  ],
};

export default function PaljuEsittelySivu() {
  return (
    <div className="bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Vasen palsta: Kuvat */}
          <div className="lg:col-span-3">
            <div className="relative h-96 w-full rounded-xl shadow-lg overflow-hidden mb-4">
              <Image
                src={paljuData.mainImageUrl}
                alt="Pääkuva paljukärrystä"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {paljuData.galleryImages.map((src, index) => (
                <div
                  key={index}
                  className="relative h-32 rounded-lg shadow-md overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Gallerian kuva ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Oikea palsta: Tiedot */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {paljuData.name}
            </h1>
            <p className="mt-2 text-lg text-gray-600">{paljuData.capacity}</p>
            <p className="mt-4 text-base text-gray-700">
              {paljuData.description}
            </p>

            {/* Mitä sisältyy hintaan */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Vuokraukseen sisältyy aina:
              </h3>
              <ul className="mt-2 space-y-2">
                {paljuData.included.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hinnasto */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold text-center mb-4">
                Hinnasto (sis. alv 24%)
              </h3>
              <div className="space-y-2">
                {paljuData.pricing.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b pb-1"
                  >
                    <span className="text-gray-600">{item.period}</span>
                    <span className="font-semibold text-gray-900">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* === KORJATTU VARAUSKALENTERI-OSIO === */}
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-3xl font-bold text-center mb-6">Tee varaus</h2>
          <div className="max-w-2xl mx-auto">
            {/* Tässä kohtaa käytetään uutta, toimivaa komponenttia */}
            <BookingCalendar />
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center mt-12">
        <p>© 2025 PaljuVaraus - Kaikki oikeudet pidätetään.</p>
      </footer>
    </div>
  );
}
