# PaljuVaraus Web-Applikaatio

Tämä on web-applikaatio paljukärryjen vuokraukseen. Sovelluksen avulla asiakkaat voivat selata saatavilla olevia paljukärryjä, tarkistaa niiden saatavuuden ja tehdä varauksia. Ylläpitäjälle on (tai tulee olemaan) oma näkymä varausten ja kaluston hallintaan.

## Tavoitteet

- Tarjota helppokäyttöinen käyttöliittymä asiakkaille paljujen varaamiseen.
- Näyttää selkeästi paljujen tiedot, kuvat ja saatavuuskalenteri.
- Mahdollistaa yhteydenotto ja varauspyyntöjen lähettäminen.
- (Tulevaisuudessa) Tarjota ylläpitäjälle työkaluja varausten ja paljukaluston hallintaan.
- (Tulevaisuudessa) Mahdollistaa online-maksut.

## Teknologiat

- **Frontend:** Next.js (React-framework)
- **Ohjelmointikieli:** TypeScript (suositus) / JavaScript
- **Tyylit:** Tailwind CSS (suositus) / CSS Modules / muu CSS-ratkaisu
- **Versionhallinta:** Git & GitHub
- **Backend (suunniteltu/alkuvaihe):**
  - Next.js API Routes (yhteydenottolomake, alkuvaiheen varauslogiikka)
  - (Tulevaisuudessa/Harkinnassa) Strapi.io (Headless CMS paljujen tietojen ja varausten hallintaan) / Supabase / Firebase / muu tietokantaratkaisu
- **Kehitysympäristö:** VS Code

## Projektin Käynnistäminen Paikallisesti

1.  **Kloonaa repositorio:**

    ```bash
    git clone [https://github.com/OskaNiiranen/PaljuVaraus](https://github.com/OskaNiiranen/PaljuVaraus)
    cd PaljuVaraus
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

    - Luo projektin juureen `.env.local` -tiedosto (kopioi `.env.example` jos sellainen on).
    - Lisää tarvittavat ympäristömuuttujat. Esimerkki:
      ```
      # .env.local
      # NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
      # NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
      # NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
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

- `app/`: Sisältää Next.js App Routerin mukaiset sivut ja reitit.
  - `layout.tsx`: Pääasettelu, joka ympäröi kaikkia sivuja.
  - `page.tsx`: Yksittäisen reitin (sivun) sisältö.
- `components/`: Uudelleenkäytettävät React-komponentit (esim. Navbar, Footer, PaljuKortti).
- `public/`: Staattiset tiedostot, kuten kuvat ja fontit.
- `lib/` tai `utils/`: (Valinnainen, mutta suositeltu) Apuohjelmat, datan noutoon liittyvät funktiot, jne.
- `data/`: (Valinnainen) Paikalliset datatiedostot (esim. `paljut.json` alkuvaiheessa).

## Git-haarojen Käytäntö

- `main`: Tuotantoversio. Tähän haaraan yhdistetään vain testattu ja toimiva koodi `dev`-haarasta.
- `dev`: Pääkehityshaara. Kaikki uudet ominaisuudet ja korjaukset kehitetään ensin ominaisuuskohtaisissa haaroissa (esim. `feature/contact-form`) ja yhdistetään `dev`-haaraan Pull Requestien kautta.

---

## Kehityksen Edistyminen ja Tehtävälista

**PÄIVITETTY: [16.07.2025]**

**NYT TYÖN ALLA / SEURAAVAKSI:**

- **[Vaihe 1: Perussivusto ja Staattinen Sisältö]**
  - _[Tarkempi alitehtävä tai huomio]_
  - _[Toinen alitehtävä tai huomio]_

---

### Vaihe 0: Perustukset ja Suunnittelu

_Tavoite: Työkalut ja perussuunnitelma valmiina kehityksen aloittamiseen._

- [Tehty] **Projektinhallinta:** Valittu työkalu (esim. tämä README ja GitHub Issues). Päätoiminnallisuudet listattu.
  - _Miten tehty:_ [Lyhyt kuvaus tai linkki kuviin, jos tallessa digitaalisesti]
- [Tehty] **Teknologiavalinnat:** Vahvistettu (Next.js, TypeScript, Tailwind CSS).
- [Tehty] **Kehitysympäristö:**

  - [Tehty] VS Code asennettu ja peruslisäosat (Prettier, ESLint, GitLens).
  - [Tehty] GitHub-repositorio luotu (`main` ja `dev` haarat).
  - `main` luotu, lokaali ja GiHub-repositorio linkitetty. Seuraavaksi `dev`. Nyt myös `dev` luotu.
  - [Tehty] Next.js-projekti alustettu TypeScriptillä.

    - Node.js ja riippuvuudet ladattu projektiin
      Installing dependencies:

      - react
      - react-dom
      - next

      Installing devDependencies:

      - typescript
      - @types/node
      - @types/react
      - @types/react-dom
      - @tailwindcss/postcss
      - tailwindcss

  - [Tehty] Paikallinen projekti yhdistetty GitHubiin.
  - [Tehty] **README.md:** Tämä README-tiedosto luotu ja päivitetty.

---

### Vaihe 1: Perussivusto ja Staattinen Sisältö

_Tavoite: Näkyvä sivuston runko, jossa on perusinformaatio ja navigointi._

