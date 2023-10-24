import React from 'react'
import Header from '../components/Header';

const Page = () => {
  return (
    <div>
      <Header />
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-semibold text-gray-700 mb-4">Contact Us</h1>
          <p className="text-gray-600">
            We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, you can reach out to us using the contact information below.
          </p>
          <p className="mt-4 text-gray-600">
            Email: contact@example.com
          </p>
          <p className="text-gray-600">
            Phone: (123) 456-7890
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page