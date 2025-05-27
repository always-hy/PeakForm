"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51RQAQaBCtau77VoyhtdPCJKrJ1nV1ZeF4wVn4lQqpfRVusyctKOAxMPcRc8xUjZefBMltN9sCmlg79JpCLNWwyIl003EilSdFo"); // Replace with your public key

const CARD_OPTIONS = {
  style: {
    base: {
      color: "#ffffff",
      fontSize: "16px",
      iconColor: "#05A31D",
      "::placeholder": { color: "#aaa" },
    },
    invalid: {
      iconColor: "#fa755a",
      color: "#fa755a",
    },
  },
};

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/payment/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userUuid: "9fa2fa3e-a194-4187-95a3-5c818c433973",
          amount: 1000,
          currency: "usd",
          paymentMethodId: paymentMethod.id,
        }),
        credentials: "include", // Include cookies for session management
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || "Payment failed");

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1c1c1c] p-8 rounded-2xl shadow-lg w-full max-w-lg border border-[#05A31D]"
    >
      <h2 className="text-white text-2xl font-bold mb-4 text-center">
        Enter Payment Details
      </h2>

      <div className="mb-6 text-white">
        <h3 className="text-lg font-semibold mb-2">You're purchasing:</h3>
        <ul className="list-none space-y-1">
          <li className="flex items-center gap-2">
            <span className="text-[#05A31D]">✔</span> Get a tracking dashboard.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#05A31D]">✔</span> AI workout planner
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#05A31D]">✔</span> Track metrics
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#05A31D]">✔</span> Follow friends
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#05A31D]">✔</span> Create goals
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#05A31D]">✔</span> Get ripped
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <CardElement
          options={CARD_OPTIONS}
          className="p-4 bg-black rounded-lg border border-gray-700"
        />
      </div>
      {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
      {success && (
        <div className="text-green-500 mb-4 text-sm">Payment successful!</div>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[#05A31D] text-black font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition duration-300"
      >
        {loading ? "Processing..." : "Pay $10.00"}
      </button>
    </form>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
