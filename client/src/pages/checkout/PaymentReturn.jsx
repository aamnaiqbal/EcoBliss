import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const PaymentReturn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const mPaymentId = queryParams.get("m_payment_id");
  const paymentStatus = queryParams.get("payment_status");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!mPaymentId || !paymentStatus) {
        console.error("Missing payment reference or status.");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/order/payfast/verify",
          {
            m_payment_id: mPaymentId,
            payment_status: paymentStatus,
          }
        );

        console.log("Verification response:", response.data);

        if (response.data.success || response.status === 200) {
          navigate(`/checkout/message/:${mPaymentId}`);
        } else {
          console.error("Verification failed on backend.");
        }
      } catch (err) {
        console.error("Verification error:", err.response?.data || err.message);
      }
    };

    verifyPayment();
  }, [mPaymentId, paymentStatus, navigate]);

  return <div>Verifying your payment, please wait...</div>;
};

export default PaymentReturn;
