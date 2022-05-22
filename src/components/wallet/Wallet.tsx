import Button from "components/buttons/Button";
import { motion } from "framer-motion";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { useCallback, useEffect, useReducer, useState } from "react";
import Web3Modal from "web3modal";
import { ellipseAddress, getChainData } from "utils/providersHelp";

const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
};

/* tslint:disable-next-line */
let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

type StateType = {
  provider?: any;
  web3Provider?: any;
  address?: string;
  chainId?: number;
};

type ActionType =
  | {
      type: "SET_WEB3_PROVIDER";
      provider?: StateType["provider"];
      web3Provider?: StateType["web3Provider"];
      address?: StateType["address"];
      chainId?: StateType["chainId"];
    }
  | {
      type: "SET_ADDRESS";
      address?: StateType["address"];
    }
  | {
      type: "SET_CHAIN_ID";
      chainId?: StateType["chainId"];
    }
  | {
      type: "RESET_WEB3_PROVIDER";
    };

const initialState: StateType = {
  provider: null,
  web3Provider: null,
  address: null || "",
  chainId: null || 56,
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "RESET_WEB3_PROVIDER":
      return initialState;
    default:
      throw new Error();
  }
}

export const Wallet = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { provider, web3Provider, address, chainId } = state;

  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect();

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(provider);

    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();

    const network = await web3Provider.getNetwork();

    dispatch({
      type: "SET_WEB3_PROVIDER",
      provider,
      web3Provider,
      address,
      chainId: network.chainId,
    });
  }, []);

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    },
    [provider]
  );

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts);
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload();
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    } else {
      return;
    }
  }, [provider, disconnect]);

  const chainData = getChainData(chainId);

  const [isHover, toggleHover] = useState(false);
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <nav>
      <div>
        {web3Provider ? (
          <motion.div
            className="menu-item"
            onHoverStart={toggleHoverMenu}
            onHoverEnd={toggleHoverMenu}
          >
            <Button
              variant="secondary"
              className="focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <p>{ellipseAddress(address)}</p>
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </Button>

            <motion.div
              className="sub-menu absolute p-2 md:p-4 z-50 w-auto text-lg rounded-b-md bg-[#59629e] text-white"
              initial="exit"
              animate={isHover ? "enter" : "exit"}
              variants={subMenuAnimate}
            >
              <header className="mb-2">
                {address && (
                  <div>
                    <p className="font-bold">Signed in on network:</p>
                    <p>{chainData?.name}</p>
                  </div>
                )}
              </header>
              <hr></hr>
              <ul className="py-1 mb-2 mt-2">
                <li>
                  <p>Your Profile</p>
                </li>
              </ul>
              <hr></hr>
              <Button onClick={disconnect} variant="red" className="mt-4">
                Disconnect
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <Button onClick={connect} variant="secondary">
            Connect
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Wallet;
