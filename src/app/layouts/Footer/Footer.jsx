import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-l from-lime-200 via-sky-100 to-green-200 dark:bg-slate-600 text-gray-800 py-12 px-6 sm:px-12 lg:px-24">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start text-center lg:text-left">
        <div className="mb-8 lg:mb-0 lg:w-1/3">
          <h3 className="text-lg font-semibold text-black">Prestine Care</h3>
          <p className="mt-2 text-md">
            Enhancing beauty through trusted and professional skincare solutions.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-2/3 text-center lg:text-left">
          <div className="flex justify-around">
            <div>
              <h3 className="text-lg font-semibold text-black">SERVICES</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link to="#" className="hover:text-gray-500">
                    Facial Treatments
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-500">
                    Acne Solutions
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-500">
                    Anti-Aging Care
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-500">
                    Skin Whitening
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black">COMPANY</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link to="/about" target="_top" className="hover:text-gray-500">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-500">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-500">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-500">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-around">
            <div>
              <h3 className="text-lg font-semibold text-black">LEGAL</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link to="#" className="hover:text-gray-500">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-500">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black">RESOURCES</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link to="#" className="hover:text-gray-500">
                    Blog Articles
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-gray-500">
                    Tutorials
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col justify-center items-center">
        <ul className="flex flex-wrap justify-center space-x-6 text-sm mt-4 md:mt-0">
          <li>
            <Link to="#" className="hover:text-gray-500">
              Terms
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-gray-500">
              Privacy
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-gray-500">
              Cookies
            </Link>
          </li>
        </ul>
        <p className="text-xs text-gray-500 mt-4 md:mt-0 text-center">
          © {new Date().getFullYear()} Skincare Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}