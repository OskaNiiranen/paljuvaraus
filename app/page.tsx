import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen">
        {/* Taustakuva */}
        {/* Kuva ladataan nyt public-kansiosta. */}
        <Image
          src="/IMG_20201104_150509__01.jpg" // KORJATTU POLKU
          alt="Tunnelmallinen kuva paljusta"
          layout="fill"
          objectFit="cover"
          quality={85}
          className="-z-10" // Asettaa kuvan taustalle
          priority // Lataa kuvan heti, koska se on tärkeä osa sivua
        />
        {/* Tumma peittokuva tekstin luettavuuden parantamiseksi */}
        <div className="absolute inset-0 bg-black opacity-40 -z-10"></div>

        {/* Hero-osion sisältö */}
        <div className="z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Vuokraa palju ja nauti elämyksestä
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-md">
            Helppo online-varaus, aina puhtaat ja laadukkaat paljut. Löydä
            täydellinen palju rentoutumiseen ja juhliin.
          </p>
          <Link
            href="/paljut" // Tämä linkki vie tulevaisuudessa paljujen selaussivulle
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg px-8 py-4 transition-transform transform hover:scale-105 shadow-xl"
          >
            Selaa paljuja ja varaa
          </Link>
        </div>
      </section>

      {/* Tähän alle voidaan lisätä muita osioita, kuten "Miksi valita meidät?" */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-8">Miksi valita PaljuVaraus?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ominaisuus 1 */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                Helppo Online-Varaus
              </h3>
              <p className="text-gray-600">
                Varaa palju muutamassa minuutissa, milloin tahansa.
              </p>
            </div>
            {/* Ominaisuus 2 */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                Aina Puhtaat Paljut
              </h3>
              <p className="text-gray-600">
                Panostamme hygieniaan, jotta kokemuksesi on täydellinen.
              </p>
            </div>
            {/* Ominaisuus 3 */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Selkeät Ohjeet</h3>
              <p className="text-gray-600">
                Saat kattavat ohjeet paljun käyttöön ja noutoon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tähän tulee myöhemmin Footer-komponentti */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 PaljuVaraus - Kaikki oikeudet pidätetään.</p>
      </footer>
    </main>
  );
}
