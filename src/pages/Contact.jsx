import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Footer from "../components/Footer";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // You'll need to replace these with your actual EmailJS service details
    emailjs
      .send(
        "service_id", // Replace with your service ID
        "template_id", // Replace with your template ID
        {
          from_name: form.name,
          to_name: "Derek",
          from_email: form.email,
          to_email: "your-email@example.com", // Replace with your email
          message: form.message,
        },
        "public_key" // Replace with your public key
      )
      .then(() => {
        setLoading(false);
        setSuccess(true);

        setForm({
          name: "",
          email: "",
          message: "",
        });

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <section className="max-container px-4 sm:px-8 py-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="head-text text-white text-center sm:text-left">
          Get in Touch
        </h1>
        <p className="text-slate-400 mt-2 mb-8 text-center sm:text-left">
          Feel free to reach out if you have any questions or want to work
          together!
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 mt-6"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What should I call you?"
              className="bg-gray-800 py-3 px-4 placeholder:text-gray-500 text-white rounded-lg outlined-none border border-gray-700"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="bg-gray-800 py-3 px-4 placeholder:text-gray-500 text-white rounded-lg outlined-none border border-gray-700"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to say?"
              className="bg-gray-800 py-3 px-4 placeholder:text-gray-500 text-white rounded-lg outlined-none border border-gray-700"
              required
            />
          </label>

          <button
            type="submit"
            className="btn-primary py-3 px-8 outline-none w-fit mx-auto sm:mx-0"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-green-500 mt-2">
              Thank you for your message! I'll get back to you soon.
            </p>
          )}
        </form>
      </motion.div>
      <Footer />
    </section>
  );
};

export default Contact;
