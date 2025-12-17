import React, { useState } from "react";

export default function About() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    rating: "",
    message: ""
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Feedback submitted successfully!");
    setFeedback({ name: "", email: "", rating: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      
      {/* ABOUT SECTION */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 max-w-4xl mx-auto text-left">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About SkinGlow! ✨</h2>

        <p className="text-gray-600 mb-4 leading-relaxed">
          We provide the best quality skincare products at affordable prices. Our mission is to bring glow and comfort through effective skincare solutions.
        </p>

        <p className="text-gray-600 leading-relaxed">
          With years of experience in the beauty industry, we carefully curate our product selection featuring natural ingredients, scientifically proven formulas, and dermatologist-approved products for all skin types.
        </p>
      </div>

      {/* CONTACT SECTION */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 max-w-4xl mx-auto text-left">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>

        <div className="space-y-3">
          <p className="text-gray-700"><span className="font-semibold">Email:</span> support@skinglow.com</p>
          <p className="text-gray-700"><span className="font-semibold">Phone:</span> +1 (555) 123-4567</p>
          <p className="text-gray-700"><span className="font-semibold">Address:</span> 123 Beauty Street, Wellness Valley, CA 94025</p>
          <p className="text-gray-700"><span className="font-semibold">Business Hours:</span> Monday - Friday: 9:00 AM - 6:00 PM</p>
        </div>
      </div>

      {/* FEEDBACK FORM */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto text-left">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Feedback Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              name="name"
              value={feedback.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              name="email"
              value={feedback.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Rating</label>
            <select
              name="rating"
              value={feedback.rating}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="">Select rating</option>
              <option>⭐ 1</option>
              <option>⭐⭐ 2</option>
              <option>⭐⭐⭐ 3</option>
              <option>⭐⭐⭐⭐ 4</option>
              <option>⭐⭐⭐⭐⭐ 5</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Feedback</label>
            <textarea
              name="message"
              value={feedback.message}
              onChange={handleChange}
              placeholder="Share your feedback about our products and service"
              className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl mt-4"
          >
            SUBMIT FEEDBACK
          </button>
        </form>
      </div>
    </div>
  );
}