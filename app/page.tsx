import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen">
        {/* Taustakuva */}
        <Image
          src="/palju1.jpg"
          alt="Tunnelmallinen kuva paljusta"
          layout="fill"
          objectFit="cover"
          quality={85}
          className="-z-10"
          priority
        />
        {/* Tumma peittokuva tekstin luettavuuden parantamiseksi */}
        <div className="absolute inset-0 bg-black opacity-40 -z-10"></div>

        {/* Hero-osion sisältö */}
        <div className="z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Vuokraa paljukärrymme helposti, huoletta ja hyvään hintaan!
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-md">
            Etsitkö paljukärryä juhliin, viikonlopuksi tai lomalle? Olet
            oikeassa paikassa! Meiltä varaaminen on helppoa, ja teet sen
            mutkattomasti ilman sisäänkirjautumista tai markkinointiviestejä.
            Halutessasi saat paljukärrymme pihallesi toimitettuna ja koivuklapit
            mukana, joten ei muuta kuin palju lämpimäksi ja kylpemään!
          </p>
          <Link
            href="/paljut"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg px-8 py-4 transition-transform transform hover:scale-105 shadow-xl"
          >
            Tutustu ja varaa
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
                Helppo ja huoleton Online-varaus
              </h3>
              <p className="text-gray-600">
                Ymmärrämme asiakaskokemuksen ja yksityisyyden tärkeyden. Siksi
                emme vaadi sisäänkirjautumista, käytä seurantakoodeja,
                markkinointievästeitä tai lähetä uutiskirjeitä. Tietojasi
                käytetään ainoastaan varauksesi käsittelyyn.
              </p>
            </div>
            {/* Ominaisuus 2 */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Aina puhdas palju</h3>
              <p className="text-gray-600">
                Hygienia on meille ensiarvoisen tärkeää. Siksi pesemme ja
                desinfioimme paljun perusteellisesti jokaisen vuokrauksen
                jälkeen, ilman lisämaksua. Kun vuokraat paljukärryn meiltä, voit
                olla varma sen puhtaudesta ja turvallisuudesta.
              </p>
            </div>
            {/* Ominaisuus 3 */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                Laatu ja turvallisuus
              </h3>
              <p className="text-gray-600">
                Panostamme turvallisuuteen. Paljukärryssämme on tukevat kaiteet
                ja rappuset, joiden avulla liikkuminen kärryssä ja paljuun
                nouseminen on turvallista. Lisäksi kahdeksan tukijalkaa
                varmistavat, että kärry pysyy tukevasti ja tasaisesti
                paikoillaan myös epätasaisella alustalla.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
