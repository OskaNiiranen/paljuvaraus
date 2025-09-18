# Palju Paikka Web-Applikaatio

Tämä on web-applikaatio paljukärryjen vuokraukseen. Sovelluksen avulla asiakkaat voivat selata saatavilla olevia paljukärryjä, tarkistaa niiden saatavuuden ja tehdä varauksia. Ylläpitäjälle on (tai tulee olemaan) oma näkymä varausten ja kaluston hallintaan.

## Tavoitteet

- Tarjota helppokäyttöinen käyttöliittymä asiakkaille paljujen varaamiseen.
- Näyttää selkeästi paljujen tiedot, kuvat ja saatavuuskalenteri.
- Mahdollistaa yhteydenotto ja varauspyyntöjen lähettäminen.
- (Tulevaisuudessa) Tarjota ylläpitäjälle työkaluja varausten ja paljukaluston hallintaan.
- (Tulevaisuudessa) Mahdollistaa online-maksut.

## Teknologiat

- **Frontend:** Next.js (React-framework)
- **Ohjelmointikieli:** TypeScript
- **Tyylit:** Tailwind CSS
- **Versionhallinta:** Git & GitHub
- **Backend (MVP):**
  - Next.js API Routes
  - **Sähköpostit:** Resend
- **Backend (Tulevaisuudessa):** Firebase / Supabase
- **Kehitysympäristö:** VS Code
- **Hosting:** Vercel

## Projektin Käynnistäminen Paikallisesti

1.  **Kloonaa repositorio:**

    ```bash
    git clone [https://github.com/OskaNiiranen/PaljuVaraus](https://github.com/OskaNiiranen/PaljuVaraus)
    cd paljupaikka
    ```

2.  **Asenna riippuvuudet:**

    ```bash
    npm install
    ```

3.  **Määritä ympäristömuuttujat (Environment Variables):**
    - Luo projektin juureen `.env.local` -tiedosto.
    - Lisää Resend API-avaimesi:
      ```
      # .env.local
      RESEND_API_KEY=re_YOUR_API_KEY_HERE
      ```

4.  **Käynnistä kehityspalvelin:**
    ```bash
    npm run dev
    ```
    Sovelluksen pitäisi nyt olla saatavilla osoitteessa `http://localhost:3000`.

---

## Kehityksen Edistyminen ja Tehtävälista

**PÄIVITETTY: 04.08.2025**

**NYT TYÖN ALLA / SEURAAVAKSI:**

- **Vaihe 5: Jatkokehitys - Tietokantaintegraatio.**
  - Suunnitellaan ja toteutetaan Firebase Firestore -integraatio.
  - Tavoitteena on tallentaa tehdyt varaukset tietokantaan ja näyttää varatut ajat kalenterissa reaaliaikaisesti.

---

### Vaihe 0: Perustukset ja Suunnittelu

_Tavoite: Työkalut ja perussuunnitelma valmiina kehityksen aloittamiseen._

- [x] **Projektinhallinta:** Tämä README toimii seurantatyökaluna.
- [x] **Visuaalinen hahmotelma:** Sivujen rakenne ja "varausputki" suunniteltu.
- [x] **Teknologiavalinnat:** Vahvistettu (Next.js, TypeScript, Tailwind CSS, Resend, Vercel).
- [x] **Kehitysympäristö:** VS Code asennettu, GitHub-repositorio luotu, Next.js-projekti alustettu.

---

### Vaihe 1: Perussivusto ja Staattinen Sisältö

_Tavoite: Näkyvä sivuston runko, jossa on perusinformaatio ja navigointi._

- [x] **Sivupohjat:** Kaikki "putken" sivut on luotu: Etusivu (`/`), Varaussivu (`/varaus`), Kassa (`/kassa`) ja Kiitossivu (`/kiitos`).
- [x] **Navigaatio:** Sivujen välinen navigointi toimii `next/link`-komponenteilla.
- [x] **Sisältö:** Paljun tiedot ja hinnasto on lisätty staattisesti esittelysivulle.
- [x] **Perustyylittely:** Sivustolla on yhtenäinen ja siisti ulkoasu Tailwind CSS:n avulla.
- [x] **Ensimmäinen julkaisu:** Projekti on julkaistu Vercelissä.

---

### Vaihe 2 & 3: Varauslomake ja Kalenteri (MVP 1)

_Tavoite: Asiakas voi nähdä saatavuuden, laskea hinnan ja lähettää varauspyynnön._

- [x] **Kalenterikomponentti:** Integroitu `react-day-picker`.
  - _Miten tehty:_ Luotu `BookingCalendar.tsx`-komponentti. Käytössä `date-fns` päivämäärien käsittelyyn ja lokalisointiin.
- [x] **Hinnanlaskenta:** Hinta päivittyy dynaamisesti kalenterivalintojen mukaan.
  - _Miten tehty:_ `useEffect`-hook ja `calculatePrice`-funktio, joka huomioi arki-, viikonloppu-, koko viikonloppu- ja viikkohinnat.
- [x] **Kassasivu:** Toimiva lomake kerää asiakkaan tiedot.
  - _Miten tehty:_ `useState`-hookilla hallitaan lomakkeen tilaa.
- [x] **Datan välitys:** Valitut päivät ja hinta välitetään kassasivulle URL-parametreina.
  - _Miten tehty:_ Käytetty `useSearchParams`-hookia datan lukemiseen.
- [x] **Lisäpalvelut:** Toimitus- ja polttopuuvalinnat lisätty kassalle, ja ne päivittävät hintaa.
- [x] **Varauspyynnön lähetys:** Varauspyyntö lähetetään onnistuneesti sähköpostitse.
  - _Miten tehty:_ Toteutettu Next.js API-reitillä (`/api/send-email`) ja Resend-palvelulla. Asiakas ja yrittäjä saavat vahvistusviestin.
- [x] **Ohjaus kiitossivulle:** Onnistuneen lähetyksen jälkeen asiakas ohjataan `/kiitos`-sivulle.
  - _Miten tehty:_ Käytetty Next.js:n `useRouter`-hookia.

---

### Vaihe 4: Viimeistely, Testaus ja Käyttöönoton Valmistelu

_Tavoite: Hiottu, testattu ja julkaisuvalmis perusversio._

- [ ] **Kattava tyylittely ja responsiivisuus.**
- [ ] **Käytettävyystestaus ja palaute.**
- [ ] **Selainyhteensopivuus ja optimointi.**
- [ ] **Tietosuoja ja käyttöehdot:** Luodaan `/ehdot`-sivu.
- [ ] **Tuotantojulkaisu:** Yhdistetään oma domain (`.fi`) Verceliin.

---

### Vaihe 5: Jatkokehitys (MVP 2 ja eteenpäin)

_Tavoite: Parannellaan ja lisätään uusia ominaisuuksia._

- [ ] **Varauskalenteri v2 - Tietokantaintegraatio.**
  - _Suunnitelma/Ideat:_ Otetaan käyttöön Firebase Firestore. Tallennetaan varaukset sinne ja haetaan varatut päivät kalenteriin, jotta tuplavarauksia ei voi tehdä.
- [ ] **Ylläpitäjänäkymä (Admin Panel).**
- [ ] **Online-maksut.**
- [ ] **Käyttäjätilit (Asiakkaat).**

---

_Tämä README-tiedosto päivittyy projektin edetessä._
