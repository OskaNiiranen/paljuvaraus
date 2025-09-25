"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  differenceInCalendarDays,
  isFriday,
  isSaturday,
  isSunday,
  isMonday,
  isThursday,
} from "date-fns";
import { fi } from "date-fns/locale";

const pricingRules = {
  weekdayPrice: 70,
  weekendPrice: 100,
  fullWeekendPrice: 250,
  fullWeekPrice: 300,
  allWeekdaysPrice: 230,
};

export default function BookingCalendar() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  // LISÄTTY: Tila, johon tallennetaan varatut päivät
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  // LISÄTTY: Haetaan varatut päivät, kun komponentti ladataan
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await fetch("/api/get-bookings");
        const data = await response.json();

        // Muutetaan päivämäärämerkkijonot Date-objekteiksi
        const dates = data.disabledDates.map(
          (dateStr: string) => new Date(dateStr)
        );
        setDisabledDates(dates);
      } catch (error) {
        console.error("Failed to fetch booked dates:", error);
      }
    };

    fetchBookedDates();
  }, []);

  const calculatePrice = (selectedRange: DateRange) => {
    if (!selectedRange.from || !selectedRange.to) return 0;

    const from = selectedRange.from;
    const to = selectedRange.to;
    const numberOfNights = differenceInCalendarDays(to, from);
    const numberOfDays = numberOfNights + 1;

    if (isMonday(from) && isThursday(to) && numberOfNights === 3) {
      return pricingRules.allWeekdaysPrice;
    }
    if (isFriday(from) && isSunday(to) && numberOfNights === 2) {
      return pricingRules.fullWeekendPrice;
    }
    if (numberOfDays === 7) {
      return pricingRules.fullWeekPrice;
    }

    let price = 0;
    for (let i = 0; i < numberOfDays; i++) {
      const currentDate = new Date(from);
      currentDate.setDate(currentDate.getDate() + i);
      if (
        isFriday(currentDate) ||
        isSaturday(currentDate) ||
        isSunday(currentDate)
      ) {
        price += pricingRules.weekendPrice;
      } else {
        price += pricingRules.weekdayPrice;
      }
    }
    return price;
  };

  useEffect(() => {
    if (range && range.from && range.to) {
      setTotalPrice(calculatePrice(range));
    } else {
      setTotalPrice(0);
    }
  }, [range]);

  const handleSelect = (selectedRange: DateRange | undefined) => {
    if (selectedRange?.from && selectedRange.to) {
      let from = new Date(selectedRange.from);
      let to = new Date(selectedRange.to);

      // Varmistetaan, että `from` on ennen `to`-päivää
      if (from > to) {
        [from, to] = [to, from];
      }

      // Aloitetaan tarkistus `from`-päivän jälkeisestä päivästä
      const day = new Date(from);
      day.setDate(day.getDate() + 1);

      while (day < to) {
        if (
          disabledDates.some(
            (disabledDate) =>
              disabledDate.getDate() === day.getDate() &&
              disabledDate.getMonth() === day.getMonth() &&
              disabledDate.getFullYear() === day.getFullYear()
          )
        ) {
          // Löytyi estetty päivä valitulta ajanjaksolta.
          // Nollataan valinta.
          setRange(undefined);
          return;
        }
        day.setDate(day.getDate() + 1);
      }
    }
    // Jos estettyjä päiviä ei löytynyt, päivitetään tila.
    setRange(selectedRange);
  };

  const today = new Date();

  const getKassaLink = () => {
    if (!range?.from || !range?.to) return "/kassa";
    const fromDate = range.from.toISOString();
    const toDate = range.to.toISOString();
    return `/kassa?from=${fromDate}&to=${toDate}&price=${totalPrice}`;
  };

  return (
    <div className="top-8 bg-white p-6 rounded-lg shadow-lg border">
      <p className="text-center text-gray-600 mb-4">
        Valitse varauksesi alkamis- ja päättymispäivä kalenterista.
      </p>
      <div className="flex justify-center">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={handleSelect}
          numberOfMonths={1}
          // PÄIVITETTY: Estetään menneet päivät JA tietokannasta haetut varatut päivät
          disabled={[{ before: today }, ...disabledDates]}
          locale={fi}
          className="p-0 m-0"
          styles={{
            caption: { color: "#1E40AF" },
            head: { color: "#1E40AF" },
          }}
        />
      </div>
      <div className="text-center mt-6">
        <p className="text-2xl font-bold mb-4">
          Hinta yhteensä: <span className="text-blue-600">{totalPrice}€</span>
        </p>
        <Link
          href={getKassaLink()}
          className={`inline-block w-full sm:w-auto text-white font-bold text-lg rounded-lg px-12 py-4 transition-transform transform hover:scale-105 shadow-xl ${
            !range || !range.to
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={(e) => {
            if (!range || !range.to) e.preventDefault();
          }}
        >
          Jatka varaukseen
        </Link>
      </div>
    </div>
  );
}
