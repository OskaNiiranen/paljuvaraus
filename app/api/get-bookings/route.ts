import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { eachDayOfInterval, addHours } from "date-fns";

export async function GET() {
  try {
    const bookingsCollection = collection(db, "bookings");
    const blockedDatesCollection = collection(db, "blockedDates");

    // Get booking dates
    const bookingsQuery = query(bookingsCollection);
    const bookingsSnapshot = await getDocs(bookingsQuery);
    let bookingDates: Date[] = [];
    bookingsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.startDate && data.endDate) {
        const bookingStart = addHours(new Date(data.startDate), 3);
        const bookingEnd = addHours(new Date(data.endDate), 3);
        const intervalDates = eachDayOfInterval({
          start: bookingStart,
          end: bookingEnd,
        });
        bookingDates = [...bookingDates, ...intervalDates];
      }
    });

    // Get manually blocked dates
    const blockedDatesQuery = query(blockedDatesCollection);
    const blockedDatesSnapshot = await getDocs(blockedDatesQuery);
    let blockedDates: string[] = []; // Keep as strings
    blockedDatesSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.dateString) {
        blockedDates.push(data.dateString);
      }
    });

    // For the combined list for the public calendar, convert strings to Date objects (UTC)
    const blockedDatesAsDates = blockedDates.map((dateStr) => new Date(dateStr));
    const disabledDates = [...bookingDates, ...blockedDatesAsDates];

    return NextResponse.json({ disabledDates, bookingDates, blockedDates });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Error fetching bookings", error },
      { status: 500 }
    );
  }
}
