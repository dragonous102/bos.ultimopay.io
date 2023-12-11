import Link from 'next/link'
import { useRouter } from 'next/router';
function WalletCommon({wallet , id , user}) {
    const router = useRouter();
    const path = router.asPath.split('/');
    const balanceWithoutCommas = wallet.data.balance.replace(/,/g, '');

    
    return (
        <>
            <div className="container-fluid px-4 inner-coin-bnr">
        <div className="row pe-4 ps-5">
          <div className="col-md-6 inner-coin">
            <h1>
            <span dangerouslySetInnerHTML={{ __html: wallet.icon.replace('%height%', 40).replace('%width%', 40) }}></span>

              <font>{wallet.title}</font>
              <br />
              {(wallet.data.currency == 'USDC' || wallet.data.currency == 'BUSD') ? <p className="mb-0">{Number(Math.floor(wallet.data.balance * 1000000) / 1000000).toFixed(wallet.float)}</p> : <p className="mb-0">{Number(balanceWithoutCommas).toFixed(wallet.float)}</p> }
              
              <div className="fs-3">{wallet.data.currency}</div>
              <p />
            </h1>
          </div>
          <div className="col-md-5">
            <div className="">
              <div className="row p-3 pt-0 pb-0 amount-box">
                <div className="col-sm-6 mb-2 pe-1">
                  <label className={`depo-lbl ${path[2] === `deposit`? `depo-lbl-fst` : ``} `}>
                    <Link href={`/user/deposit/`+id}>DEPOSIT</Link>{" "}
                  </label>
                </div>
                <div className="col-sm-6 mb-2 ps-1">
                  <label className={`depo-lbl ${path[2] === `withdraw` ? `depo-lbl-fst` : ``} `}>
                   <Link href={`/user/withdraw/`+id}>WITHDRAW</Link>{" "}
                  </label>
                </div>
                <div className="col-sm-6 mb-2 pe-1">
                  <label className={`depo-lbl ${path[2] === `buy`? `depo-lbl-fst` : ``} `}>
                  <Link href={`/user/buy/`+id}>BUY</Link>{" "}
                  </label>
                </div>
                <div className="col-sm-6 mb-2 ps-1">
                  <label className={`depo-lbl ${path[2] === `sell`? `depo-lbl-fst` : ``} `}>
                  <Link href={`/user/sell/`+id}>SELL</Link>{" "}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    )
  }
  
  export default WalletCommon;
