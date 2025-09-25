"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  orderBy,
  DocumentData,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface Booking extends DocumentData {
  id: string;
}

const bookingStatusOptions = [
  "vahvistamatta",
  "vahvistettu",
  "peruttu",
  "vanhentunut",
];
const invoiceStatusOptions = ["maksamatta", "maksettu"];

const bookingStatusColors: { [key: string]: string } = {
  vahvistamatta: "bg-yellow-100 text-yellow-800",
  vahvistettu: "bg-green-100 text-green-800",
  peruttu: "bg-red-100 text-red-800",
  vanhentunut: "bg-gray-100 text-gray-800",
};

const invoiceStatusColors: { [key: string]: string } = {
  maksamatta: "bg-orange-100 text-orange-800",
  maksettu: "bg-blue-100 text-blue-800",
};

export default function HallintaDashboardClient() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        window.location.href = "/hallinta";
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        try {
          const bookingsCollection = collection(db, "bookings");
          const q = query(bookingsCollection, orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(q);

          const bookingsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Booking[];

          setBookings(bookingsData);
        } catch (error) {
          console.error("Virhe varausten haussa:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchBookings();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/hallinta";
    } catch (error) {
      console.error("Uloskirjautumisvirhe:", error);
    }
  };

  const handleStatusChange = async (
    bookingId: string,
    field: "status" | "invoiceStatus",
    value: string
  ) => {
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, {
        [field]: value,
      });

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, [field]: value } : booking
        )
      );
    } catch (error) {
      console.error("Tilan päivitys epäonnistui:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Ladataan hallintapaneelia...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-gray-900">Hallintapaneeli</h1>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Kirjaudu ulos
          </button>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Varausnumero
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Asiakas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Ajanjakso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Yhteensä
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider min-w-52">
                  Tila
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider min-w-52">
                  Lasku
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Yhteystiedot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Toimitusosoite
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Lisäpalvelut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Lisätiedot
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {booking.bookingId}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {booking.customer.firstName} {booking.customer.lastName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {booking.startDateFormatted} - {booking.endDateFormatted}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {booking.total}€
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusChange(
                            booking.id,
                            "status",
                            e.target.value
                          )
                        }
                        className={`w-full rounded-md border-gray-300 p-2 font-semibold leading-5 shadow-sm ${bookingStatusColors[booking.status]}`}
                      >
                        {bookingStatusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <select
                        value={booking.invoiceStatus}
                        onChange={(e) =>
                          handleStatusChange(
                            booking.id,
                            "invoiceStatus",
                            e.target.value
                          )
                        }
                        className={`w-full rounded-md border-gray-300 p-2 font-semibold leading-5 shadow-sm ${invoiceStatusColors[booking.invoiceStatus]}`}
                      >
                        {invoiceStatusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {booking.customer.email}
                      <br />
                      {booking.customer.phone}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {booking.delivery.method === "delivery" ? (
                        <>
                          {booking.customer.address}
                          <br />
                          {booking.customer.zipCode} {booking.customer.city}
                        </>
                      ) : (
                        "Nouto"
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {booking.extras.firewoodBags > 0
                        ? `Polttopuita: ${booking.extras.firewoodBags} säkkiä`
                        : "Ei lisäpalveluita"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {booking.customer.notes
                        ? booking.customer.notes
                        : "Ei lisätietoja"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-6 py-4 text-center text-sm">
                    Ei varauksia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
