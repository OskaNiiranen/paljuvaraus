import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Osa 1: Hyödylliset linkit */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Pikalinkit</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/kayttoohjeet"
                  className="hover:text-white transition-colors"
                >
                  Paljukärryn käyttöohjeet
                </Link>
              </li>
              <li>
                <Link
                  href="/ehdot"
                  className="hover:text-white transition-colors"
                >
                  Vuokrausehdot
                </Link>
              </li>
            </ul>
          </div>

          {/* Osa 2: Yhteystiedot */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Yhteystiedot</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:info@paljupaikka.fi"
                  className="hover:text-white transition-colors"
                >
                  info@paljupaikka.fi
                </a>
              </li>
              <li>
                <a
                  href="tel:0400444979"
                  className="hover:text-white transition-colors"
                >
                  0400 444 979
                </a>
              </li>
              <li>
                <p>Lintulehdonkuja 57, 04500 Tuusula</p>
              </li>
            </ul>
          </div>

          {/* Osa 3: Yrityksen tiedot */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Palju Paikka</h3>
            <p>Ei muuta kuin palju lämpimäksi ja kylpemään!</p>
            <p className="mt-2 text-sm">Y-tunnus: 3534960-8</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Palju Paikka - Kaikki oikeudet
          pidätetään.
        </p>
      </div>
    </footer>
  );
}
