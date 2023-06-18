import React from "react";
import { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x71eB638C040FaCFeafa3f5aC5C7A4172729e49DB"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const address = useAddress();
  const connect = useMetamask();
  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);
      console.log("Contract call success", data);
    } catch (error) {
      console.log("Contract call failed", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");
    const parsedCampaigns = campaigns.map((campaign, id) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.ammountCollected.toString()
      ),
      image: campaign.image,
      donaters: campaign.donaters,
      pId: id,
    }));
    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );
    return filteredCampaigns;
  };

  const getPaymentCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.donaters.includes(address)
    );
    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaigns", pId, {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  const getDonation = async (pId) => {
    const donations = await contract.call("getDonators", pId);
    const numberOfDonations = donations[0].length;
    const parsedDonations = [];
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        getPaymentCampaigns,
        donate,
        getDonation,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
