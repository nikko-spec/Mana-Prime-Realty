"use client";

import { useState } from "react";

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

export default function InquiryForm({ listings = [], defaultListing = "" }) {
  const [values, setValues] = useState({
    listing: defaultListing,
    name: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  function handleChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "inquiry", ...values }),
      });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-banyan text-cream p-6">
        <p className="eyebrow text-gold-light">Thank you</p>
        <p className="mt-2 font-display text-xl italic">
          We got your message — an agent will reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      name="inquiry"
      onSubmit={handleSubmit}
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="bg-banyan text-cream p-6"
    >
      <input type="hidden" name="form-name" value="inquiry" />
      <p className="hidden">
        <label>
          Don&apos;t fill this out: <input name="bot-field" onChange={handleChange} />
        </label>
      </p>

      <p className="eyebrow text-gold-light">Talk to an agent</p>
      <h3 className="mt-2 font-display text-2xl italic">Ask about a listing</h3>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide text-cream/60">Listing</span>
          <select
            name="listing"
            value={values.listing}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-sm border border-cream/20 bg-banyan-light px-3 py-2 text-sm text-cream focus:outline-none"
          >
            <option value="" disabled>
              Select a listing
            </option>
            {listings.map((l) => (
              <option key={l.slug} value={l.title}>
                {l.title}
              </option>
            ))}
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wide text-cream/60">Name</span>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-sm border border-cream/20 bg-banyan-light px-3 py-2 text-sm text-cream placeholder:text-cream/30 focus:outline-none"
            placeholder="Juan Dela Cruz"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wide text-cream/60">Email</span>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-sm border border-cream/20 bg-banyan-light px-3 py-2 text-sm text-cream placeholder:text-cream/30 focus:outline-none"
            placeholder="juan@email.com"
          />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-wide text-cream/60">Phone</span>
          <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-sm border border-cream/20 bg-banyan-light px-3 py-2 text-sm text-cream placeholder:text-cream/30 focus:outline-none"
            placeholder="+63 9XX XXX XXXX"
          />
        </label>

        <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
          {status === "sending" ? "Sending…" : "Send Inquiry"}
        </button>

        {status === "error" && (
          <p className="text-sm text-red-300">
            Something went wrong. Please try again or call us directly.
          </p>
        )}
      </div>
    </form>
  );
}
