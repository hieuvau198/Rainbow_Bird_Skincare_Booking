import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-36">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-white">Skincare Hub</h3>
          <p className="mt-2 text-md">
            Enhancing beauty through trusted and professional skincare solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 md:mt-0 gap-x-24">
          <div>
            <h3 className="text-lg font-semibold text-white">SERVICES</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="#" className="hover:text-white">
                  Facial Treatments
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Acne Solutions
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Anti-Aging Care
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Skin Whitening
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">LEGAL</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="#" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">RESOURCES</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="#" className="hover:text-white">
                  Blog Articles
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">COMPANY</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Partners
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-center items-center">
        <ul className="flex space-x-6 text-sm mt-4 md:mt-0">
          <li>
            <Link to="#" className="hover:text-white">
              Terms
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-white">
              Privacy
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-white">
              Cookies
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}