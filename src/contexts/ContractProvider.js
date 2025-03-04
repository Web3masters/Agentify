
import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { MYIDPresaleABI } from "../config/ABI";
import { useAccount } from "wagmi";
import { constant } from "../config/constant";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { useAppKitNetwork } from "@reown/appkit/react";
const MYIDPresaleAddress = constant.presaleAddress;

const ContractContext = createContext(undefined);

export const ContractProvider = ({ children }) => {
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [myidBalance, setMyidBalance] = useState("0");
    const { isConnected, address } = useAccount();
    const [changeAgent, setChangeAgent] = useState(false);
    const [abi, setAbi] = useState();
    const [contractAddress, setContractAddress] = useState("");
    const { chainId, caipNetwork } = useAppKitNetwork();

    const getBalances = async (account) => {
        if (!contract) return;
        try {
            const [, , tokenBalance] = await contract.balancesOf(account);
            const balance = ethers.utils.formatUnits(tokenBalance, 18);
            setMyidBalance(Number(balance).toFixed(2));
        } catch (error) {
            console.error("Error fetching balances:", error);
        }
    };

    const refetchBalance = async (account) => {
        if (account) {
            await getBalances(account);
        }
    };

    useEffect(() => {
        if (isConnected && address) {
            getBalances(address);
        }
    }, [isConnected, address, contract]);

    useEffect(() => {
        const initializeContract = async () => {
            try {
                if (!isConnected || !address) return;
                let detectedProvider = null;
                if (window.ethereum) {
                    detectedProvider = new ethers.providers.Web3Provider(window.ethereum);
                    await detectedProvider.send("eth_requestAccounts", []);
                } else {
                    const walletConnectProvider = await EthereumProvider.init({
                        projectId: constant.projectId,
                        chains: [ constant.chainId ],
                        showQrModal: true,
                    });
                    detectedProvider = new ethers.providers.Web3Provider(walletConnectProvider);
                }
                const accounts = await detectedProvider.listAccounts();
                if (!accounts.length) {
                    // alert("No accounts found. Please connect a wallet.");
                    return;
                }
                const network = await detectedProvider.getNetwork();
                console.log("Network:", network)
                if (network.chainId !== constant.chainId) {
                    // alert("Wrong network detected. Please switch to the correct network.");
                    return;
                }
                const signer = detectedProvider.getSigner();
                const contractInstance = new ethers.Contract(contractAddress || MYIDPresaleAddress, abi || MYIDPresaleABI, signer);
                setProvider(detectedProvider);
                setContract(contractInstance);
                console.log("Contract initialized:", contractInstance);
            } catch (error) {
                console.error("Error initializing contract:", error);
                // alert(error?.message || "Error initializing contract. Check the console for details.");
            }
        };

        initializeContract();
    }, [isConnected, address, changeAgent]);

    return (
        <ContractContext.Provider value={{ provider, contract, myidBalance, refetchBalance, changeAgent, setChangeAgent, setAbi, setContractAddress }}>
            {children}
        </ContractContext.Provider>
    );
};

export const useContract = () => {
    const context = useContext(ContractContext);
    if (!context) {
        throw new Error("useContract must be used within a ContractProvider");
    }
    return context;
};
