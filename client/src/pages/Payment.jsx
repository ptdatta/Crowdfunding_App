import React from "react";
import { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { PaymentCampaigns } from "../components";

const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { contract, address, getPaymentCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getPaymentCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    }
  }, [address, contract]);

  return (
    <PaymentCampaigns
      title="Payment Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};


export default Payment;
