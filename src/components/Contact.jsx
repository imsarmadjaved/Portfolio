// src/components/Contact.jsx
import React, { useState } from "react";
import { portfolioData } from "../data/PortfolioData";

const Contact = () => {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      label: "Phone",
      value: personal.phone,
      href: `tel:${personal.phone}`,
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      label: "Location",
      value: personal.location,
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-[var(--bg-secondary)] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-[var(--accent-primary)]/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-[var(--accent-secondary)]/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent-primary)]/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-down">
          <span className="text-[var(--accent-primary)] text-sm font-medium uppercase tracking-wider mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 relative inline-block">
            Contact Me
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full"></div>
          </h2>
          <p className="text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto">
            Have a question or want to work together? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Contact Info */}
          <div
            className="lg:col-span-2 space-y-6"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group backdrop-blur-md bg-[var(--bg-primary)]/70 rounded-2xl p-6 shadow-lg border border-[var(--neutral-200)]/10 hover:border-[var(--accent-primary)]/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={250 + index * 50}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 backdrop-blur-sm flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 group-hover:from-[var(--accent-primary)]/30 group-hover:to-[var(--accent-secondary)]/30 transition-all duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-tertiary)] mb-1">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-[var(--text-primary)] font-medium hover:text-[var(--accent-primary)] transition-colors duration-300"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-[var(--text-primary)] font-medium">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div
              className="backdrop-blur-md bg-[var(--bg-primary)]/70 rounded-2xl p-6 shadow-lg border border-[var(--neutral-200)]/10 hover:border-[var(--accent-primary)]/30 transition-all duration-500"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <p className="text-sm text-[var(--text-tertiary)] mb-4">
                Connect on social media
              </p>
              <div className="flex gap-3">
                <a
                  href={personal.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full backdrop-blur-sm bg-[var(--bg-tertiary)]/50 flex items-center justify-center text-[var(--text-secondary)] hover:bg-gradient-to-r hover:from-[var(--accent-primary)] hover:to-[var(--accent-secondary)] hover:text-white transition-all duration-300 border border-[var(--neutral-200)]/10"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href={personal.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full backdrop-blur-sm bg-[var(--bg-tertiary)]/50 flex items-center justify-center text-[var(--text-secondary)] hover:bg-gradient-to-r hover:from-[var(--accent-primary)] hover:to-[var(--accent-secondary)] hover:text-white transition-all duration-300 border border-[var(--neutral-200)]/10"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div
            className="lg:col-span-3"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <form
              onSubmit={handleSubmit}
              className="backdrop-blur-md bg-[var(--bg-primary)]/70 rounded-2xl p-8 shadow-lg border border-[var(--neutral-200)]/10 hover:border-[var(--accent-primary)]/30 transition-all duration-500"
            >
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
                Send me a message
              </h3>

              <div className="space-y-5">
                {/* Name Input */}
                <div data-aos="fade-up" data-aos-delay="350">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 backdrop-blur-sm bg-[var(--bg-secondary)]/50 border border-[var(--neutral-200)]/20 rounded-xl text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all duration-300"
                    placeholder="Full Name"
                  />
                </div>

                {/* Email Input */}
                <div data-aos="fade-up" data-aos-delay="400">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 backdrop-blur-sm bg-[var(--bg-secondary)]/50 border border-[var(--neutral-200)]/20 rounded-xl text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all duration-300"
                    placeholder="email@example.com"
                  />
                </div>

                {/* Message Input */}
                <div data-aos="fade-up" data-aos-delay="450">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 backdrop-blur-sm bg-[var(--bg-secondary)]/50 border border-[var(--neutral-200)]/20 rounded-xl text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div data-aos="fade-up" data-aos-delay="500">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-medium rounded-xl transition-all duration-300 ${
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:shadow-lg hover:shadow-[var(--accent-primary)]/25 hover:-translate-y-0.5"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </span>
                    )}
                  </button>
                </div>

                {/* Success Message */}
                {submitStatus === "success" && (
                  <div
                    className="mt-4 p-4 backdrop-blur-md bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 text-sm text-center"
                    data-aos="fade-up"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
