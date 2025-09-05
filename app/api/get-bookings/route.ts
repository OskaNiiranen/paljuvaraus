import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { eachDayOfInterval } from "date-fns";

export async function GET() {
  try {
    const bookingsCollection = collection(db, "bookings");
    const q = query(bookingsCollection);
    const querySnapshot = await getDocs(q);

    let disabledDates: Date[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Varmistetaan, että startDate ja endDate ovat olemassa ja oikeassa muodossa
      if (data.startDate && data.endDate) {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);

        // Luodaan lista kaikista päivistä varauksen alku- ja loppupäivän välillä
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
