import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { eachDayOfInterval, startOfDay } from "date-fns";

export async function GET() {
  try {
    const bookingsCollection = collection(db, "bookings");
    const q = query(bookingsCollection);
    const querySnapshot = await getDocs(q);

    let disabledDates: Date[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.startDate && data.endDate) {
        // --- TÄMÄ ON KORJAUS ---
        // Muunnetaan ISO-merkkijonot Date-objekteiksi ja käytetään startOfDay-funktiota
        // poistamaan aikavyöhyke-erojen vaikutus.
        const startDate = startOfDay(new Date(data.startDate));
        const endDate = startOfDay(new Date(data.endDate));
        // -------------------------

        const intervalDates = eachDayOfInterval({
          start: startDate,
          end: endDate,
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
