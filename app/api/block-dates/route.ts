import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const { dates } = await request.json(); // Expecting YYYY-MM-DD strings

    if (!dates || !Array.isArray(dates)) {
      return NextResponse.json(
        { message: "Invalid request body. 'dates' array is required." },
        { status: 400 }
      );
    }

    const blockedDatesCollection = collection(db, "blockedDates");

    for (const dateString of dates) {
      const q = query(
        blockedDatesCollection,
        where("dateString", "==", dateString)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // If not blocked, add it
        await addDoc(blockedDatesCollection, { dateString });
      } else {
        // If already blocked, unblock it (delete the doc)
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
      }
    }

    return NextResponse.json({ message: "Blocked dates updated successfully." });
  } catch (error) {
    console.error("Error updating blocked dates:", error);
    return NextResponse.json(
      { message: "Error updating blocked dates", error },
      { status: 500 }
    );
  }
}
