import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    try {
      // Gửi yêu cầu tạo PaymentIntent tới backend
      const { data } = await axios.post(
        "http://localhost:5000/create-payment-intent",
        { amount }
      );

      // Xử lý thanh toán với Stripe
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setPaymentSucceeded(true);
        }
      }
    } catch (error) {
      setError(error.message);
      setProcessing(false);
    }
  };

  return (
    <div>
      <h1>Thanh toán bằng Stripe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Nhập số tiền"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <CardElement />
        <button type="submit" disabled={!stripe || processing}>
          {processing ? "Đang xử lý..." : "Thanh toán"}
        </button>
      </form>

      {error && <div>{error}</div>}
      {paymentSucceeded && <div>Thanh toán thành công!</div>}
    </div>
  );
};

export default CheckoutForm;
