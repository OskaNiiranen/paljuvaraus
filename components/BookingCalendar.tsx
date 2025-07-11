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

// Hinnasto-objekti laskentaa varten
const pricingRules = {
  weekdayPrice: 90,
  weekendPrice: 120, // Hinta per päivä pe, la tai su
};

export default function BookingCalendar() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculatePrice = (selectedRange: DateRange) => {
    if (!selectedRange.from || !selectedRange.to) {
      return 0;
    }

    let price = 0;
    const days = differenceInCalendarDays(selectedRange.to, selectedRange.from);

    for (let i = 0; i <= days; i++) {
      const currentDate = new Date(selectedRange.from);
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

  return (
    <div className="bg-white p-4 sm:p-8 rounded-xl shadow-2xl">
      <p className="text-center text-gray-600 mb-4">
        1. Valitse haluamasi alkamis- ja päättymispäivä kalenterista. <br />
        2. Hinta päivittyy automaattisesti. <br />
        3. Jatka täyttämään tietosi.
      </p>

      {/* Kalenterikomponentti */}
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

      {/* Hinta ja varausnappi */}
      <div className="text-center mt-6">
        <p className="text-2xl font-bold mb-4">
          Hinta yhteensä: <span className="text-blue-600">{totalPrice}€</span>
        </p>
        <Link
          href="/kassa"
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
