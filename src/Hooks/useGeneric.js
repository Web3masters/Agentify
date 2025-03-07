import { useState } from "react";
import { ethers } from "ethers";
import { constant } from "../config/constant";
import { usdtABI } from "../config/usdtABI";
import { useContract } from "../contexts/ContractProvider";
export const useGeneric = () => {
    const [processing, setProcessing] = useState(false);
    const [convertionFailed, setConvertionFailed] = useState(false);
    const [approveSuccess, setApproveSuccess] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [errorReason, setErrorReason] = useState("");
    const { contract, provider } = useContract();
    const handleError = (error, tokenType) => {
        console.error(`Error with ${tokenType}:`, error);
        setErrorReason(error.message || "An unknown error occurred.");
    };
    const functionCall = async (functionName, params, gasFees) => { // isGas
        if (!contract) {
            console.log("Contract not found", gasFees)
            return;
        }
        console.log("value", params);
        try {
            // const usdtAmountBigNumber = ethers.parseUnits(value, 6);
            const args = Object.values(params);
            console.log("args", args);
            if (typeof contract[functionName] !== "function") {
                throw new Error(`Function ${functionName} does not exist on the contract`);
            }
            let res;
            // if (isGas === true) {
            console.log("Step1:", gasFees)
            const gasLimit = await contract?.estimateGas[functionName](...args)
            // console.log("GAS:", gasLimit)
            const token = await contract[functionName](...args, { gasLimit: gasLimit });
            console.log("token:", token)
            const receipt = await token.wait();
            console.log("RECEIPT:", receipt)
            return { data: receipt, isGas: true, success: true };
            // } else {
            //     console.log("Step2:", isGas)
            //     res = await contract[functionName](...args);
            //     console.log("RES:", res)
            //     const tokenValue = Number(ethers.formatUnits(res, 6));
            //     console.log("RES:", res)
            //     return { data: tokenValue, isGas: false, success: true };
            // }
        } catch (error) {
            console.log("Step3:", error)
            console.error("Error fetching token value:", error);
            handleError(error, "USDT");
            setConvertionFailed(true);
            return { data: null, isGas: false, success: false };
        }
    };
    const approveCall = async (usdtValue) => {
        if (!contract || !provider) return;
        setProcessing(true);
        try {
            const usdtAmountBigNumber = ethers.parseUnits(usdtValue, 6);
            const { usdtAddress, presaleAddress } = constant;
            const signer = provider.getSigner();
            const signerAddress = await signer.getAddress();
            const usdtContract = new ethers.Contract(usdtAddress, usdtABI, signer);
            const usdtBalance = await usdtContract.balanceOf(signerAddress);
            if (usdtBalance.lt(usdtAmountBigNumber)) {
                // alert("Insufficient USDT balance.");
                setFailed(true);
                return;
            }
            const currentAllowance = await usdtContract.allowance(signerAddress, presaleAddress);
            if (currentAllowance.lt(usdtAmountBigNumber)) {
                if (currentAllowance.gt(0)) {
                    const resetTx = await usdtContract.approve(presaleAddress, 0, { gasLimit: 100000 });
                    const resetReceipt = await resetTx.wait();
                    if (resetReceipt.status === 1) {
                        setResetSuccess(true);
                    } else {
                        // alert("Failed to reset allowance.");
                        setFailed(true);
                        return;
                    }
                }
                const approveTx = await usdtContract.approve(presaleAddress, usdtAmountBigNumber, { gasLimit: 100000 });
                const approveReceipt = await approveTx.wait();
                if (approveReceipt.status === 1) {
                    setApproveSuccess(true);
                } else {
                    setFailed(true);
                    setErrorReason("USDT approval transaction failed.");
                    return;
                }
            }
        } catch (error) {
            console.error("Error in approveCall:", error);
            setFailed(true);
            setErrorReason(error.message);
        } finally {
            setProcessing(false);
        }
    };
    return {
        functionCall,
        approveCall,
        states: {
            processing,
            convertionFailed,
            approveSuccess,
            resetSuccess,
            failed,
            errorReason,
        },
    };
};