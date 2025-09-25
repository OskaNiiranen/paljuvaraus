"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

// --- SIMULOITU ETÄISYYSLASKENTA ---
const getMockDistance = async (
  zipCode: string
): Promise<{ distance: number; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (zipCode.startsWith("04")) {
        // Esim. Tuusula, Järvenpää, Kerava
        resolve({ distance: 15, message: "Etäisyys on noin 15 km." });
      } else if (zipCode.startsWith("01") || zipCode.startsWith("00")) {
        // Esim. Vantaa, Helsinki
        resolve({ distance: 35, message: "Etäisyys on noin 35 km." });
      } else if (zipCode.startsWith("05")) {
        // Esim. Hyvinkää
        resolve({ distance: 45, message: "Etäisyys on noin 45 km." });
      } else if (zipCode.startsWith("1")) {
        // Esim. Lahti, Hämeenlinna
        resolve({ distance: 80, message: "Etäisyys on yli 50 km." });
      } else {
        resolve({ distance: 100, message: "Postinumeroa ei tunnistettu." });
      }
    }, 500);
  });
};

// Komponentti, joka sisältää kaiken logiikan ja näkymän
function KassaContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const fromDateStr = searchParams.get("from");
  const toDateStr = searchParams.get("to");
  const priceStr = searchParams.get("price");

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Ei valittu";
    return new Date(dateString).toLocaleDateString("fi-FI");
  };

  const bookingDetails = {
    productName: "Paljukärryn vuokraus",
    startDate: formatDate(fromDateStr),
    endDate: formatDate(toDateStr),
    basePrice: priceStr ? parseInt(priceStr, 10) : 0,
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    city: "",
    notes: "",
    vuokrausehdotAccepted: false,
    kayttoohjeetAccepted: false,
  });

  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const [isCheckingDistance, setIsCheckingDistance] = useState(false);
  const [firewoodBags, setFirewoodBags] = useState(0);
  const firewoodPricePerBag = 10;
  const firewoodCost = firewoodBags * firewoodPricePerBag;
  const totalPrice = bookingDetails.basePrice + deliveryCost + firewoodCost;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    if (deliveryMethod === "delivery" && formData.zipCode.length === 5) {
      setIsCheckingDistance(true);
      setDeliveryInfo("Tarkistetaan etäisyyttä...");

      getMockDistance(formData.zipCode).then((result) => {
        if (result.distance > 50) {
          setDeliveryCost(0);
          setDeliveryInfo(
            "Toimitus ei valitettavasti ole mahdollinen tähän osoitteeseen (yli 50 km)."
          );
        } else if (result.distance > 30) {
          setDeliveryCost(80);
          setDeliveryInfo("Toimituksen hinta: 80€");
        } else {
          setDeliveryCost(40);
          setDeliveryInfo("Toimituksen hinta: 40€");
        }
        setIsCheckingDistance(false);
      });
    } else {
      setDeliveryInfo("");
      if (deliveryMethod === "pickup") {
        setDeliveryCost(0);
      }
    }
  }, [formData.zipCode, deliveryMethod]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const inputValue = isCheckbox
      ? (e.target as HTMLInputElement).checked
      : value;
    setFormData((prev) => ({ ...prev, [name]: inputValue }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.vuokrausehdotAccepted || !formData.kayttoohjeetAccepted) {
      setAlertMessage(
        "Hyväksy sekä vuokrausehdot että käyttöohjeet jatkaaksesi."
      );
      return;
    }
    setIsSubmitting(true);
    setAlertMessage(null);

    const apiBookingDetails = {
      productName: bookingDetails.productName,
      startDate: fromDateStr,
      endDate: toDateStr,
      basePrice: bookingDetails.basePrice,
    };

    const dataToSend = {
      booking: apiBookingDetails,
      customer: formData,
      delivery: {
        method: deliveryMethod,
        cost: deliveryCost,
      },
      extras: {
        firewoodBags,
        cost: firewoodCost,
      },
      total: totalPrice,
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Viestin lähetys epäonnistui");
      }

      router.push("/kiitos");
    } catch (error) {
      console.error(error);
      setAlertMessage(
        "Pahoittelut, varauksen lähetyksessä tapahtui virhe. Yritä uudelleen."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormInvalid =
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.phone ||
    (deliveryMethod === "delivery" &&
      (!formData.address || !formData.zipCode || !formData.city)) ||
    !formData.vuokrausehdotAccepted ||
    !formData.kayttoohjeetAccepted ||
    (deliveryMethod === "delivery" &&
      deliveryCost === 0 &&
      formData.zipCode.length === 5) ||
    isSubmitting;

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Tee varaus</h1>
        <p className="mt-2">
          Olet melkein valmis! Täytä vain tietosi alle ja lue vuokrausehdot ja
          paljukärryn käyttöohjeet.
        </p>
        <p>Kaikki * merkityt kohdat ovat pakollisia täyttää.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {alertMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6"
            role="alert"
          >
            <span className="block sm:inline">{alertMessage}</span>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg space-y-8">
            {/* Yhteystiedot */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Yhteystietosi</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              </div>
            </div>

            {/* Toimitusvalinnat */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Toimitustapa</h2>
              <div className="space-y-4">
                <div
                  className="flex items-center p-4 border rounded-lg cursor-pointer"
                  onClick={() => setDeliveryMethod("pickup")}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    id="pickup"
                    checked={deliveryMethod === "pickup"}
                    onChange={() => setDeliveryMethod("pickup")}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <label
                      htmlFor="pickup"
                      className="block text-sm font-bold text-gray-900"
                    >
                      Noudan itse toimipisteestä (0€)
                    </label>
                    <p className="text-sm text-gray-500">
                      Lintulehdonkuja 57, 04500 Tuusula
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center p-4 border rounded-lg cursor-pointer"
                  onClick={() => setDeliveryMethod("delivery")}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    id="delivery"
                    checked={deliveryMethod === "delivery"}
                    onChange={() => setDeliveryMethod("delivery")}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <label
                      htmlFor="delivery"
                      className="block text-sm font-bold text-gray-900"
                    >
                      Tilaan toimituksen (40-80€)
                    </label>
                    <p className="text-sm text-gray-500">
                      Toimitus max. 50 km toimipisteestä.
                    </p>
                  </div>
                </div>
              </div>
              {deliveryMethod === "delivery" && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Toimitusosoite</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                        required={deliveryMethod === "delivery"}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
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
                        required={deliveryMethod === "delivery"}
                        maxLength={5}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
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
                        required={deliveryMethod === "delivery"}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    {deliveryInfo && (
                      <div className="sm:col-span-2 text-sm font-medium text-blue-700">
                        {deliveryInfo}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Lisäpalvelut */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Lisäpalvelut</h2>
              <div className="bg-white p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Polttopuut (40L säkki) 10€ per säkki
                    </h4>
                    <p className="text-sm text-gray-500">
                      Yksi säkki riittää yleensä yhteen lämmityskertaan, mutta
                      suosittelemme ottamaan kaksi säkkiä varmuuden vuoksi,
                      varsinkin kylmemmällä ilmalla.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFirewoodBags((prev) => Math.max(0, prev - 1))
                      }
                      className="w-8 h-8 rounded-full bg-gray-200 text-lg font-bold hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold w-4 text-center">
                      {firewoodBags}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFirewoodBags((prev) => prev + 1)}
                      className="w-8 h-8 rounded-full bg-blue-600 text-white text-lg font-bold hover:bg-blue-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Oikea palsta: Tilauksen yhteenveto */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-8">
              <h3 className="text-xl font-bold border-b pb-4 mb-4">
                Tilauksesi yhteenveto
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Tuote:</span>
                  <span>{bookingDetails.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ajanjakso:</span>
                  <span>
                    {bookingDetails.startDate} - {bookingDetails.endDate}
                  </span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <span>Vuokra:</span>
                  <span>{bookingDetails.basePrice}€</span>
                </div>
                <div className="flex justify-between">
                  <span>Toimitus:</span>
                  <span>{deliveryCost}€</span>
                </div>
                {firewoodBags > 0 && (
                  <div className="flex justify-between">
                    <span>Polttopuut ({firewoodBags} säkkiä):</span>
                    <span>{firewoodCost}€</span>
                  </div>
                )}
                <div className="border-t pt-4 mt-4 flex justify-between text-xl font-bold">
                  <span>Yhteensä:</span>
                  <span>{totalPrice}€</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-start">
                  <input
                    id="vuokrausehdotAccepted"
                    name="vuokrausehdotAccepted"
                    type="checkbox"
                    checked={formData.vuokrausehdotAccepted}
                    onChange={handleInputChange}
                    required
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                  />
                  <label
                    htmlFor="vuokrausehdotAccepted"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Olen lukenut ja hyväksyn{" "}
                    <Link
                      href="/vuokrausehdot"
                      target="_blank"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      vuokrausehdot
                    </Link>
                    .*
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    id="kayttoohjeetAccepted"
                    name="kayttoohjeetAccepted"
                    type="checkbox"
                    checked={formData.kayttoohjeetAccepted}
                    onChange={handleInputChange}
                    required
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                  />
                  <label
                    htmlFor="kayttoohjeetAccepted"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Olen lukenut{" "}
                    <Link
                      href="/kayttoohjeet"
                      target="_blank"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      käyttöohjeet
                    </Link>
                    .*
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-lg py-3 transition shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isFormInvalid}
              >
                {isSubmitting
                  ? "Lähetetään..."
                  : isCheckingDistance
                    ? "Tarkistetaan..."
                    : "Lähetä varauspyyntö"}
              </button>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Vahvistamme varauksen ja lähetämme maksuohjeet sähköpostiisi.
              </p>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

// Tämä on pääkomponentti, joka käärii sisällön Suspenseen.
export default function KassaClient() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Suspense
        fallback={
          <div className="text-center p-12">Ladataan varaustietoja...</div>
        }
      >
        <KassaContent />
      </Suspense>
    </div>
  );
}
