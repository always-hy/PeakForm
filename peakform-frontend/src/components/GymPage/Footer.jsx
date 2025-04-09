"use client";
import React, { useState } from "react";

/**
 * FooterLink component for navigation links
 */
function FooterLink({ href, children, className = "" }) {
  return (
    <li className={className}>
      <a href={href || "#"} className="hover:text-white transition-colors">
        {children}
      </a>
    </li>
  );
}

/**
 * FooterLinkGroup component for grouped navigation links
 */
function FooterLinkGroup({ title, links }) {
  return (
    <nav className="leading-none">
      <h3 className="text-xl font-bold text-neutral-50">{title}</h3>
      <ul className="mt-8 text-base text-zinc-400">
        {links.map((link, index) => (
          <FooterLink
            key={index}
            href={link.href}
            className={index > 0 ? "mt-6" : ""}
          >
            {link.text}
          </FooterLink>
        ))}
      </ul>
    </nav>
  );
}

/**
 * NewsletterForm component for email subscription
 */
function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mt-8 max-w-full text-base rounded-none w-[488px]"
    >
      <div className="flex flex-col justify-center w-full leading-none text-white min-h-[55px] max-md:max-w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className="flex-1 gap-3.5 self-stretch py-4 pr-4 pl-5 rounded-lg bg-neutral-800 size-full max-md:max-w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>
      <button
        type="submit"
        className="flex z-10 flex-col justify-center items-center self-end px-4 py-3.5 mt-0 w-44 max-w-full font-bold leading-7 text-right whitespace-nowrap bg-green-500 rounded-none min-h-[55px] text-neutral-50 hover:bg-green-600 transition-colors"
      >
        <span className="gap-2.5 self-stretch">Join</span>
      </button>
    </form>
  );
}

/**
 * Footer component - Main footer for the page
 */
function Footer() {
  // Company links data
  const companyLinks = [
    { text: "Service", href: "#" },
    { text: "Resources", href: "#" },
    { text: "About us", href: "#" },
  ];

  // Help links data
  const helpLinks = [
    { text: "Customer Support", href: "#" },
    { text: "Terms & Conditions", href: "#" },
    { text: "Privacy Policy", href: "#" },
  ];

  return (
    <footer className="flex flex-col justify-center items-center px-2.5 pt-24 w-full bg-stone-950 max-md:max-w-full">
      <div className="flex flex-col justify-center py-12 max-w-full w-[1280px]">
        {/* Footer content grid */}
        <div className="flex flex-wrap gap-5 justify-between items-start w-full max-md:max-w-full">
          {/* Logo and description */}
          <div className="flex flex-col min-w-60 w-[496px] max-md:max-w-full">
            <div className="flex flex-col justify-center self-start text-2xl font-semibold leading-none whitespace-nowrap text-zinc-50">
              <a
                href="#"
                className="flex overflow-hidden gap-2 justify-center items-center hover:opacity-80 transition-opacity"
              >
                <img
                  src="/logo.png"
                  alt="PeakForm Logo"
                  className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                />
                <h2 className="self-stretch my-auto h-4 w-[116px]">PeakForm</h2>
              </a>
            </div>
            <p className="mt-8 max-w-full text-xl leading-8 text-zinc-400 w-[496px] max-md:max-w-full">
              Data analysis software is a type of software tool used for data
              analysis and reporting.
            </p>
          </div>

          {/* Company links */}
          <FooterLinkGroup title="Company" links={companyLinks} />

          {/* Help links */}
          <FooterLinkGroup title="Help" links={helpLinks} />

          {/* Newsletter subscription */}
          <div className="min-w-60 w-[487px] max-md:max-w-full">
            <h3 className="text-xl font-bold leading-none text-neutral-50">
              Subscribe to Newsletter
            </h3>
            <NewsletterForm />
          </div>
        </div>

        {/* Footer divider */}
        <div className="mt-12 w-full border border-solid bg-zinc-800 border-zinc-800 min-h-px max-md:mt-10 max-md:max-w-full" />
      </div>
    </footer>
  );
}

export default Footer;
