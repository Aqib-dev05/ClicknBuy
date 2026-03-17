import React from 'react';
import Button from '../Components/layouts/Button';
import { useNavigate } from 'react-router-dom';

const PRIVACY_DATA = [
  {
    title: "1. Information We Collect",
    content: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact our support team. This may include your name, email address, billing address, and payment information."
  },
  {
    title: "2. How We Use Your Information",
    content: "We use the information we collect to process your orders, maintain your account, improve our services, and communicate with you about promotions or updates that may interest you."
  },
  {
    title: "3. Information Sharing",
    content: "We do not sell your personal information to third parties. We may share data with trusted service providers who assist us in operating our website, conducting our business, or servicing you."
  },
  {
    title: "4. Data Security",
    content: "We implement a variety of security measures to maintain the safety of your personal information. Your sensitive data is transmitted via Secure Socket Layer (SSL) technology and encrypted into our payment gateway providers' database."
  },
  {
    title: "5. Cookies",
    content: "Our website uses cookies to enhance your browsing experience. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser."
  }
];

function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
          Privacy <span className="text-red-600">Policy</span>
        </h1>
        
        <div className="space-y-8">
          {PRIVACY_DATA.map((item, index) => (
            <section key={index}>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {item.content}
              </p>
            </section>
          ))}
        </div>

        <Button text={"Go Back"} className='mt-8 ml-2' onClick={() => navigate(-1)} />
        
        <div className="mt-12 pt-6 border-t text-sm text-gray-500">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-2">
            If you have any questions regarding our privacy practices, please contact us at <a className='hover:text-red-500 text-md font-semibold text-blue-600 ' href="mailto:m.aqibali3040@gmail.com">m.aqibali3040@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
