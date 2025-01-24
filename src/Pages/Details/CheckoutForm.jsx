import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";

const CheckoutForm = ({ bookingData, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      Swal.fire("Error", "Card element not found", "error");
      return;
    }

    setProcessing(true);

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
      setProcessing(false);
      return;
    }

    // Send data to the server
    const paymentData = {
      ...bookingData,
      paymentMethodId: paymentMethod.id,
    };

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const result = await res.json();
      if (result.success) {
        Swal.fire("Success", "Payment successful!", "success");
        onSuccess(); // Call the callback function to close the modal
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Payment failed", "error");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
      />
      <button
        type="submit"
        className="btn btn-sm btn-primary my-4"
        disabled={!stripe || processing}
      >
        {processing ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;
