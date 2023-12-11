import Link from 'next/link'
import { useRouter } from 'next/router';
function CardWallet({wallet , user}) {
    const router = useRouter();
    const path = router.asPath.split('/');

    
    return (
        <>
            <div className="container-fluid px-4 inner-coin-bnr">
        <div className="row pe-4 ps-5">
          <div className="col-md-6 inner-coin">
            <h1>
              <i className="bi bi-credit-card fs-1 me-3"></i>

              <font>Card</font>
              <br />
              <p className="mb-0">{Number(wallet.balance).toFixed(2)}</p>
              <div className="fs-3">USD</div>
              <p />
            </h1>
          </div>
          <div className="col-md-5">
            <div className="">
              <div className="row p-3 pt-0 pb-0 amount-box">
                <div className="col-sm-6 mb-2 pe-1">
                  <label className={`depo-lbl depo-lbl-fst`}>
                    <Link href={`/user/card/load`}>LOAD</Link>{" "}
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
  
  export default CardWallet;
