
function Pdf3({ dynamicData , userdata }) {
   
  return (
     
      <>
        <div id="pdf3" className=" pdfdata">
        <div style={{ width: "100%", marginTop: 100 }}>
  <div style={{ width: "90%", margin: "auto", fontSize: 18 }}>
    <table style={{ width: "90%", margin: "auto", padding: 0 }}>
      <tbody>
        <tr>
          <td>
            <div style={{ width: "50%", float: "left" }}>
              <img src="/pdf_logo.png" width="100px" />
            </div>
          </td>
          <td>
            <div style={{ width: "50%", float: "right", textAlign: "end" }}>
              {" "}
              <label htmlFor="" style={{ fontSize: 18 }}>
                No
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 150
                }}
              />{" "}
              /JDB{" "}
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div style={{ width: "50%", float: "left" }} />
          </td>
          <td>
            <div style={{ width: "50%", float: "right", textAlign: "end" }}>
              {" "}
              <label htmlFor="" style={{ fontSize: 18 }}>
                Joint Development Bank, dated
              </label>{" "}
              <input
                type="date"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 150
                }}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <h1 style={{ margin: "10px auto", textAlign: "center", width: "90%" }}>
      International Card Use Agreement
    </h1>
    <h3 style={{ margin: "30px auto", textAlign: "center", width: "90%" }}>
      International Card Use Agreement "Agreement" was made at Joint
      Development Bank Limited by and between
    </h3>
    <p style={{ width: "90%" }}>
      {" "}
      <b> Joint Development Bank Limited,</b> having its Head Office at 82,Lane
      Xang Avenue, Hatsady Village, Chanthaboury District, Vientiane Capital,
      P.O. Box 3187, Telephone: 021 213531-6 Fax (856-21) 213 530hereafter call{" "}
      <b>
        {" "}
        <q> "Bank" </q>{" "}
      </b>
    </p>
    <h3 style={{ textAlign: "center", margin: 0, padding: 0 }}> and</h3>
    <table style={{ width: "90%", margin: "auto", padding: 0 }}>
      <tbody>
        <tr>
          <td>
            <label htmlFor="">Mr/Mrs</label>{" "}
            <input
              type="text"
              value={(userdata) ? `${userdata.given_name}  ${userdata.sur_name}` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: "30%"
              }}
            />{" "}
            ,<label htmlFor="">date of birth</label>
            <input
              type="date"
              value={(userdata) ? `${userdata.date_of_birth} ` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: "15%"
              }}
            />
            ,<label htmlFor=""> ID card/Passport number</label>
            <input
              type="text"
              value={(userdata) ? `${userdata.id_card_number} ` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: "15%"
              }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="">date.</label>{" "}
            <input
              type="text"
              value={(userdata) ? `${userdata.id_card_issued_date} ` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: "20%"
              }}
            />{" "}
            ,<label htmlFor="">date of expiry</label>{" "}
            <input
              type="text"
              value={(userdata) ? `${userdata.id_card_expired_date} ` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: "20%"
              }}
            />{" "}
            ,<label htmlFor=""> issued by</label>
            <input
              type="text"
              value={(userdata) ? `${userdata.id_card_issuer} ` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: "30%"
              }}
            />
            ,
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="">Residing address</label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: "15%"
              }}
            />
            <label htmlFor="">district.</label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: "15%"
              }}
            />
            <label htmlFor="">province</label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: "15%"
              }}
            />
            <label htmlFor="">telephone</label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: "15%"
              }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="">Fax</label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: "15%"
              }}
            />
            <label htmlFor="">email</label>{" "}
            <input
              type="text"
              value={(userdata) ? `${userdata.email_address} ` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: "15%"
              }}
            />
            <label htmlFor="">
              Hereafter call <b> "Cardholder" </b>
            </label>
          </td>
        </tr>
      </tbody>
    </table>
    <p style={{ width: "80%", textAlign: "center" }}>
      Both parties be referred to collectively as the <b> "Parties" </b> or
      individually as a <b> "Party". </b> <br />
      Both parties have unanimously agreed inter into International Card Use
      Agreement under the terms and conditions below:
    </p>
    <h3 style={{ margin: 0, padding: 0 }}>Article 1 Definition</h3>
    <ol
      style={{
        width: "80%",
        margin: 0,
        padding: 0,
        fontSize: 20,
        marginLeft: 80
      }}
    >
      <li style={{ margin: 0, padding: 0 }}>
        Bank: (abstract JDB) means Joint Development Bank Limited;
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        Card owner means main cardholder and additional card issued by the Bank
        under this Agreement;
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        ATM means Automatically Transaction Machine for cash withdraw and check
        the balance;
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        EDC (card transaction machine) means Electronic Data Capture Machine for
        electronic transaction service;
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        International Card means electronic card for cash payment such as: Visa
        Debit, Visa Credit, UPI Debit, UPI Credit and other type of card issued
        by the Bank;
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        3D secure (3 Domains secure) is fully verified by Visa and subject to
        secure your online transactions.
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        OTP (One-Time Password) service provided by Joint Development Bank (the
        "Bank") will be sent to your e-Mail address or mobile phone number
        already registered in the bank system via e-Mail or SMS.
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        Debt Statement means invoice to cardholder for repayment to the Bank in
        accordance with terms and conditions of this Agreement;
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        Main card is a card issued by the Bank to the cardholder, cardholder
        hereafter call "Main card owner;
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        Additional card is a card issued by the Bank to other person requested
        by main card owner, additional cardholder hereafter call "Additional
        card owner". The main card is able to request for issuing additional
        card at a maximum one card only. In the event of security by a company,
        the additional card cannot be issued (the Bank is not authorized to
        issue additional card).
      </li>
    </ol>
    <h3 style={{ margin: 0, padding: 0, marginTop: 30 }}>
      Article 2 Objective
    </h3>
    <ol
      style={{
        width: "80%",
        margin: 0,
        padding: 0,
        fontSize: 20,
        marginLeft: 80
      }}
    >
      <li style={{ margin: 0, padding: 0 }}>
        Cardholder desires to use the card from the Bank in order to use for
        payment according to the type of card as provided for in the
        registration form as attached here to and it is a part of this Agreement
        and customer agrees to perform in accordance with this Agreement,
        regulation, law and rule of International Visa Center;
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        The Bank agrees to issue card to the cardholder under the terms and
        conditions of this Agreement.
      </li>
    </ol>
    <h3 style={{ margin: 0, padding: 0, marginTop: 30 }}>
      Article 3 Main and Additional Card
    </h3>
    <ol
      style={{
        width: "80%",
        margin: 0,
        padding: 0,
        fontSize: 20,
        marginLeft: 80
      }}
    >
      <li style={{ margin: 0, padding: 0 }}>
        Additional card is a card issued by the Bank to other person requested
        by main card owner, additional cardholder hereafter call "Additional
        card owner". The main card is able to request for issuing additional
        card at a maximum one card only. In the event of security by a company,
        the additional card cannot be issued (the Bank is not authorized to
        issue additional card);
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        Main card owner and additional card shall use the account and credit
        line, such both transaction will appear at the same debt statement and
        will be only delivered to the main card owner;
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        Main card owner agrees and takes responsible for all transaction appear
        in the debt statement of the Bank and such debt is the card ownerâ€™s
        debt to be repaid to the Bank whatever the transaction have been accrued
        from main or additional card;
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        In the event of termination additional card is required, the main card
        owner shall request to the Bank for termination in writing;
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        If the main card owner desires to terminate his/her card the additional
        card will be terminated together;
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        Using card by main card owner and additional card owner shall be
        strictly performed under the terms and conditions of this Agreement and
        the rule of International Visa Center.
      </li>
    </ol>
    <h3 style={{ margin: 0, padding: 0, marginTop: 30 }}>
      Article 4 Interest rate, Fees and Card Use
    </h3>
    <ol
      style={{
        width: "80%",
        margin: 0,
        padding: 0,
        fontSize: 20,
        marginLeft: 80
      }}
    >
      <li style={{ margin: 0, padding: 0 }}>
        Goods and services payment: at the due date, if the card owner pays all
        outstanding debts at the end of month the Bank will not calculate the
        interest occurred on transaction;
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        If the card owner has not been paid as described on the debt statement
        or settle only a part of debt balance at the end of month, the Bank will
        calculate all interests due and continue calculating such interest until
        the card owner has paid all outstanding debts; calculate the interest
        occurred on transaction;
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        Up on the card owner received debt statement notice for credit card,
        debit card shall come to get the debt statement with the Bank, the card
        owner shall take responsibility for all transactions;
      </li>
      <li style={{ margin: 0, padding: 0 }}>
        Cardholder agrees to pay the fee for delay of payment and other fees to
        the Bank according to the terms at each periods. If the cardholder is
        unable to pay at the due period as described in the debt statement, the
        cardholder agrees to pay fee to the Bank for cash withdrawn by card in
        accordance with the regulation of the Bank issuing from time to time.
      </li>
    </ol>
  </div>
</div>

        </div>

      </>
  )
}

export { Pdf3 };
