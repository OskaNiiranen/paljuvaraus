import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vuokrausehdot",
};

import { NextPage } from "next";
import Link from "next/link";

const VuokrausehdotPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Vuokrausehdot</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Ehtojen hyväksyminen</h2>
        <p className="mb-2">
          Hyväksyessään nämä vuokrausehdot, asiakas sitoutuu lukemaan ehdot ja{" "}
          <Link
            href="/kayttoohjeet"
            className="text-blue-800 hover:text-blue-500 transition-colors"
          >
            paljukärryn käyttöohjeet{" "}
          </Link>
          kokonaisuudessaan sekä toimimaan niiden mukaisesti. Asiakas on myös
          vastuussa siitä, että hän ohjeistaa kaikki muut paljukärryä käyttävät
          henkilöt toimimaan samoin.
        </p>
        <p className="mb-2">
          Jos havaitaan, että asiakas on laiminlyönyt vuokrausehdoissa tai
          käyttöohjeissa mainittuja toimintatapoja, Palju Paikka ei ole
          vastuussa paljukärryn käytöstä käyttäjille tai heidän omaisuudelleen
          aiheutuneista vahingoista.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. Vuokra-aika ja toimitus
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Vuokra-aika alkaa, kun paljukärry luovutetaan asiakkaalle, ja
            päättyy, kun se palautetaan vuokranantajalle sovitusti.
          </li>
          <li>
            Noudot ja palautukset tehdään arkisin klo 9:00–16:00 ja
            viikonloppuisin sopimuksen mukaan.
          </li>
          <li>
            <strong>Toimitus:</strong> Jos asiakas valitsee toimituspalvelun,
            paljukärry toimitetaan vuokrapäivänä klo 9:00–16:00 välisenä aikana.
          </li>
          <li>
            <strong>Nouto:</strong> Jos asiakas valitsee noutopalvelun,
            paljukärry noudetaan viimeistä vuokrapäivää seuraavana päivänä klo
            9:00–16:00. Esimerkiksi, jos varaus on pe–la, nouto on sunnuntaina.
          </li>
          <li>
            <strong>Toimipiste:</strong> Paljukärry noudetaan ja palautetaan
            osoitteeseen Lintulehdonkuja 57, 04500 Kellokoski, ellei toisin
            sovita.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Maksuehdot</h2>
        <p className="mb-2">
          Vuokra maksetaan laskulla, joka toimitetaan asiakkaan sähköpostiin.
          Maksuohjeet löytyvät laskulta.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          4. Varauksen peruuttaminen
        </h2>
        <p>
          Peruutukset tulee tehdä sähköpostitse osoitteeseen{" "}
          <a
            href="mailto:info@paljupaikka.fi"
            className="text-blue-800 hover:text-blue-500 transition-colors"
          >
            info@paljupaikka.fi
          </a>
          , mieluiten vastaamalla saamaasi tilausvahvistukseen.
        </p>
        <p>
          Peruutusaika lasketaan kokonaisina vuorokausina vuokrauksen
          alkamispäivään.
        </p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>
            <strong>Yli 14 vrk</strong> ennen vuokrausta: maksu palautetaan
            kokonaisuudessaan.
          </li>
          <li>
            <strong>7–14 vrk</strong> ennen vuokrausta: 75 % vuokrasta
            palautetaan.
          </li>
          <li>
            <strong>2–6 vrk</strong> ennen vuokrausta: 50 % vuokrasta
            palautetaan.
          </li>
          <li>
            <strong>Alle 2 vrk</strong> ennen vuokrausta: vuokraa ei palauteta.
          </li>
          <li>
            Toimitus- ja lisäpalvelukulut palautetaan aina kokonaisuudessaan.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          5. Vuokrauksesta kieltäytyminen
        </h2>
        <p>
          Vuokranantajalla on oikeus kieltäytyä luovuttamasta paljukärryä, jos
          havaitaan vakavia turvallisuuspuutteita, kuten:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>Asiakkaan päihtymys.</li>
          <li>
            Vetoajoneuvon liikenneturvallisuutta vaarantava kunto (esim.
            vialliset valot, renkaat, tai vetokoukku).
          </li>
        </ul>
        <p className="mt-2">
          Jos luovutus estyy asiakkaasta johtuvasta syystä, vuokramaksua ei
          palauteta. Jos luovutus estyy vuokranantajasta johtuvasta syystä,
          vuokramaksu ja muut maksut hyvitetään.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          6. Asiakkaan velvollisuudet ja vastuu
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Asiakkaan on hoidettava paljukärryä ja sen varusteita huolellisesti.
          </li>
          <li>
            Asiakas vakuuttaa, että hänellä on vaadittava ajokortti ja
            lainsäädännön mukainen vetoajoneuvo paljukärryn vetämiseen (omapaino
            700 kg, jarrullinen).
          </li>
          <li>
            Paljukärryä ei saa viedä Suomen rajojen ulkopuolelle ilman
            kirjallista lupaa.
          </li>
          <li>
            Paljukärryn vuokraaminen kolmannelle osapuolelle on kielletty.
          </li>
          <li>
            Asiakas on velvollinen ilmoittamaan vuokranantajalle välittömästi
            kaikista vioista, vahingoista tai puutteista.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          7. Viat ja korvausvelvollisuus
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Paljukärry tarkastetaan yhdessä asiakkaan kanssa vuokrauksen alussa
            ja lopussa. Mahdolliset viat kirjataan ylös.
          </li>
          <li>
            Asiakas on korvausvelvollinen kaikista vahingoista, jotka johtuvat
            käyttöohjeiden tai vuokrausehtojen laiminlyönnistä.
          </li>
          <li>
            Palautuksen jälkeen havaitut viat katsotaan asiakkaan aiheuttamiksi,
            ellei niistä ole ilmoitettu aiemmin.
          </li>
          <li>
            Paljukärryllä on liikenne- ja kaskovakuutus. Liikennevahingon
            sattuessa asiakkaan omavastuu on 500 €.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          8. Paljun puhdistus ja palautus
        </h2>
        <p className="mb-2">
          Palju on palautettava puhdistettuna. Puhdistukseen kuuluu:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>Paljun sisäpintojen pesu ja huuhtelu.</li>
          <li>Kamiinan tyhjennys.</li>
          <li>Yleinen siistiminen.</li>
        </ul>
        <p className="mt-2">
          Jos palju palautetaan likaisena, veloitamme siivouksesta 50 €.
        </p>
      </section>

      <p className="text-sm text-gray-600 mt-12">
        Nämä ehdot ovat voimassa toistaiseksi. Palju Paikka pidättää oikeuden
        muutoksiin.
      </p>
    </div>
  );
};

export default VuokrausehdotPage;
