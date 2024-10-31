import Link from "next/link";

export default function FooterNavbarLinks() {
    return (
        <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end justify-center">
                <li>
                  <Link href="#" className="text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3">Link 1</Link>
                </li>
                <li>
                  <Link href="#" className="text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3">Link 2</Link>
                </li>
                <li>
                  <Link href="#" className="text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3">Link 3</Link>
                </li>
                <li>
                  <Link href="#" className="text-white hover:text-gray-300 text-sm font-semibold block py-1 px-3">Link 4</Link>
                </li>
              </ul>
        </div>
    );
}