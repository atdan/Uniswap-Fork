import React, {useState} from "react";
import {ethers } from "ethers";
import toast from "react-hot-toast";
import JSBI from "jsbi";
import Web3Modal from "web3modal";

// uniswap
import {SwapRouter} from "@uniswap/universal-router-sdk";
import {
    TradeType,
    Ether,
    Token,
    CurrencyAmount,
    Percent
} from "@uniswap/sdk-core";
import { Trade as V2Trade } from "@uniswap/v2-sdk"
import {Pool, nearestUsableTick, TickMath,
    TICK_SPACINGS, FeeAmount, Trade as V3Trade, Route as RouteV3} from "@uniswap/v3-sdk";

import { MixedRouteTrade, Trade as RouterTrade } from "@uniswap/router-sdk";
import IUniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json"

// Internal import
import { ERC20_ABI, web3Provider, CONNECTING_CONTRACT } from "./constants";
import { shortenAddress, parseErrorMessage } from "../utils";

export const CONTEXT = React.createContext();

export const PROVIDER = ({children}) => {
    const TOKEN_SWAP = "TOKEN SWAP DAPP";
    const [loader, setLoader] = useState(false);
    const [address, setAddress] = useState("");
    const [chainId, setChainId] = useState();

    // Notification
    const notifyError = (msg) => toast.error(msg, {duration: 4000});
    const notifySuccess = (msg) => toast.success(msg, {duration: 4000});

    //connect wallet function
    const connect = async () => {
        try {
            if(!window.ethereum) return notifyError("Install Metamask")

            const accounts = await window.ethereum.req({
                method: "eth_requestAccounts"
            })

            if (accounts.length) {
                setAddress(accounts[0])
            }else {
                notifyError("Sorry, you have no account")
            }

            const provider = await web3Provider();
            const network = await provider.getNetwork();
            setChainId(network.chainId);
        }catch (e) {
            const errorMsg = parseErrorMessage(e);
            notifyError(errorMsg)
            console.log(e);
        }
    }

    const LOAD_TOKEN = async (token) => {
        try {
            const tokenDetail = await CONNECTING_CONTRACT(token);
            return tokenDetail;
        }catch (e) {
            const errorMsg = parseErrorMessage(e);
            notifyError(errorMsg)
            console.log(e);
        }
    }

    // Internal function
    async function getPool(tokenA, tokenB, feeAmount, provider) {
        const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];

        const poolAddress = Pool.getAddress(token0, token1, feeAmount);

        const contract = new ethers.Contract(poolAddress, IUniswapV3Pool, provider);

        let liquidity = await contract.liquidity();
        let {sqrtPriceX96, tick} = await contract.slot0();

        liquidity = JSBI.BigInt(liquidity.toString());
        sqrtPriceX96 = JSBI.BigInt(sqrtPriceX96.toString());

        console.log(`-------- Calling Pool --------`)
        return new Pool(token0, token1, feeAmount, sqrtPriceX96, liquidity, tick, [{
                index: nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[feeAmount]),
                liquidityNet: liquidity,
                liquidityGross: liquidity
            },
            {
                index: nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[feeAmount]),
                liquidityNet: JSBI.multiply(liquidity, JSBI.BigInt("-1")),
                liquidityGross: liquidity
            }
        ])
    }

    async function swapOptions(options) {
        return Object.assign({
            slippageTolerance: new Percent(5, 1000),
            recipient: RECIPIENT,
        }, options)
    }

    // Build Trade
    function buildTrade(trades) {
        return RouterTrade({
            v2Routes: trades.filter((trade) => trade instanceof V2Trade)
                .map((trade) => ({
                    routev2: trade.route,
                    inputAmount: trade.inputAmount,
                    outputAmount: trade.outputAmount,
                })),
            v3Routes: trades.filter((trade) => trade instanceof V3Trade)
                .map((trade) => ({
                    routev3: trade.route,
                    inputAmount: trade.inputAmount,
                    outputAmount: trade.outputAmount,
                })),
            mixedRoutes: trades.filter((trade) => trade instanceof V2Trade)
                .map((trade) => ({
                    mixedRoute: trade.route,
                    inputAmount: trade.inputAmount,
                    outputAmount: trade.outputAmount,
                })),
            tradeType: trades[0].tradeType,
        })
    }

    //DEMO account
    const RECIPIENT = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";

    // Swap Function
    const swap = async (token_1, token_2, swapInputAmount) => {
        try {
            console.log("Calling swap")
            const _inputAmount = 1;
            const provider = web3Provider();

            const network = (await provider).getNetwork();
            // const ETHER = Ether.onChain((await network).chainId);
            const ETHER = Ether.onChain(1);

            // Token Contract
            const tokenAddress1 = await CONNECTING_CONTRACT("");
            const tokenAddress2 = await CONNECTING_CONTRACT("");


            // token details
            const TOKEN_A = new Token(
                tokenAddress1.chainId,
                tokenAddress1.address,
                tokenAddress1.decimals,
                tokenAddress1.symbol,
                tokenAddress1.name
            );

            const TOKEN_B = new Token(
                tokenAddress2.chainId,
                tokenAddress2.address,
                tokenAddress2.decimals,
                tokenAddress2.symbol,
                tokenAddress2.name
            )

            const WETH_USDC_V3 = await getPool(
                TOKEN_A, TOKEN_B, FeeAmount.MEDIUM, provider);

            const inputEther = ethers.utils.parseEther("1").toString();

            const trade = await V3Trade.fromRoute(
                new RouteV3([WETH_USDC_V3], ETHER, TOKEN_B),
                CurrencyAmount.fromRawAmount(Ether, inputEther),
                TradeType.EXACT_INPUT
            );

            const routerTrade = buildTrade([trade]);

            const opts = swapOptions({});

            const params = SwapRouter.swapERC20CallParameters(routerTrade, opts);

            console.log(WETH_USDC_V3);
            console.log(trade);
            console.log(routerTrade);
            console.log(opts);
            console.log(params);

            let ethBalance, tokenA, tokenB;

            ethBalance = (await provider).getBalance(RECIPIENT);
            tokenA = await tokenAddress1.balance;
            tokenB = await tokenAddress2.balance;

            console.log("-------------Before")
            console.log(`Ethbalance: ${ethers.utils.formatUnits(ethBalance.toString())}`)
            console.log(`tokenA: ${tokenA}`)
            console.log(`tokenB: ${tokenB}`)

            const tx = await signer.sendTransaction({
                data: params.calldata,
                to: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", // recipient
                value: params.value,
                from: RECIPIENT,
            });

            console.log("Calling tx")

            const reciept = await tx.wait();

            console.log("-------------Success")

            console.log(`Status: ${reciept.status}`)

            ethBalance = (await provider).getBalance(RECIPIENT);
            tokenA = await tokenAddress1.balance;
            tokenB = await tokenAddress2.balance;

            console.log("-------------After")

            console.log(`Ethbalance: ${ethers.utils.formatUnits(ethBalance.toString())}`)
            console.log(`tokenA: ${tokenA}`)
            console.log(`tokenB: ${tokenB}`)
        }catch (e) {
            const errorMsg = parseErrorMessage(e);
            notifyError(errorMsg)
            console.log(e);
        }
    }

    return (
        <CONTEXT.Provider value={{TOKEN_SWAP, LOAD_TOKEN, notifyError, notifySuccess,
            setLoader, loader, connect, address, swap}}></CONTEXT.Provider>
    )
}
