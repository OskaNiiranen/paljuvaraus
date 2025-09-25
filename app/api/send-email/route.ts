import { Resend } from "resend";
import { NextResponse } from "next/server";
// LISÄTTY: Tuodaan tarvittavat osat Firebase-kirjastosta
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

// API-avain luetaan turvallisesti ympäristömuuttujista
const resend = new Resend(process.env.RESEND_API_KEY);

// Määritä sähköpostiosoitteet, joihin haluat kopion varauksista
const OMA_SAHKOPOSTI = ["oska.niiranen@gmail.com", "info@paljupaikka.fi"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { booking, customer, delivery, extras, total } = body;

    if (!customer || !customer.email) {
      return NextResponse.json(
        { error: "Sähköposti puuttuu" },
        { status: 400 }
      );
    }

    const bookingId = `PALJU-${Date.now().toString(36).toUpperCase()}`;
    const fromAddress = "Palju Paikka <info@paljupaikka.fi>";

    const formatDate = (dateString: string | null) => {
      if (!dateString) return "Ei valittu";
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      };
      return new Date(dateString).toLocaleDateString("fi-FI", options);
    };

    // 1. LÄHETÄ SÄHKÖPOSTI
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: fromAddress,
      to: [customer.email],
      bcc: OMA_SAHKOPOSTI,
      subject: `Varauspyyntösi on vastaanotettu! (Varausnumero: ${bookingId})`,
      html: `
        <h1>Kiitos varauspyynnöstäsi, ${customer.firstName}!</h1>
        <p>Varauspyyntösi tuli perille onnistuneesti. Käsittelemme sen mahdollisimman pian ja vahvistamme varauksen lähettämällä sinulle laskun ja maksuohjeet sähköpostiisi.</p>
        <h2>Varauksen tiedot:</h2>
        <ul>
          <li><strong>Varausnumero:</strong> ${bookingId}</li>
          <li><strong>Tuote:</strong> ${booking.productName}</li>
          <li><strong>Ajanjakso:</strong> ${formatDate(
            booking.startDate
          )} - ${formatDate(booking.endDate)}</li>
          <li><strong>Vuokra:</strong> ${booking.basePrice}€</li>
          <li><strong>Toimitus:</strong> ${delivery.cost}€ (${
            delivery.method === "pickup" ? "Nouto" : "Toimitus"
          })</li>
          ${
            extras.firewoodBags > 0
              ? `<li><strong>Polttopuut:</strong> ${extras.firewoodBags} säkkiä (${extras.cost}€)</li>`
              : ""
          }
          <li><strong>Yhteensä:</strong> ${total}€</li>
        </ul>
        <h2>Asiakastiedot:</h2>
        <p>
          ${customer.firstName} ${customer.lastName}<br>
          ${customer.email}<br>
          ${customer.phone}
        </p>
        ${
          delivery.method === "delivery"
            ? `
          <h2>Toimitusosoite:</h2>
          <p>
            ${customer.address}<br>
            ${customer.zipCode} ${customer.city}
          </p>
        `
            : ""
        }
        <hr>
        <p>Jos sinulla on kysyttävää, voit vastata tähän viestiin tai ottaa yhteyttä info@paljupaikka.fi / 0400 444 979.</p>
      `,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      return NextResponse.json(
        { message: "Sähköpostin lähetys epäonnistui", error: emailError },
        { status: 500 }
      );
    }

    // 2. TALLENNA VARAUS FIRESTOREEN
    try {
      const bookingData = {
        ...booking,
        bookingId,
        startDateFormatted: formatDate(booking.startDate),
        endDateFormatted: formatDate(booking.endDate),
        customer,
        delivery,
        extras,
        total,
        createdAt: new Date(),
        status: "vahvistamatta",
        invoiceStatus: "maksamatta",
      };

      const docRef = await addDoc(collection(db, "bookings"), bookingData);
      console.log("Document written with ID: ", docRef.id);
    } catch (dbError) {
      console.error("Error adding document to Firestore: ", dbError);
      // Vaikka tietokantatallennus epäonnistuisi, sähköposti on jo lähtenyt.
      // Lokitetaan virhe, mutta ei palauteta virhettä asiakkaalle.
    }

    return NextResponse.json({
      message: "Sähköposti lähetetty ja varaus tallennettu",
      data: emailData,
    });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { message: "Sisäinen palvelinvirhe", error },
      { status: 500 }
    );
  }
}
