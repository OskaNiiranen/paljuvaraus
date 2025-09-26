# Palju Paikka Web-Applikaatio

Tämä on web-applikaatio paljukärryjen vuokraukseen. Sovelluksen avulla asiakkaat voivat selata saatavilla olevia paljukärryjä, tarkistaa niiden saatavuuden ja tehdä varauksia. Ylläpitäjälle on oma näkymä varausten ja kaluston hallintaan.

## Tavoitteet

- Tarjota helppokäyttöinen käyttöliittymä asiakkaille paljujen varaamiseen.
- Näyttää selkeästi paljukärryn tiedot, kuvat ja saatavuuskalenteri.
- Mahdollistaa yhteydenotto ja varauspyyntöjen lähettäminen.
- Tarjota ylläpitäjälle työkaluja varausten ja paljukaluston hallintaan.
- (Tulevaisuudessa) Mahdollistaa online-maksut.

## Teknologiat

- **Frontend:** Next.js (React-framework)
- **Ohjelmointikieli:** TypeScript
- **Tyylit:** Tailwind CSS
- **Versionhallinta:** Git & GitHub
- **Backend:**
  - Next.js API Routes
  - **Tietokanta:** Firebase Firestore
  - **Sähköpostit:** Resend
- **Kehitysympäristö:** VS Code
- **Hosting:** Vercel

## Projektin Käynnistäminen Paikallisesti

1.  **Kloonaa repositorio:**

    ```bash
    git clone https://github.com/OskaNiiranen/PaljuVaraus
    cd paljuvaraus
    ```

2.  **Asenna riippuvuudet:**

    ```bash
    npm install
    ```

3.  **Määritä ympäristömuuttujat (Environment Variables):**
    - Luo projektin juureen `.env.local` -tiedosto.
    - Lisää tarvittavat avaimet (Resend, Firebase):

      ```
      # .env.local
      RESEND_API_KEY=re_YOUR_API_KEY_HERE

      # Firebase config
      NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
      NEXT_PUBLIC_FIREBASE_APP_ID=...
      ```

4.  **Käynnistä kehityspalvelin:**
    ```bash
    npm run dev
    ```
    Sovelluksen pitäisi nyt olla saatavilla osoitteessa `http://localhost:3000`.

---

## Kehityksen Edistyminen ja Tehtävälista

**PÄIVITETTY: 26.09.2025**

**NYT TYÖN ALLA / SEURAAVAKSI:**

- **Vaihe 5: Ylläpitäjänäkymä (Admin Panel)**
  - Kehitetään näkymää varausten hallintaan (listaus, poisto, muokkaus).
  - Tavoitteena on antaa yrittäjälle täydet työkalut varausten hallintaan ilman tarvetta käyttää Firebase-konsolia.

---

### Vaihe 0: Perustukset ja Suunnittelu

_Tavoite: Työkalut ja perussuunnitelma valmiina kehityksen aloittamiseen._

- [x] **Projektinhallinta:** Tämä README toimii seurantatyökaluna.
- [x] **Visuaalinen hahmotelma:** Sivujen rakenne ja "varausputki" suunniteltu.
- [x] **Teknologiavalinnat:** Vahvistettu (Next.js, TypeScript, Tailwind CSS, Resend, Firebase, Vercel).
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
- [x] **Hinnanlaskenta:** Hinta päivittyy dynaamisesti kalenterivalintojen mukaan.
- [x] **Kassasivu:** Toimiva lomake kerää asiakkaan tiedot.
- [x] **Datan välitys:** Valitut päivät ja hinta välitetään kassasivulle URL-parametreina.
- [x] **Lisäpalvelut:** Toimitus- ja polttopuuvalinnat lisätty kassalle.
- [x] **Varauspyynnön lähetys:** Varauspyyntö lähetetään onnistuneesti sähköpostitse (Resend).
- [x] **Ohjaus kiitossivulle:** Onnistuneen lähetyksen jälkeen asiakas ohjataan `/kiitos`-sivulle.

---

### Vaihe 4: Tietokantaintegraatio ja Kalenterin Synkronointi

_Tavoite: Varaukset tallennetaan tietokantaan ja kalenteri näyttää varatut ajat reaaliaikaisesti._

- [x] **Tietokantaintegraatio:** Yhteys Firebase Firestoreen on muodostettu (`lib/firebase.ts`).
- [x] **Varausten haku:** Luotu API-reitti (`/api/get-bookings`), joka hakee kaikki varaukset Firestoresta.
- [x] **Kalenterin synkronointi:** Varauskalenteri (`BookingCalendar.tsx`) hakee varatut päivät ja estää niiden valinnan.
- [ ] **Varausten tallennus:** Logiikka varauksen tallentamiseksi tietokantaan `send-email`-reitin yhteydessä.

---

### Vaihe 5: Ylläpitäjänäkymä (Admin Panel) - (Käynnissä)

_Tavoite: Tarjota yrittäjälle näkymä varausten hallintaan._

- [x] **Perusrakenne:** Luotu sivut `/hallinta` ja `/hallinta/dashboard`.
- [ ] **Varausten listaus:** Näytetään kaikki tehdyt varaukset hallintapaneelissa.
- [ ] **Varausten hallinta:** Lisätään toiminnallisuudet varausten poistamiseen ja muokkaamiseen.
- [ ] **Käyttöoikeuksien hallinta:** Varmistetaan, että vain ylläpitäjä pääsee käsiksi näkymään.

---

### Vaihe 6: Viimeistely ja Jatkokehitys

_Tavoite: Hiottu, testattu ja julkaisuvalmis perusversio sekä tulevaisuuden suunnitelmat._

- [ ] **Kattava tyylittely ja responsiivisuus.**
- [ ] **Käytettävyystestaus ja palaute.**
- [ ] **Tietosuoja ja käyttöehdot:** Luodaan sivut `/tietosuojaseloste` ja `/vuokrausehdot`.
- [ ] **Tuotantojulkaisu:** Yhdistetään oma domain (`.fi`) Verceliin.
- [ ] **Online-maksut.**
- [ ] **Käyttäjätilit (Asiakkaat).**

---

_Tämä README-tiedosto päivittyy projektin edetessä._
