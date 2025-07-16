"use client";

import { useState } from "react";
import Link from "next/link";

// Tämä on placeholder-data. Tulevaisuudessa nämä tiedot
// tulisivat edelliseltä sivulta (kalenterista).
const bookingDetails = {
  productName: "Käsinrakennettu Paljukärrymme",
  startDate: "24.7.2025",
  endDate: "27.7.2025",
  totalPrice: 240, // Esimerkkihinta
};

export default function KassaSivu() {
  // Tila (state) lomakkeen kentille
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    city: "",
    notes: "",
    termsAccepted: false,
  });

  // Käsittelijä lomakkeen kenttien muutoksille
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // Tarkistetaan onko kyseessä checkbox
    const isCheckbox = type === "checkbox";
    const inputValue = isCheckbox
      ? (e.target as HTMLInputElement).checked
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  // Käsittelijä lomakkeen lähetykselle
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Hyväksy vuokrausehdot jatkaaksesi.");
      return;
    }
    // Tässä kohtaa lähetettäisiin data backendille (esim. Firebaseen)
    console.log("Lähetetään varaus:", {
      ...bookingDetails,
      customer: formData,
    });
    // Tässä voisi ohjata käyttäjän /kiitos-sivulle
    alert("Varauspyyntö lähetetty! (Tämä on vain demo)");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Vahvista varaus
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Olet melkein valmis! Täytä vain tietosi alle.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Vasen palsta: Asiakkaan tiedot */}
            <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Yhteystietosi</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Etunimi */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Etunimi *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                {/* Sukunimi */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sukunimi *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                {/* Sähköposti */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sähköposti *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                {/* Puhelinnumero */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Puhelinnumero *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                {/* Katuosoite */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Katuosoite *
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                {/* Postinumero */}
                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postinumero *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                {/* Postitoimipaikka */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postitoimipaikka *
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                {/* Lisätietoja */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Lisätietoja tilaukseen (valinnainen)
                  </label>
                  <textarea
                    name="notes"
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Oikea palsta: Tilauksen yhteenveto */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-lg sticky top-8">
                <h3 className="text-xl font-bold border-b pb-4 mb-4">
                  Tilauksesi yhteenveto
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Tuote:</span>
                    <span>{bookingDetails.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Alkaa:</span>
                    <span>{bookingDetails.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Päättyy:</span>
                    <span>{bookingDetails.endDate}</span>
                  </div>
                  <div className="border-t pt-4 mt-4 flex justify-between text-xl font-bold">
                    <span>Yhteensä:</span>
                    <span>{bookingDetails.totalPrice}€</span>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-start">
                    <input
                      id="termsAccepted"
                      name="termsAccepted"
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      required
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                    />
                    <label
                      htmlFor="termsAccepted"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Olen lukenut ja hyväksyn{" "}
                      <Link
                        href="/ehdot"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        vuokrausehdot
                      </Link>
                      .*
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-lg py-3 transition shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!formData.termsAccepted}
                >
                  Lähetä varauspyyntö
                </button>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Vahvistamme varauksen ja lähetämme maksuohjeet sähköpostiisi.
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
