import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function LinksHeaderComponentMolecule() {
    return (
        <>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link
                  className="lg:text-white lg:hover:text-gray-200 text-gray-700 px-3 py-4 lg:py-2 flex items-center text-xs font-bold"
                  href="https://api.whatsapp.com/send/?phone=573044018870&text&type=phone_number&app_absent=0"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="text-gray-500 w-6 h-6 mr-1" />
                  <span className="inline-block ml-2">WhatsApp</span>
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  className="lg:text-white lg:hover:text-gray-200 text-gray-700 px-3 py-4 lg:py-2 flex items-center text-xs font-bold"
                  href="https://github.com/CQuiroga"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faGithub} className="text-gray-500 w-6 h-6 mr-1" />
                  <span className="inline-block ml-2">GitHub</span>
                </Link>
              </li>
            </ul>
        </>
    )
}