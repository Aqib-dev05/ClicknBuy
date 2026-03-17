import React from 'react'

const FAQ_DATA = [
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive an email with a tracking number and a link to track your package on our carrier's website."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Products must be in their original packaging and unused condition."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary depending on the destination."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our support team via the Contact Page or by emailing support@ecommerce.com. We typically respond within 24 hours."
  },
  {
    question: "Are my payment details secure?",
    answer: "Absolutely. We use industry-standard SSL encryption to protect your personal and payment information during checkout."
  }
];

function Faq() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
          Frequently Asked <span className="text-red-600">Questions</span>
        </h1>
        <div className="space-y-6">
          {FAQ_DATA.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default Faq