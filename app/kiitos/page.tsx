import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kiitos tilauksesta',
};

import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function KiitosSivu() {
  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-2xl text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Kiitos varauspyynnöstäsi!
          </h1>

          <p className="mt-4 text-gray-600">
            Olemme lähettäneet sinulle varausvahvistuksen sähköpostitse
            osoitteesta{" "}
            <span className="font-semibold">info@paljupaikka.fi</span>.
          </p>
          <p className="mt-2 text-gray-600">
            Käsittelemme varauspyyntösi mahdollisimman pian. Kun se on
            käsitelty, lähetämme sinulle laskun maksuohjeineen samasta
            sähköpostiosoitteesta.
          </p>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left text-sm">
            <h2 className="font-semibold text-gray-800 mb-2">
              Tarvitsetko apua?
            </h2>
            <p className="text-gray-700">
              Jos sinulla on kysyttävää, tai haluat muuttaa varaustasi, ota
              meihin yhteyttä:
            </p>
            <ul className="mt-2 list-inside list-disc">
              <li>
                Sähköpostitse:{" "}
                <a
                  href="mailto:info@paljupaikka.fi"
                  className="text-blue-600 hover:underline"
                >
                  info@paljupaikka.fi
                </a>
              </li>
              <li>
                Puhelimitse:{" "}
                <a
                  href="tel:0400444979"
                  className="text-blue-600 hover:underline"
                >
                  0400 444 979
                </a>
              </li>
            </ul>
          </div>

          <Link
            href="/"
            className="mt-8 inline-block w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg px-8 py-3 transition shadow-lg"
          >
            Palaa etusivulle
          </Link>
        </div>
      </main>
    </div>
  );
}