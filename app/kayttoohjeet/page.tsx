import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Käyttöohjeet",
};

import { NextPage } from "next";
import Image from "next/image";
import Layout from "../../.next/types/routes";

const KayttoohjeetPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Paljukärryn käyttöohjeet</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Paljukärryn kuljetus</h2>
        <h3 className="font-semibold mb-4">Ennen kuljetusta tarkista, että:</h3>
        <ol className="list-decimal list-inside space-y-3">
          <li>
            Palju on tyhjennetty ja sen kansi on kiinni kaikilla kolmella
            kiinnitysremmillä.
          </li>
          <Image
            src="/kiinnitysremmi.webp"
            alt="Kuva paljun kannen kiinnitysremmistä"
            width={600}
            height={600}
          />
          <li>
            Kamiinan piippu on irroitettu kamiinasta ja varastoitu kärryn
            rappusten taakse.
          </li>
          <li>Kamiina on tyhjä ja sen luukku on kiinni.</li>
          <li>Kärryn päällä ei ole irtaimistoa.</li>
          <li>Kärryn rappuset on nostettu ylös ja kiinnitetty liinalla.</li>
          <li>
            Kärry on kiinnitetty auton vetokoukkuun, niin, että kuulakytkin on
            lukittunut vetokuulan ympärille.
          </li>
          <li>
            Nokkapyörä sekä kaikki tukijalat ovat ylhäällä ja kiristettyinä.
          </li>
          <li>Kärryn käsijarru ei ole päällä.</li>
          <li>
            Kärryn virtajohto on kiinnitetty vetoauton pistokkeeseen, ja että
            kärryn valot toimivat.
          </li>
          <li>Kärryn renkaat ovat ehjät ja niissä on ilmaa.</li>
          <li>
            Paljukärry on rekisteröity O1-luokan kevytperävaunuksi. Kärry painaa
            700 kg ja siinä jarrut. Sillä saa ajaa korkeintaan 100 km/h
            moottoritiellä.
          </li>
          <Image
            src="/nokkapyora.webp"
            alt="Kuva kärryn aisasta."
            width={600}
            height={600}
          />
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Paljukärryn käyttöönotto
        </h2>
        <ol className="list-decimal list-inside space-y-3">
          <li>
            Irrottaessasi paljukärryä vetoautosta, sijoita se mahdollisimman
            tukevalle ja tasaiselle alustalle. Laske nokkapyörää sen verran,
            että se osuu maahan, kun kärry irrotetaan auton vetokoukusta. Kun
            kärry on irti vetokoukusta ja nokkapyörä osuu maahan, kärryä pystyy
            siirtämään työntämällä ja vetämällä. Älä kuitenkaan yritä liikuttaa
            kärryä tällä tavalla jyrkässä ylä- tai alamäessä.
          </li>
          <li>
            Kamiinaa käytettäessä on huomioitava kipinävaara. Suositeltava
            turvaetäisyys rakennuksiin on 8 metriä.
          </li>
          <li>
            Aseta paljukärry lopulliseen paikkaansa, säädä se vaateriin
            nokkapyörästä ja kiristä käsijarru, jotta kärry pysyy paikallaan.
            Laske sitten tukijalat kärryn mukana tulevien tukipalojen päälle.
            Säädä tukijalkoja kunnes kärry on vakaa eikä keiku.
          </li>
          <Image
            src="/tukijalka.webp"
            alt="Kuva kärryn tukijalasta."
            width={600}
            height={600}
          />
          <li>
            Voit tarvittaessa käyttää kärryn tukemiseen myös pohjassa olevia
            kulmatukia, joita säädetään kärryn mukana tulevalla kahvalla.
          </li>
          <Image
            src="/kulmatuki.webp"
            alt="Kuva kärryn kulmatuesta ja kahvasta."
            width={600}
            height={600}
          />
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Paljun täyttö ja lämmitys
        </h2>
        <ol className="list-decimal list-inside space-y-3">
          <li>
            Tarkista, että poistoputken vesitulppa on kiinni ennen kuin alat
            täyttämään paljua.
          </li>
          <Image
            src="/poistoputki.webp"
            alt="Kuva paljun poistoputkesta ja vesitulpasta."
            width={600}
            height={600}
          />
          <li>
            Täytä palju mukana tulevalla letkulla käyttäen mahdollisimman
            puhdasta vettä.
          </li>
          <li>Laita kamiinan piippu paikoilleen ennen sytyttämistä.</li>
          <li>
            <strong>
              Sytytä kamiina vasta, kun vesi on vähintään 5 cm ylemmän kamiinan
              liitosputken yläpuolella!
            </strong>
          </li>
          <Image
            src="/vesiraja.webp"
            alt="Sytytä kamiina vasta, kun vesi on vähintään 5 cm ylemmän kamiinan
            liitosputken yläpuolella!"
            width={600}
            height={600}
          />
          <li>
            Käytä paljun lämmittämiseen kuivia polttopuita. Ohuet puut syttyvät
            helpommin kuin paksut, joten kamiinan sytytyksessä kannattaa käyttää
            ohuimpia puita. Sytykkeenä voit käyttää tuohta, sytytyspaloja, tai
            sanomalehteä.
          </li>
          <li>
            <strong>
              Kyllästetyn puun, talousjätteiden, roskien, muovien, lastulevyjen
              ym. polttaminen kamiinassa on ehdottomasti kielletty!
            </strong>
          </li>
          <li>
            Paljun lämmitys vie aikaa noin 2 – 4 tuntia riippuen veden
            alkulämpötilasta, ulkolämpötilasta, käytettävistä puista jne. Kannen
            pitäminen kiinni lyhentää lämmitysaikaa.
          </li>
          <li>
            Vesi kiertää automaattisesti kamiinan ja paljun välillä veden
            lämmetessä. Vettä kannattaa kuitenkin sekoittaa muutaman kerran
            lämmityksen aikana kun tarkistat veden lämpötilaa.
          </li>
          <li>
            Kun vesi alkaa olla noin 30-asteista, lisää puita maltillisesti.
            Veden ihannelämpötila on 37 astetta. Yli 40-asteinen vesi alkaa
            tuntua ennen pitkää epämukavalta, ja yli 45-asteinen vesi voi
            aiheuttaa jo muutamissa minuuteissa ensimmäisen asteen palovammoja.
          </li>
          <li>
            Mikäli lämpötila laskee pakkasen puolelle, pidäthän huolen siitä
            ettei vesi pääse jäätymään. Jäätynyt vesi rikkoo pahimmassa
            tapauksessa altaan ja kamiinan. Mikäli on riski jäätymiselle, vettä
            täytyy joko lämmittää kamiinalla, tai palju pitää tyhjentää.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Paljun tyhjennys ja puhdistaminen käytön jälkeen
        </h2>
        <ol className="list-decimal list-inside space-y-3">
          <li>
            <strong>
              Paljua ei saa missään vaiheessa tyhjentää jos kamiinassa on vielä
              tuli tai hiillos!
            </strong>
          </li>
          <li>
            Kiinnitä poistoletku rappusten puolella penkin alla olevaan
            poistoputkeen ja poista poistoputken sivussa oleva vesitulppa paljun
            tyhjentämiseksi.
          </li>
          <li>
            Kun palju on melkein tyhjä ja vielä kostea, voit käydä paljun
            sisäpinnan läpi rätillä tai pehmeällä harjalla, ja suihkuttaa
            irtolian pois vedellä.
          </li>
          <li>
            Pesuaineena voi käyttää esim. mäntysuopaa tai muuta kevyttä
            biohajoavaa saippuaa, mutta pesuaineen käyttäminen puhdistuksessa ei
            ole pakollista.{" "}
            <strong>
              Älä käytä paljun puhdistuksessa vahvoja syövyttäviä pesuaineita!
            </strong>
          </li>
          <li>
            Kun palju on tyhjennetty, kiinnitä poistoputken vesitulppa takaisin
            kujetusta varten.
          </li>
          <li>
            Laita kaikki paljukärryn mukana tulleet tarvikkeet (täyttö- ja
            tyhjennysletku, vedenlämpömittari, mela, kulmatukien kahva,
            tölkkiteline ja tukipalat) takaisin varustekassiin.
          </li>
          <li>Tyhjennä tuhkat kamiinasta.</li>
        </ol>
      </section>

      <section className="mb-8 p-4 border-l-4 border-red-500 bg-red-50">
        <h2 className="text-2xl font-semibold mb-4 text-red-800">
          Varoitukset ja huomiot
        </h2>
        <ul className="list-disc list-inside space-y-3 text-red-700">
          <li>
            Kamiinaa ei saa sytyttää ennen kuin palju on täytetty vedellä
            vähintään 5cm ylemmän kamiinan liitosputken yläpuolelle!
          </li>
          <li>
            Paljua ei saa tyhjentää jos kamiinassa on tuli tai hiillos. Mikäli
            palju pääsee tyhjenemään äkillisesti, tuli on sammutettava
            välittömästi kamiinasta.
          </li>
          <li>Vesi ei saa päästä jäätymään paljuun tai kamiinaan.</li>
          <li>Paljun reunoilla ei saa istua tai seistä.</li>
          <li>
            Pidä säilytyksen aikana kansi paljun päällä kiinnitysremmeillä
            kiinnitettynä, jotta tuuli ei vie kantta.
          </li>
          <li>
            Paljun rappuset ja pinnat voivat olla kosteina liukkaat, varsinkin
            kun vesi jäätyy niihin. Liiku rauhallisesti.
          </li>
          <li>
            Pidäthän huolen, että kukaan ei polta itseään kuumaan kamiinaan tai
            savupiippuun.
          </li>
          <li>
            Paljun ulkoreunaa ympäröivät metallivanteet voivat kuumentua
            polttavaksi porottavassa auringonpaisteessa, joten vältä niihin
            koskemista tällaisissa olosuhteissa.
          </li>
          <li>
            Kylpytynnyriin tulee kuumaa vettä ylemmästä kamiinan liitosaukosta,
            vältä istumista tällä paikalla.
          </li>
          <li>
            Juo kylpemisen aikana vettä tai muita alkoholittomia nesteitä
            riittävästi pitääksesi huolta kehosi nestetasapainosta.
          </li>
          <li>
            Valvo aina lasten kylpyhetkiä, varsinkin jos he eivät osaa uida.
          </li>
          <li>
            <strong>Hyppiminen paljuun on kielletty!</strong> Paljuun
            kiipeäminen ja sieltä pois nouseminen tehdään rappusien kautta.
          </li>
          <li>
            Paljun on oltava täysin tyhjä vedestä ennen paljukärryn kuljetusta.
          </li>
          <li>Nostakaa paljun kansi aina vähintään kahden henkilön voimin.</li>
        </ul>
      </section>
    </div>
  );
};

export default KayttoohjeetPage;
