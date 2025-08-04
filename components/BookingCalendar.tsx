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
} from "date-fns";
import { fi } from "date-fns/locale";

// Hinnasto-objekti laskentaa varten - PÄIVITETTY HINNOITTELU
const pricingRules = {
  weekdayPrice: 70,
  weekendPrice: 100,
  fullWeekendPrice: 250, // Hinta pe-su varaukselle
  fullWeekPrice: 300, // Hinta 7 päivän varaukselle
};

export default function BookingCalendar() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // HINNANLASKULOGIIKKA
  const calculatePrice = (selectedRange: DateRange) => {
    if (!selectedRange.from || !selectedRange.to) {
      return 0;
    }

    const from = selectedRange.from;
    const to = selectedRange.to;
    const numberOfNights = differenceInCalendarDays(to, from);
    const numberOfDays = numberOfNights + 1;

    // ERIKOISHINTA 1: Koko viikonloppu (pe-su, 3 päivää/2 yötä)
    if (isFriday(from) && isSunday(to) && numberOfNights === 2) {
      return pricingRules.fullWeekendPrice;
    }

    // ERIKOISHINTA 2: Koko viikko (7 päivää/6 yötä)
    if (numberOfDays === 7) {
      return pricingRules.fullWeekPrice;
    }

    // NORMAALI PÄIVÄKOHTAINEN LASKENTA
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
      const newPrice = calculatePrice(range);
      setTotalPrice(newPrice);
    } else {
      setTotalPrice(0);
    }
  }, [range]);

  const today = new Date();

  // Rakennetaan dynaaminen linkki URL-parametreilla
  const getKassaLink = () => {
    if (!range?.from || !range?.to) {
      return "/kassa";
    }
    const fromDate = range.from.toISOString();
    const toDate = range.to.toISOString();

    return `/kassa?from=${fromDate}&to=${toDate}&price=${totalPrice}`;
  };

  return (
    <div className="bg-white p-4 sm:p-8 rounded-xl shadow-2xl">
      <p className="text-center text-gray-600 mb-4">
        Valitse varauksesi alkamis- ja päättymispäivä kalenterista.
      </p>

      <div className="flex justify-center">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={1}
          disabled={{ before: today }}
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
            if (!range || !range.to) {
              e.preventDefault();
            }
          }}
        >
          Jatka varaukseen
        </Link>
      </div>
    </div>
  );
}
