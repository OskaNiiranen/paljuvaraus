# PaljuVaraus Web-Applikaatio

Tämä on web-applikaatio paljukärryjen vuokraukseen. Sovelluksen avulla asiakkaat voivat selata saatavilla olevia paljukärryjä, tarkistaa niiden saatavuuden ja tehdä varauksia. Ylläpitäjälle on (tai tulee olemaan) oma näkymä varausten ja kaluston hallintaan.

## Tavoitteet

* Tarjota helppokäyttöinen käyttöliittymä asiakkaille paljujen varaamiseen.
* Näyttää selkeästi paljujen tiedot, kuvat ja saatavuuskalenteri.
* Mahdollistaa yhteydenotto ja varauspyyntöjen lähettäminen.
* (Tulevaisuudessa) Tarjota ylläpitäjälle työkaluja varausten ja paljukaluston hallintaan.
* (Tulevaisuudessa) Mahdollistaa online-maksut.

## Teknologiat

* **Frontend:** Next.js (React-framework)
* **Ohjelmointikieli:** TypeScript (suositus) / JavaScript
* **Tyylit:** Tailwind CSS (suositus) / CSS Modules / muu CSS-ratkaisu
* **Versionhallinta:** Git & GitHub
* **Backend (suunniteltu/alkuvaihe):**
    * Next.js API Routes (yhteydenottolomake, alkuvaiheen varauslogiikka)
    * (Tulevaisuudessa/Harkinnassa) Strapi.io (Headless CMS paljujen tietojen ja varausten hallintaan) / Supabase / Firebase / muu tietokantaratkaisu
* **Kehitysympäristö:** VS Code

## Projektin Käynnistäminen Paikallisesti

1.  **Kloonaa repositorio:**
    ```bash
    git clone [https://github.com/OskaNiiranen/PaljuVaraus]
    cd [projektikansion-nimi]
    ```

2.  **Asenna riippuvuudet:**
    ```bash
    npm install
    # tai
    # yarn install
    # tai
    # pnpm install
    ```

3.  **Määritä ympäristömuuttujat (Environment Variables):**
    * Kopioi `.env.example` tiedosto (jos sellainen on tai luo se myöhemmin) uudeksi tiedostoksi nimeltä `.env.local`.
    * Lisää tarvittavat ympäristömuuttujat `.env.local` -tiedostoon. Alkuvaiheessa tämä voi olla tyhjä, mutta hyvä käytäntö on mainita se heti.
        ```
        # .env.local (esimerkki, alkuun ei välttämättä tarvita mitään)
        # NEXT_PUBLIC_SOME_API_KEY=arvo
        ```

4.  **Käynnistä kehityspalvelin:**
    ```bash
    npm run dev
    # tai
    # yarn dev
    # tai
    # pnpm dev
    ```
    Sovelluksen pitäisi nyt olla saatavilla osoitteessa `http://localhost:3000`.

## Projektin Rakenne (Keskeiset Kansiot)

* `app/`: Sisältää Next.js App Routerin mukaiset sivut ja reitit.
    * `layout.tsx`: Pääasettelu, joka ympäröi kaikkia sivuja.
    * `page.tsx`: Yksittäisen reitin (sivun) sisältö.
* `components/`: Uudelleenkäytettävät React-komponentit (esim. Navbar, Footer, PaljuKortti).
* `public/`: Staattiset tiedostot, kuten kuvat ja fontit.
* `lib/` tai `utils/`: (Valinnainen, mutta suositeltu) Apuohjelmat, datan noutoon liittyvät funktiot, jne.
* `data/`: (Valinnainen) Paikalliset datatiedostot (esim. `paljut.json` alkuvaiheessa).

## Git-haarojen Käytäntö

* `main`: Tuotantoversio. Tähän haaraan yhdistetään vain testattu ja toimiva koodi `dev`-haarasta.
* `dev`: Pääkehityshaara. Kaikki uudet ominaisuudet ja korjaukset kehitetään ensin ominaisuuskohtaisissa haaroissa (esim. `feature/contact-form`) ja yhdistetään `dev`-haaraan Pull Requestien kautta.

## Tehtävälista / Roadmap (Ylätaso)

* [ ] Perusprojektin pystytys ja sivurakenne (Etusivu, Paljut, Yhteystiedot)
* [ ] Paljujen tietojen näyttäminen (aluksi staattisesti/JSON-tiedostosta)
* [ ] Yhteydenottolomake
* [ ] Varauskalenterin perusversio (päivämäärien valinta)
* [ ] Varauslogiikan MVP (esim. varauspyyntö sähköpostiin)
* [ ] (Tulevaisuudessa) Ylläpitonäkymä
* [ ] (Tulevaisuudessa) Online-maksut

---

_Tämä README-tiedosto päivittyy projektin edetessä._
