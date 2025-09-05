import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { eachDayOfInterval, subDays, addHours } from "date-fns";

export async function GET() {
  try {
    const bookingsCollection = collection(db, "bookings");
    const q = query(bookingsCollection);
    const querySnapshot = await getDocs(q);

    let disabledDates: Date[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.startDate && data.endDate) {
        // Firestoresta tulevat päivämäärät ovat UTC-aikamerkkijonoja, jotka edustavat
        // päivän alkua Suomen ajassa (UTC+3). Esim. 22.9. klo 00:00 on tallennettu
        // muodossa 21.9. klo 21:00 UTC.
        // Lisäämällä 3 tuntia varmistamme, että saamme oikean päivän riippumatta
        // palvelimen aikavyöhykkeestä.
        const bookingStart = addHours(new Date(data.startDate), 3);
        const checkoutDate = addHours(new Date(data.endDate), 3);

        // Uloskirjautumispäivän ei kuulu olla varattuna, joten otetaan sitä edeltävä päivä.
        const lastBookedDay = subDays(checkoutDate, 1);

        const intervalDates = eachDayOfInterval({
          start: bookingStart,
          end: lastBookedDay,
        });
        disabledDates = [...disabledDates, ...intervalDates];
      }
    });

    return NextResponse.json({ disabledDates });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Error fetching bookings", error },
      { status: 500 }
    );
  }
}
