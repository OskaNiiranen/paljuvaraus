"use client"; // Tarvitaan, koska käytämme useState-hookia

import { useState } from "react";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import BookingCalendar from "@/components/BookingCalendar";

// Data tälle yhdelle paljulle.
const paljuData = {
  name: "Käsinrakennettu Paljukärrymme",
  capacity: "7 henkilölle",
  description:
    "Paljukärrymme on rekisteröity ja vakuutettu tieliikennekäyttöön, joten voit kuljettaa sitä huoletta B-ajokortilla. Turvallisuuden takaamiseksi kärryssä on tukevat kaiteet ja rappuset, joiden avulla liikkuminen kärryssä ja paljuun nouseminen on turvallista. Lisäksi kahdeksan tukijalkaa varmistavat, että kärry pysyy tukevasti ja tasaisesti paikoillaan jopa epätasaisella alustalla. Palju lämpenee tehokkaalla 35 kW kamiinalla, jossa on vesivaippa, joten sen ulkopinta ei pääse ylikuumenemaan. Paljuun mahtuu 1540 litraa vettä, joka lämpenee noin 2 tunnissa 37 asteeseen. Tämä vaatii noin 40 litraa koivuklapeja, kunhan kansi on kiinni lämmityksen ajan. Hygienia on meille ensiarvoisen tärkeää. Siksi palju on aina pesty ja desinfioitu perusteellisesti ennen jokaista luovutusta.",
  included: [
    "Palikat kärryn jalkojen alle tasaiseen asennukseen",
    "Letkut paljun täyttöä ja tyhjennystä varten",
    "Kelluva vedenlämpömittari",
    "Paljun kylkeen asetettava juomateline",
    "Paljun pesu vuokrauksen jälkeen",
  ],
  pricing: [
    { period: "Vuorokausi (ma-to)", price: "70€" },
    { period: "Viikonloppu vuorokausi (pe, la tai su)", price: "100€" },
    { period: "Koko viikonloppu (pe-su)", price: "250€" },
    { period: "Koko viikko", price: "300€" },
  ],
  // Yhdistetty kaikki kuvat yhteen listaan
  images: ["/palju1.jpg", "/palju2.jpg", "/palju3.jpg", "/palju4.jpg"],
};

export default function PaljuEsittelySivu() {
  // Tila (state), joka pitää kirjaa aktiivisesta kuvasta.
  // Oletuksena näytetään listan ensimmäinen kuva.
  const [activeImage, setActiveImage] = useState(paljuData.images[0]);

  return (
    <div className="bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Vasen palsta: Kuvat */}
          <div className="lg:col-span-3">
            {/* Iso kuva-container */}
            <div className="relative h-96 w-full rounded-xl shadow-lg overflow-hidden mb-4">
              <Image
                key={activeImage} // Avain auttaa Reactia tunnistamaan kuvan vaihdon
                src={activeImage}
                alt="Valittu kuva paljukärrystä"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Pienet galleriakuvat */}
            <div className="grid grid-cols-4 gap-4">
              {paljuData.images.map((src, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(src)}
                  className={`relative h-24 rounded-lg shadow-md overflow-hidden transition-all duration-200 ${
                    activeImage === src
                      ? "ring-2 ring-blue-500 ring-offset-2" // Korostus aktiiviselle kuvalle
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Gallerian kuva ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
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
          </div>
        </div>

        {/* Varauskalenteri ja Hinnasto -osio */}
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-3xl font-bold text-center mb-10">
            Varauskalenteri
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Vasen palsta: Kalenteri */}
            <div className="lg:col-span-3">
              <BookingCalendar />
            </div>

            {/* Oikea palsta: Hinnasto */}
            <div className="lg:col-span-2">
              <div className="sticky top-8 bg-white p-6 rounded-lg shadow-lg border">
                <h3 className="text-xl font-bold text-center mb-4">Hinnasto</h3>
                <div className="space-y-2">
                  {paljuData.pricing.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b py-2"
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
        </div>
      </main>
    </div>
  );
}
