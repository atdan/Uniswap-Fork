import React, {useState, useContext} from "react";
import { Header,
  Footer,
  Feature,
  Hero,
  Platfrom,
  Preloader,
  Scroll,
  Scurity,
  Statistics,
  Testomonial,
  Token } from "../components/index"

import { CONTEXT } from "../context/context";



const index = () => {
  const {TOKEN_SWAP, LOAD_TOKEN, notifyError, notifySuccess,
    setLoader, loader, connect, address, swap} = useContext(CONTEXT);

  // Open Token COmponent
  const [token_1, setToken_1] = useState();
  const [token_2, setToken_2] = useState();
  const [openToken, setOpenToken] = useState(false);

  // Input
  const [slippageAmount, setSlippageAmount] = useState(2);
  const [deadline, setDeadline] = useState(10);
  const [inputAmount, setInputAmount] = useState(undefined);

  //Output
  const [outputAmount, setOutputAmount] = useState(undefined);
  const [transaction, setTransaction] = useState(undefined);
  const [ratio, setRatio] = useState(undefined);

  return (
      <div>

        <Preloader />
        <Header address={address} connect={connect}/>
        <Hero
            setInputAmount={setInputAmount}
            setLoader={setLoader}
            LOAD_TOKEN={LOAD_TOKEN}
            token_1={token_1}
            token_2={token_2}
            setToken_1={setToken_1}
            setToken_2={setToken_2}
            swap={swap}
            setOpenToken={setOpenToken}
        />
        <Feature />
        <Platfrom />
        <Statistics />
        <Scurity />
        <Testomonial />
        <Footer />

          {
              !openToken && (
                  <div className="new_loader">
                    <Token notifyError={notifyError} notifySuccess={notifySuccess}
                        setOpenToken={setOpenToken}
                           LOAD_TOKEN={LOAD_TOKEN}
                           token_1={token_1}
                           token_2={token_2}
                           setToken_1={setToken_1}
                           setToken_2={setToken_2}/>
                  </div>
              )
          }
      </div>
  )
};

export default index;
