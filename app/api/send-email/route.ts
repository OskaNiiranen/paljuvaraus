import { Resend } from "resend";
import { NextResponse } from "next/server";

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

    // Nyt kun domain on vahvistettu, voimme käyttää omaa sähköpostiosoitetta.
    const fromAddress = "Palju Paikka <info@paljupaikka.fi>";

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [customer.email], // Lähetetään asiakkaalle
      bcc: OMA_SAHKOPOSTI, // Lähetetään kopio sinulle
      subject: "Varauspyyntösi on vastaanotettu!",
      html: `
        <h1>Kiitos varauspyynnöstäsi, ${customer.firstName}!</h1>
        <p>Olemme vastaanottaneet varauspyyntösi ja käsittelemme sen mahdollisimman pian. Vahvistamme varauksen ja lähetämme maksuohjeet erillisessä sähköpostissa.</p>
        <h2>Varauksen tiedot:</h2>
        <ul>
          <li><strong>Tuote:</strong> ${booking.productName}</li>
          <li><strong>Ajanjakso:</strong> ${booking.startDate} - ${booking.endDate}</li>
          <li><strong>Vuokra:</strong> ${booking.basePrice}€</li>
          <li><strong>Toimitus:</strong> ${delivery.cost}€ (${delivery.method === "pickup" ? "Nouto" : "Toimitus"})</li>
          ${extras.firewoodBags > 0 ? `<li><strong>Polttopuut:</strong> ${extras.firewoodBags} säkkiä (${extras.cost}€)</li>` : ""}
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

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { message: "Sähköpostin lähetys epäonnistui", error },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Sähköposti lähetetty", data });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { message: "Sisäinen palvelinvirhe", error },
      { status: 500 }
    );
  }
}
