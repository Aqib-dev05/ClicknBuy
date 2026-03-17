import React from 'react';
import Button from '../Components/layouts/Button';
import { useNavigate } from 'react-router-dom';

const TERMS_DATA = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement."
  },
  {
    title: "2. User Account",
    content: "You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer."
  },
  {
    title: "3. Privacy Policy",
    content: "Your use of the website is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices."
  },
  {
    title: "4. Product Descriptions",
    content: "We attempt to be as accurate as possible. However, we do not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free."
  },
  {
    title: "5. Limitation of Liability",
    content: "In no event shall the company be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of this website."
  }
];

function TermAndConditions() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
          Terms and <span className="text-red-600">Conditions</span>
        </h1>
        
        <div className="space-y-8">
          {TERMS_DATA.map((term, index) => (
            <section key={index}>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {term.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {term.content}
              </p>
            </section>
          ))}
        </div>

        <Button text={"Go Back"} className='mt-8 ml-2' onClick={() => navigate(-1)} />
        
        <div className="mt-12 pt-6 border-t text-sm text-gray-500">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">
            If you have any questions regarding these terms, please contact us at <a className='hover:text-red-500 text-md font-semibold text-blue-600 ' href="mailto:m.aqibali3040@gmail.com">m.aqibali3040@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermAndConditions;
