import { NextPage } from "next";

const VuokrausehdotPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="background-#ededed text-4xl font-bold mb-6">
        Yleiset vuokrausehdot
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Vuokra-aika</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Yhden vuorokauden mittaisissa vuokrissa vuokra-aika sovitaan
            tapauskohtaisesti. Olemme joustavia tämän suhteen.
          </li>
          <li>
            Vuokra-aika on aina vähintään 20 tuntia. Jos tuotetta käytetään vain
            yhdessä tapahtumassa, sen voi yleensä noutaa jo edeltävänä päivänä
            ja palauttaa tapahtuman jälkeisenä päivänä.
          </li>
          <li>
            Pidemmät vuokraukset ovat sovittavissa joustavasti
            tapauskohtaisesti.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Käyttö</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Vuokravälineitä käytetään aina vuokraajan omalla vastuulla.</li>
          <li>
            Vuokraaja on velvollinen käsittelemään välineitä ohjeiden mukaisesti
            huolellisesti ja siten, että ne eivät vahingoitu tai katoa.
          </li>
          <li>Välineet tarkistetaan ennen ja jälkeen vuokrauksen.</li>
          <li>
            Jälleenvuokraaminen kolmannelle osapuolelle on kielletty ilman
            vuokranantajan kirjallista hyväksyntää.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Ilmoitusvelvollisuus</h2>
        <p>
          Vuokraaja on velvollinen ilmoittamaan viipymättä vuokranantajalle, jos
          välineet katoavat, vahingoittuvat tai niissä ilmenee vikoja.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Korvausvelvollisuus</h2>
        <p>
          Vuokraaja on velvollinen korvaamaan vuokravälineiden katoamisesta tai
          vahingoittumisesta aiheutuneet kustannukset niiden käyvän arvon
          mukaisesti.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Palauttaminen</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Jos vuokrattua kohdetta ei palauteta sovittuun aikaan mennessä,
            myöhästymisestä veloitetaan vuokraajalle ja seuraaville asiakkaille
            aiheutuneet kohtuulliset kulut, kuitenkin vähintään 50 €.
          </li>
          <li>
            Vuokravälineet on palautettava samassa kunnossa kuin ne oli
            vuokrattaessa.
          </li>
          <li>
            Likaisten välineiden puhdistuksesta veloitetaan 50 €/h, vähintään 50
            €.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          6. Varauksen peruuttaminen
        </h2>
        <p className="mb-2">
          Peruutus tehdään sähköpostitse osoitteeseen myynti@happybeavers.fi.
        </p>
        <p>Jos varaus peruutetaan:</p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>
            <strong>Yli 30 vrk</strong> ennen vuokrausajankohtaa: maksettu
            vuokra palautetaan kokonaisuudessaan.
          </li>
          <li>
            <strong>29–3 vrk</strong> ennen varausta: peruutusmaksu 50 €.
          </li>
          <li>
            <strong>Alle 3 vrk</strong> ennen varausta: peruutusmaksu 150 € tai
            tuotteen vuokrahinta, jos se on pienempi kuin 150 €.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Toimitus ja nouto</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Toimitusmaksu sisältää toimituksen ja noudon arkisin klo 08:00–17:00
            ja lauantaisin klo 09:00–16:00.
          </li>
          <li>
            Sunnuntaisin ja muina aikoina toimitus/nouto sovitaan erikseen.
          </li>
        </ul>
        <h3 className="text-xl font-semibold my-3">
          Esimerkkejä toimitusaikatauluista:
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Lauantain tilaus:</strong> Toimitus perjantaina tai
            lauantaina. Nouto lauantaina klo 16:00 mennessä tai maanantaina.
          </li>
          <li>
            <strong>Sunnuntain tilaus:</strong> Toimitus perjantaina tai
            lauantaina, nouto maanantaina.
          </li>
        </ul>
      </section>

      <hr className="my-12" />

      <h1 className="text-4xl font-bold mb-6">Erilliset ehdot paljuille</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Asiakkaan omavastuu</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Asiakas on vastuussa paljulle ja perävaunulle aiheutuneista
            vaurioista paljuyhdistelmän korvausarvoon 5 500 € saakka.
          </li>
          <li>
            Jos kylpytynnyriä ei palauteta muun kuin teknisen vian vuoksi,
            asiakas sitoutuu maksamaan täyden 5 500 € korvausarvon.
          </li>
          <li>
            Vauriotapauksissa paljun kunnostustyö veloitetaan 70 €/h,
            omavastuuseen saakka.
          </li>
          <li>
            Paljukärryillä on liikenne- ja kaskovakuutus. Liikennevahingoissa
            vakuutusyhtiön korvatessa vauriot omavastuu on 500 €.
          </li>
          <li>
            Vuokrauksen aikana hävinneet tai vaurioituneet varusteet veloitetaan
            erillisen hinnaston mukaan.
          </li>
        </ul>
        <h3 className="text-xl font-semibold my-3">
          Vaurioiden välttämiseksi huomioi seuraavat ohjeet:
        </h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Perävaunua ei saa kuljettaa siten, että tynnyrissä on vettä.</li>
          <li>
            Perävaunu tulee sijoittaa tasaiselle alustalle ennen paljun
            täyttämistä. Tukijalat asennetaan vasta, kun vettä on täytetty
            penkkien tasalle.
          </li>
          <li>
            Puukamiinaa ei saa sytyttää, jos vesi ei ole ylemmän putken
            yläpuolella. Kamiinan sulaminen johtaa 750 € korvausvelvollisuuteen.
          </li>
          <li>
            Kamiinaa käytettäessä on huomioitava kipinävaara. Suositeltava
            turvaetäisyys rakennuksiin on 8 metriä.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. Vahinkojen ilmoitusvelvollisuus
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Vuokrauksen alussa palju tarkastetaan yhdessä asiakkaan kanssa, ja
            mahdolliset viat kirjataan ylös.
          </li>
          <li>
            Vuokrauksen aikana syntyneet viat on ilmoitettava välittömästi
            vuokranantajalle.
          </li>
          <li>
            Jos vikoja havaitaan vasta palautuksen jälkeen, ne katsotaan
            asiakkaan aiheuttamiksi, ellei asiakas ole ilmoittanut niistä
            aiemmin.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. Varauksen peruuttaminen
        </h2>
        <p className="mb-2">
          Peruutus tehdään ottammalla yhteyttä joko puhelimitse tai
          sähköpostitse.
        </p>
        <p>Jos varaus peruutetaan:</p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>
            <strong>Yli 30 vrk</strong> ennen vuokrausajankohtaa: maksettu
            vuokra palautetaan kokonaisuudessaan.
          </li>
          <li>
            <strong>29–3 vrk</strong> ennen varausta: peruutusmaksu 50 €.
          </li>
          <li>
            <strong>Alle 3 vrk</strong> ennen varausta: peruutusmaksu 150 € tai
            tuotteen vuokrahinta, jos se on pienempi kuin 150 €.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Paljun puhdistaminen</h2>
        <p className="mb-2">
          Palju tulee puhdistaa ennen palautusta, ellei muuta ole sovittu.
        </p>
        <p>Puhdistus sisältää:</p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>Tynnyrin sisäpintojen pyyhkimisen ja huuhtelun.</li>
          <li>Kamiinan tyhjentämisen.</li>
          <li>Paljun ulkoisen siistimisen.</li>
        </ul>
        <p className="mt-2">
          Mikäli palju palautetaan likaisena, siivous veloitetaan 50 €/h,
          vähintään 50 €.
        </p>
      </section>

      <p className="text-sm text-gray-600 mt-12">
        Nämä ehdot ovat voimassa toistaiseksi ja niitä voidaan päivittää
        tarvittaessa.
      </p>
    </div>
  );
};

export default VuokrausehdotPage;
