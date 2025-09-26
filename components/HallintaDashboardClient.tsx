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

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { fi } from "date-fns/locale";

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
  const [bookingDates, setBookingDates] = useState<Date[]>([]);
  const [adminBlockedDates, setAdminBlockedDates] = useState<Date[]>([]);
  const [selectedBlockDates, setSelectedBlockDates] = useState<Date[] | undefined>(
    []
  );
  const [isBlocking, setIsBlocking] = useState(false);

  const fetchDisabledDates = async () => {
    try {
      const response = await fetch("/api/get-bookings");
      const data = await response.json();

      // bookingDates are full ISO strings, new Date() is correct
      const bDates = data.bookingDates.map(
        (dateStr: string) => new Date(dateStr)
      );
      // blockedDates are YYYY-MM-DD strings, parse as local date
      const aDates = data.blockedDates.map((dateStr: string) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
      });

      setBookingDates(bDates);
      setAdminBlockedDates(aDates);
      setSelectedBlockDates(aDates);
    } catch (error) {
      console.error("Failed to fetch disabled dates:", error);
    }
  };

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
      fetchDisabledDates();
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

  const handleBlockDates = async () => {
    const datesToToggle = [
      ...adminBlockedDates.filter(
        (d) =>
          !selectedBlockDates?.some((sd) => sd.getTime() === d.getTime())
      ),
      ...(selectedBlockDates?.filter(
        (sd) => !adminBlockedDates.some((d) => d.getTime() === sd.getTime())
      ) || []),
    ];

    const toYYYYMMDD = (date: Date) => {
      const d = new Date(date);
      // Adjust for timezone offset to get the correct date parts
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().split("T")[0];
    };

    const datesToToggleStrings = datesToToggle.map(toYYYYMMDD);

    if (datesToToggleStrings.length === 0) {
      alert("Ei muutoksia tallennettavaksi.");
      return;
    }

    setIsBlocking(true);
    try {
      const response = await fetch("/api/block-dates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dates: datesToToggleStrings }),
      });

      if (!response.ok) {
        throw new Error("Failed to update blocked dates");
      }

      // Optimistic update: set the new ground truth for admin-blocked dates
      setAdminBlockedDates(selectedBlockDates || []);
      alert("Kalenteri päivitetty onnistuneesti!");

    } catch (error) {
      console.error("Error blocking dates:", error);
      alert("Päivien estäminen epäonnistui. Yritä ladata sivu uudelleen.");
    } finally {
      setIsBlocking(false);
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

  const modifiers = {
    booking: bookingDates,
    adminBlocked: selectedBlockDates, // Use selected state for instant feedback
  };

  const modifierStyles = {
    booking: {
      backgroundColor: "#FEE2E2", // Red-100
      color: "#991B1B", // Red-800
      fontWeight: "bold",
    },
    adminBlocked: {
      backgroundColor: "#F3F4F6", // Gray-100
      color: "#374151", // Gray-700
    },
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

        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Hallinnoi kalenteria
          </h2>
          <p className="mb-4 text-gray-600">
            Asiakkaiden tekemät varaukset näkyvät punaisella, eikä niitä voi
            muokata tästä. Hallinnoijan estämät päivät (esim. huolto) näkyvät
            harmaalla. Voit lisätä tai poistaa harmaita estopäiviä klikkaamalla
            niitä.
          </p>
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <div className="flex-shrink-0">
              <DayPicker
                mode="multiple"
                min={0}
                selected={selectedBlockDates}
                onSelect={setSelectedBlockDates}
                disabled={[{ before: new Date() }, ...bookingDates]}
                modifiers={modifiers}
                modifiersStyles={modifierStyles}
                locale={fi}
                styles={{
                  caption: { color: "#1E40AF" },
                  head: { color: "#1E40AF" },
                }}
              />
            </div>
            <div className="w-full flex-grow md:w-auto">
              <button
                onClick={handleBlockDates}
                disabled={isBlocking}
                className="w-full rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isBlocking ? "Tallennetaan..." : "Tallenna muutokset"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
