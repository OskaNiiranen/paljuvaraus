"use client";

import { useState, useEffect } from "react";
// KORJAUS: useRouter poistettu, koska se aiheutti käännösvirheen
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  orderBy,
  DocumentData,
} from "firebase/firestore";
// KORJAUS: Korjattu tuontipolku olettaen, että lib-kansio on projektin juuressa
import { auth, db } from "../../../lib/firebase";

// Määritellään tyyppi varaukselle selkeyden vuoksi
interface Booking extends DocumentData {
  id: string;
  // Lisää muita tyyppejä tarvittaessa
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // KORJAUS: useRouter poistettu

  // Tarkistetaan käyttäjän kirjautumistila
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Jos käyttäjä ei ole kirjautunut, ohjataan takaisin kirjautumissivulle
        // KORJAUS: Käytetään window.location.href-ohjausta
        window.location.href = "/hallinta";
      }
    });
    return () => unsubscribe();
  }, []); // Poistettu router riippuvuuksista

  // Haetaan varaukset tietokannasta, kun käyttäjä on tunnistettu
  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        try {
          const bookingsCollection = collection(db, "bookings");
          // Järjestetään varaukset uusimmasta vanhimpaan
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
      // KORJAUS: Käytetään window.location.href-ohjausta
      window.location.href = "/hallinta";
    } catch (error) {
      console.error("Uloskirjautumisvirhe:", error);
    }
  };

  // Muotoillaan päivämäärä suomalaiseen muotoon
  const formatDate = (isoString: string) => {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleDateString("fi-FI");
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
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Asiakas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Ajanjakso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Yhteensä
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Tila
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Yhteystiedot
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {booking.customer.firstName} {booking.customer.lastName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {formatDate(booking.startDate)} -{" "}
                      {formatDate(booking.endDate)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {booking.total}€
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                        {booking.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {booking.customer.email}
                      <br />
                      {booking.customer.phone}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
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