- [Tehty] **Sivupohjat (Layout & Peruskomponentit):**
  - [x] `Layout.tsx` (sis. Navigaatio, Footer-komponentit).
    - Layout vielä työn alla.
  - [x] Sivukomponentit (`app/page.tsx`, `app/paljut/page.tsx`, `app/paljut/[id]/page.tsx`, `app/yhteystiedot/page.tsx`).
    - Hero, esittelysivu/varauskalenteri ja kassa-sivu tehty.
- [x] **Navigaatio & Footer:** Toteutettu ja lisätty layoutiin.
  - Sivurakenne on putki ja Footeriin tarvittavaa linkitystä
- [ ] **Sisältö - Paljut:**
  - [Tehty] "Paljut"-listaussivu (`/paljut`) näyttää paljut datasta.
    - Varauskalenteri päätyi samalle sivulle
  - [x] Yksittäisen paljun tietosivu (`/paljut/[id]`) näyttää valitun paljun tiedot.
    - Vain yksi paljukärry, joten mennään yhdellä paljulla nyt.
- [Tehty] **Sisältö - Muut sivut:** Perustekstit Etusivulle ja Yhteystiedot-sivulle.
  - Perustekstit ja rautalankamalli tehty.
- [x] **Perustyylittely:** Tailwind CSS konfiguroitu ja perusluokkia käytetty sivuston siistimiseen.
  - Tailwind on konfiguroitu, mutta visuaalinen ilme tulee vielä yhtenäistää
- [ ] **Responsiivisuus (alku):** Tarkistettu perustoimivuus mobiililla.
  - _Muistiinpanot/Miten tehty:_
- [Tehty] **Ensimmäinen julkaisu (Dev):** Julkaistu Verceliin/Netlifyhin. Linkki: (https://paljuvaraus.vercel.app/)
  - Vercel on hyvä, tekee pipelinen repositoriosta ja luo domainin napin painalluksella!

---

### Vaihe 2: Yhteydenottolomake

_Tavoite: Toimiva yhteydenottolomake._

- [ ] **Lomakkeen UI:** React-komponentti yhteydenottolomakkeelle luotu.
  - _Muistiinpanot/Miten tehty:_
- [ ] **Validointi:** Kenttien validointi lisätty (esim. `react-hook-form`).
  - _Muistiinpanot/Miten tehty:_
- [ ] **Lomakkeen lähetys:** Toiminnallisuus, joka lähettää lomakkeen tiedot (esim. EmailJS tai Next.js API-reitti).
  - _Muistiinpanot/Miten tehty:_
- [ ] **Testaus:** Lomakkeen toiminta testattu kattavasti.
  - _Muistiinpanot/Miten tehty:_

---

### Vaihe 3: Varauskalenteri - MVP 1

_Tavoite: Asiakas voi nähdä saatavuuden ja lähettää varauspyynnön._

- [ ] **Kalenterikomponentti:** Valittu ja integroitu React-kalenterikomponentti.
  - _Muistiinpanot/Miten tehty:_ [Mainitse valittu komponentti]
- [ ] **Saatavuuden näyttö (yksinkertainen):** Logiikka, joka näyttää varatut/vapaat ajat kalenterissa (data aluksi esim. JSON).
  - _Muistiinpanot/Miten tehty:_
- [ ] **Päivämäärien valinta:** Toiminnallisuus päivämäärävälin valintaan.
  - _Muistiinpanot/Miten tehty:_
- [ ] **Varaustietojen keräyslomake:** Lomake varauspyyntöä varten.
  - _Muistiinpanot/Miten tehty:_
- [ ] **Varauspyynnön lähetys:** Logiikka varauspyynnön lähettämiseksi yrittäjälle (esim. sähköposti).
  - _Muistiinpanot/Miten tehty:_

---

### Vaihe 4: Viimeistely, Testaus ja Käyttöönoton Valmistelu

_Tavoite: Hiottu, testattu ja julkaisuvalmis perusversio._

- [ ] **Kattava tyylittely ja responsiivisuus.**
  - _Muistiinpanot/Miten tehty:_
- [ ] **Käytettävyystestaus ja palaute.**
  - _Muistiinpanot/Miten tehty:_
- [ ] **Selainyhteensopivuus ja optimointi.**
  - _Muistiinpanot/Miten tehty:_
- [ ] **Tietosuoja ja käyttöehdot (alustavat).**
  - _Muistiinpanot/Miten tehty:_
- [ ] **Tuotantojulkaisu.**
  - _Muistiinpanot/Miten tehty:_ Linkki: [Lisää linkki tähän]

---

### Vaihe 5: Jatkokehitys

_Tavoite: Parannellaan ja lisätään uusia ominaisuuksia._

- [ ] **Varauskalenteri v2 - Tietokantaintegraatio.**
  - _Suunnitelma/Ideat:_ [Supabase/Firebase/Strapi...]
- [ ] **Ylläpitäjänäkymä (Admin Panel).**
  - _Suunnitelma/Ideat:_
- [ ] **Online-maksut.**
  - _Suunnitelma/Ideat:_
- [ ] **Käyttäjätilit (Asiakkaat).**
  - _Suunnitelma/Ideat:_
- [ ] **Automaattiset sähköpostit.**
  - _Suunnitelma/Ideat:_

---

_Tämä README-tiedosto päivittyy projektin edetessä._
