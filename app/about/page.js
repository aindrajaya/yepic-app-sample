import React from 'react'
import Header from '../components/Header';

const Page = () => {
  return (
    <div>
      <Header />
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-semibold text-gray-700 mb-4">About Us</h1>
          <p className="text-gray-600">
            Welcome to our website! We are a team of passionate individuals dedicated to providing valuable content and services. Our mission is to make a difference and serve the community.
          </p>
          <p className="mt-4 text-gray-600">
            Here, you can learn more about our work, team, and the projects we're involved in. If you have any questions or would like to get in touch, don't hesitate to reach out to us.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page