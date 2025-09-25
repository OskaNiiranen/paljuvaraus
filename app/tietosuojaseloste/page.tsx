import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tietosuojaseloste",
};

export default function TietosuojaselostePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tietosuojaseloste</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Rekisterinpitäjä</h2>
          <p>
            Palju Paikka
            <br />
            Y-tunnus: 3534960-8
            <br />
            Metallimiehenkatu 1 C 90
            <br />
            04410 Järvenpää
            <br />
            <a href="mailto:info@paljupaikka.fi">info@paljupaikka.fi</a>
            <br />
            <a href="tel:0400444979">0400 444 979</a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Asiakastietojen käyttötarkoitus ja käsittely
          </h2>
          <p>
            Keräämme ja käsittelemme asiakastietoja asiakassuhteen hoitamiseksi,
            varausten hallinnoimiseksi, laskutukseen ja palveluidemme
            toimittamiseen. Tietoja käytetään myös lakisääteisten velvoitteiden,
            kuten kirjanpidon, täyttämiseen.
          </p>
          <br />
          <p className="mt-2">
            Asiakkaan tietoja (kuten nimi, sähköpostiosoite ja puhelinnumero)
            käytetään yhteydenpitoon, joka liittyy varaukseen, kuten
            varausvahvistusten, laskujen, ohjeiden, tai pyyntöjen lähettämiseen.
            Emme luovuta tietoja kolmansille osapuolille
            markkinointitarkoituksiin.
          </p>
          <br />
          <p>
            Tietokannassa olevat asiakastiedot säilytetään luottamuksellisina.
            Tietoverkko ja laitteisto, jolla tietoja säilytetään on suojattu
            palomuurilla ja muilla tarvittavilla teknisillä toimenpiteillä.
            Tietojen siirto lomakkeiden avulla on sähköisesti suojattu.
          </p>
          <br />
          <p>
            Asiakkaalla on oikeus tarkastaa häntä koskevat tietokannassa olevat
            asiakastiedot ja pyytää ne poistettavaksi. Tarkastuspyyntö voidaan
            tehdä sähköpostitse tai puhelimitse. Tarkastuspyyntöihin vastataan
            mahdollisimman nopeasti.
          </p>
          <br />
          <h2 className="text-2xl font-semibold mb-2">Evästeet</h2>
          <p>Emme käytä verkkosivuillamme evästeitä.</p>
          <br />
          <p className="text-sm text-gray-600 mt-12">
            Nämä ehdot ovat voimassa toistaiseksi. Palju Paikka pidättää
            oikeuden muutoksiin.
          </p>
        </section>
      </div>
    </main>
  );
}
