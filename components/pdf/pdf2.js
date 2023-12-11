
function Pdf2({ dynamicData , userdata }) {
  const nameChars = userdata.name.replace(/\s+/g, ' ').split('');
  const remainingCharsCount = 23 - nameChars.length;
  const emptyChars = Array.from({ length: remainingCharsCount }, () => "");

  return (
     
      <>
       <meta charSet="utf-8" />
  <title>pdf</title>
      <div id="pdf2" className="pdfdata">
      <div style={{ display: "inline-block" }}>
  <div style={{ width: "50%", float: "left" }}>
    <table style={{ margin: "auto", width: "95%" }}>
      <tbody>
        <tr>
          <td>
            <img src="/pdf_logo.png" width="200px" />
          </td>
          <td >
            <div style={{ width: 400 }}>
              <h3
                style={{
                  textAlign: "center",
                  margin: 0,
                  padding: 0,
                  fontWeight: "bold",
                }}
              >
                Application of
              </h3>
              <h3
                style={{
                  textAlign: "center",
                  margin: 0,
                  padding: 0,
                  fontWeight: "bold",
                }}
              >
                International Card Member
              </h3>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <table style={{ margin: "auto", width: "95%" }}>
      <tbody>
        <tr style={{ fontSize: 18 }}>
          <td style={{margin: "3px 0"}}>
            {" "}
            <input type="checkbox" name="" id="" />{" "}
            <label htmlFor="">Head Office; </label>
            <input type="checkbox" name="" id="" />{" "}
            <label htmlFor=""> Service Unit </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 100
              }}
            />
            <input type="checkbox" name="" id="" />{" "}
            <label htmlFor="">Code</label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 100
              }}
            />
          </td>
        </tr>
        <tr style={{ backgroundColor: "#eeece1" }}>
          <td
            style={{
              border: "1px solid black",
              padding: "5px 0",
              paddingLeft: 10,
              fontWeight: "bold",
            }}
          >
            1. Type of cards:
          </td>
        </tr>
      </tbody>
    </table>
    <table style={{ margin: "5px auto", width: "95%" }}>
      <tbody>
        <tr>
          <th style={{ textAlign: "left" }}>VISA: </th>
          <th style={{ textAlign: "left" }}>UPI:</th>
        </tr>
        <tr>
          <td>
            <input type="checkbox" checked={ (userdata.card_provider == "VISA") ? true :false }/>
            <label htmlFor="">VISA DEDIT</label>
          </td>
          <td>
            <input type="checkbox" checked={ (userdata.card_provider == "UNIONPAY") ? true :false }/>
            <label htmlFor="">UPI DEBIT</label>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" />
            <label htmlFor=""> VISA CREDIT CLASSIC </label>
          </td>
          <td>
            <input type="checkbox" />
            <label htmlFor="">UPI CREDIT GOLD </label>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" />
            <label htmlFor=""> VISA CREDIT GOLD </label>
          </td>
          <td>
            <input type="checkbox" />
            <label htmlFor="">UPI CREDIT PLATINUM </label>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" />
            <label htmlFor="">JDB CHAMPA SUPER GOLD </label>
          </td>
        </tr>
      </tbody>
    </table>

    <table style={{ margin: "auto", width: "95%" }}>
      <tbody>
        <tr style={{ backgroundColor: "#eeece1" }}>
          <td
            style={{
              border: "1px solid black",
              padding: "5px 0",
              paddingLeft: 10,
              fontWeight: "bold",
            }}
          >
            2. Information of card user (applicant must be reach of 18 years
            old)
          </td>
        </tr>
        <tr style={{  }}>
          <td style={{padding: 0}}>
            <label htmlFor="">Name and surname</label>
            <input
              type="text"
              value={(userdata) ? `${userdata.given_name} ${userdata.sur_name}` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 350
              }}
            />
          </td>
        </tr>
        <tr style={{  }}>
          <td style={{padding: 0}}>
            <label htmlFor="">Occupation </label>
            <input
              type="text"
              value={(userdata) ? `${userdata.occupation} ` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 150
              }}
            />
            ,<label htmlFor="">Nationality </label>
            <input
              type="text"
              value={(userdata) ? `${userdata.nationality} ` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 150
              }}
            />
          </td>
        </tr>
        <tr style={{  }}>
          <td style={{  }}>
            {" "}
            <input
              type="checkbox"
              name=""
              id=""
              style={{ width: 20, height: 20 }}
            />{" "}
            <label htmlFor="" style={{  }}>
              {" "}
              Employee{" "}
            </label>
            <input
              type="checkbox"
              name=""
              id=""
              style={{ width: 20, height: 20 }}
            />{" "}
            <label htmlFor="" style={{  }}>
              {" "}
              Public staff{" "}
            </label>
            <input
              type="checkbox"
              name=""
              id=""
              style={{ width: 20, height: 20 }}
            />{" "}
            <label htmlFor="" style={{  }}>
              {" "}
              Student
            </label>
            <input
              type="checkbox"
              name=""
              id=""
              style={{ width: 20, height: 20 }}
            />{" "}
            <label htmlFor="" style={{  }}>
              General Customer
            </label>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "left",  }}>
            Name and surname in capital letter (maximum 22 scripts)
          </td>
        </tr>
        <tr>
          <td>
          {[...nameChars, ...emptyChars].map((char, index) => (

            <input
            key={index}
            type="text"
            maxLength="1"
            value={char.toUpperCase()}
              style={{
                width: 17,
                height: 17,
                margin: "0px 2px",
                padding: 0,
                outline: "none"
              }}
            />
            ))}
            
          </td>
        </tr>
        <tr>
          <td style={{ padding: 0 }}>
            <label htmlFor="">Date of birth</label>
            <input
              type="text"
              value={(userdata) ? `${userdata.date_of_birth} ` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 150
              }}
            />
            ,<label htmlFor="">ID card/Passport/Family registration</label><br/>
            <label htmlFor="">book </label>
            <input
              type="text"
              value={(userdata) ? `${userdata.id_card_number} ` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 80
              }}
            />
            ,<label htmlFor=""> date </label>{" "}
            <input
              type="text"
              value={(userdata) ? `${userdata.id_card_issued_date} ` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 80
              }}
            />
            ,<label htmlFor="">issued by</label>
            <input
              type="text"
              value={(userdata) ? `${userdata.id_card_issuer} ` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 150
              }}
            />
            ,
          </td>
        </tr>
        <tr>
          <td style={{ padding: 0 }}>
            <label htmlFor="">expiration date</label>
            <input
              type="text"
              value={(userdata) ? `${userdata.id_card_expired_date} ` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 200
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ padding: 0 }}>
            <label htmlFor="">place of birth</label>{" "}
            <input
              type="text"
              value={(userdata) ? `${userdata.nationality} ` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 80
              }}
            />
            ,<label htmlFor=""> district</label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 50
              }}
            />
            ,<label htmlFor="">province</label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 90
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ padding: 0, marginBottom: 5, display:"block" }}>
            <label htmlFor=""> residing village</label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 70
              }}
            />
            ,<label htmlFor=""> district</label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 50
              }}
            />
            ,<label htmlFor="">province</label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 80
              }}
            />
          </td>
        </tr>
        <tr style={{ backgroundColor: "#eeece1" }}>
          <td
            style={{
              border: "2px solid grey",
              padding: "5px 0",
              fontWeight: "bold",
              margin: "5px 0",
              paddingLeft: 10,
              
            }}
          >
            3. Information of work place
          </td>
        </tr>
        <tr>
          <td style={{ padding: 0 }}>
            <label htmlFor="">Work place </label>{" "}
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
            />
            <label htmlFor="">position</label>{" "}
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
            />
          </td>
        </tr>
        <tr>
          <td style={{ padding: 0 }}>
            <label htmlFor="">Year of services</label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 50
              }}
            />
            <label htmlFor="">
              years,
              <label htmlFor="" /> from:
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 50
                }}
              />
              <label htmlFor="" />
              to:
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 50
                }}
              />
            </label>
          </td>
        </tr>
        <tr>
          <td style={{ padding: 0 }}>
            <label htmlFor="">Total income per month </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 30
              }}
            />
            ,<label htmlFor="">total expenditure per month</label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 30
              }}
            />
            ,
          </td>
        </tr>
        <tr>
          <td style={{ padding: 0 }}>
            <label htmlFor="">Home telephone </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 80
              }}
            />{" "}
            ,<label htmlFor=""> office telephone</label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 80
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ padding: 0 }}>
            <label htmlFor="">mobile </label>{" "}
            <input
              type="text"
              value={(userdata) ? `${userdata.cellphone_country_code} ${userdata.cellphone_number}` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom"
              }}
            />
            ,<label htmlFor="">E-mail address</label>
            <input
              type="text"
              value={(userdata) ? `${userdata.email_address} ` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom"
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ padding: 0 }}>
            <label htmlFor="">Education level </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 300
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
    <table style={{ width: "95%", margin: "auto" }}>
      <tbody>
        
        <tr style={{  }}>
          <td style={{ padding: 0, width:50 }}>
            <label htmlFor="">Family status:</label>
          </td>
          <td style={{ padding: 0, width:40 }}>
            <input
              type="checkbox"
              name=""
              checked={ (userdata.marriage_status == "Single") ? true :false }
              id=""
              style={{  }}
            />{" "}
            <label htmlFor="">single </label>
          </td>
          <td style={{ padding: 0, width:110 }}>
            <input
              type="checkbox"
              checked={ (userdata.marriage_status != "Single") ? true :false }
              id=""
              style={{  }}
            />{" "}
            <label htmlFor="">married </label>
          </td>
        </tr>
      </tbody>
    </table>
    <table style={{ width: "95%", margin: "auto" }}>
      <tbody>
        <tr>
          <td style={{ padding: 0 }}>
            <label htmlFor="" style={{  fontWeight: "bold", fontSize: 19 }}>
              • Ownership form:
            </label>
            <input
              type="checkbox"
              name=""
              id=""
              style={{ padding: 0 }}
            />
            <label htmlFor="" style={{ }}>
              {" "}
              private owned house
            </label>
            <input
              type="checkbox"
              name=""
              id=""
              style={{ padding: 0 }}
            />
            <label htmlFor="" style={{ }}>
              parent’s house{" "}
            </label>
            <input
              type="checkbox"
              name=""
              id=""
              style={{ padding: 0 }}
            />
            <label htmlFor="" style={{ }}>
              {" "}
              lease
            </label>
            </td>
        </tr>
        <tr>
           <td style={{ padding:0}}>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <input
              type="checkbox"
              name=""
              id=""
              style={{ padding: 0 }}
            />
            <label htmlFor="" style={{ }}>
              {" "}
              relative’s house
            </label>
            <input
              type="checkbox"
              name=""
              id=""
              style={{ padding: 0 }}
            />
            <label htmlFor="" style={{  }}>
              {" "}
              officer’s house
            </label>
            <input
              type="checkbox"
              name=""
              id=""
              style={{ padding: 0 }}
            />
            <label htmlFor="" style={{  }}>
              down payment house
            </label>
          </td>
        </tr>
        <tr>
          <td style={{ padding: 0 }}>
            <label htmlFor="" style={{  fontWeight: "bold", fontSize: 19 }}>
              • Owned assets:
            </label>
            <input
              type="checkbox"
              name=""
              id=""
              style={{  }}
            />
            <label htmlFor="" style={{  }}>
              {" "}
              Land{" "}
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 50
              }}
            />{" "}
            <label htmlFor="" style={{  }}>
              {" "}
              plot(s),
            </label>
            <input
              type="checkbox"
              name=""
              id=""
              style={{  }}
            />
            <label htmlFor="" style={{  }}>
              car
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom"
              }}
            />
            </td>
             </tr>
             <tr>
             <td style={{ padding:0}}>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <label htmlFor="" style={{  }}>
              {" "}
              Total of value
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 300
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ padding: 0 }}>
            <label htmlFor="" style={{  fontWeight: "bold", fontSize: 19 }}>
              • Instalment payment per month:
            </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 80
              }}
            />
            <label htmlFor="" style={{  }}>
              debt balance
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 70
              }}
            />
            </td>
             </tr>
             <tr>
             <td style={{ padding:0}}>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <label htmlFor="" style={{  }}>
              Installment period
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom"
              }}
            />{" "}
            <label htmlFor="" style={{  }}>
              {" "}
              month(s)
            </label>
          </td>
        </tr>
        <tr>
          <td style={{ padding: 0 }}>
            <label htmlFor="" style={{  fontWeight: "bold" }}>
              • Amount of money requested:
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 250
              }}
            />{" "}
            <label htmlFor="" style={{  }}>
              US$
            </label>

            </td>
            </tr>
            <tr>
            <td style={{padding: "0px 60px", marginBottom: 5, display: "black"}}>
            &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="">(</label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: "80%",
                margin: "5px 0"
              }}
            />
            <label htmlFor="">)</label>
          </td>
        </tr>
        <tr style={{ backgroundColor: "#eeece1", marginTop: 10, display: "black" }}>
          <td
            style={{
              border: "2px solid grey",
              padding: "5px 0",
              fontWeight: "bold",
              margin: "5px 0",
              paddingLeft: 10,
              
            }}
          >
            4. Reference
          </td>
        </tr>
        <tr style={{  }}>
          <td style={{ padding:0, marginBottom: 5, display: "block" }}>
            <label htmlFor="">Name and surname</label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom"
              }}
            />
            <label htmlFor="">age</label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 210
              }}
            />{" "}
            <label htmlFor=""> year</label>
            <label htmlFor="">Occupation</label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom"
              }}
            />
            <label htmlFor="">Work place</label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 220
              }}
            />
            <label htmlFor="">Residing address</label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 80
              }}
            />
            <label htmlFor="">district </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 100
              }}
            />{" "}
            <label htmlFor="" /> province{" "}
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
            />
            <label htmlFor="">Total income/ month</label>{" "}
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
            />
            <label htmlFor="">total expenditure/ month</label>
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
            />
            <label htmlFor="">Related to </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 140
              }}
            />
            <label htmlFor="">telephone number </label>
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
            />
          </td>
        </tr>
      </tbody>
    </table>
    <table
      border="1px solid black"
      style={{
        width: "95%",
        margin: "auto",
        borderCollapse: "collapse",
        border: "1px solid black",
        fontSize: 18
      }}
    >
      <tbody>
        <tr>
          <th
            style={{
              border: "2px solid grey",
              padding: "5px 0",
              fontWeight: "bold",
              margin: "5px 0",
              background: "#eeece1",
              textAlign: "left",
              paddingLeft: 10,
              
            }}
            colSpan={4}
          >
            5. Selection of Information for using card
          </th>
        </tr>
        <tr>
          <td style={{ border: "1px solid #000", verticalAlign: "top", padding: "2px 5px",textAlign:"right" }}>1</td>
          <td style={{ border: "1px solid #000", verticalAlign: "top", padding: "2px 5px" }}>
            Maximum per <br />
            transaction
          </td>
          <td style={{ border: "1px solid #000", verticalAlign: "top", padding: "2px 5px" }}>
            {" "}
            <input
              type="checkbox"
              name=""
              id=""
              style={{  }}
            />{" "}
            <label htmlFor="">Less than $5,000 </label>
          </td>
          <td style={{ border: "1px solid #000", verticalAlign: "top", padding: "2px 5px" }}>
            <input
              type="checkbox"
              name=""
              id=""
              checked={true}
              style={{  }}
            />{" "}
            <label htmlFor="">More than $5,000 </label>
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #000", verticalAlign: "top", padding: "2px 5px",textAlign:"right" }}> 2</td>
          <td style={{ border: "1px solid #000", verticalAlign: "top", padding: "2px 5px" }}>
            Number of <br />
            transaction per day
          </td>
          <td style={{ border: "1px solid #000", verticalAlign: "top", padding: "2px 5px" }}>
            <input
              type="checkbox"
              name=""
              id=""
              style={{  }}
            />
            <label htmlFor="">
              Not more than <br />
              10 times per day
            </label>
          </td>
          <td style={{ border: "1px solid #000", verticalAlign: "top", padding: "2px 5px" }}>
            <input
              type="checkbox"
              name=""
              id=""
              checked={true}
              style={{  }}
            />
            <label htmlFor="">
              More than 10 <br /> times per day
            </label>
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #000", verticalAlign: "top", padding: "2px 5px",textAlign:"right" }}>3</td>
          <td style={{ border: "1px solid #000", verticalAlign: "top", padding: "2px 5px" }}>
            Transaction via <br /> internet
          </td>
          <td style={{ border: "1px solid #000", verticalAlign: "top", padding: "2px 5px" }}>
            {" "}
            <input
              type="checkbox"
              name=""
              id=""
              checked={true}
              style={{  }}
            />{" "}
            <label htmlFor="">
              Use via internet <br /> required{" "}
            </label>
          </td>
          <td style={{ border: "1px solid #000", verticalAlign: "top", padding: "2px 5px" }}>
            {" "}
            <input
              type="checkbox"
              name=""
              id=""
              style={{  }}
            />{" "}
            <label htmlFor="">
              Use via internet <br /> not required{" "}
            </label>
          </td>
        </tr>
      </tbody>
    </table>
    <table style={{ width: "95%", margin: "auto", marginTop: 10 }}>
      <tbody>
        <tr style={{ backgroundColor: "#eeece1" }}>
          <td
            style={{
              border: "1px solid black",
              padding: "5px 0",
              paddingLeft: 10,
              fontWeight: "bold",
              
            }}
          >
            6. Security Form
          </td>
        </tr>
        <tr>
          <td style={{padding: 0}}>
            <label htmlFor="" style={{  }}>
              Name and surname
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 180
              }}
            />
            ,
            <label htmlFor="" style={{  }}>
              {" "}
              age
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 100
              }}
            />
            ,
            <label htmlFor="" style={{  }}>
              year
            </label>
          </td>
        </tr>
        <tr>
          <td style={{padding: 0}}>
            <label htmlFor="" style={{  }}>
              Occupation
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 180
              }}
            />
            ,
            <label htmlFor="" style={{  }}>
              Work place
            </label>
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
            />
          </td>
        </tr>
        <tr>
          <td style={{padding: 0}}>
            <label htmlFor="" style={{  }}>
              Residing address
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 100
              }}
            />
            <label htmlFor="" style={{  }}>
              district
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 100
              }}
            />
            <label htmlFor="" style={{  }}>
              province
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 50
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{padding: 0}}>
            <label htmlFor="">Total income per month </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 40
              }}
            />
            <label htmlFor="" style={{  }}>
              total expenditure per month
            </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 40
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{padding: 0}}>
            <label htmlFor="" style={{  }}>
              Related to{" "}
            </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom"
              }}
            />
            <label htmlFor="" style={{  }}>
              {" "}
              telephone number
            </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom"
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{padding: 0}}>
            <input
              type="checkbox"
              name=""
              id=""
              style={{  }}
            />{" "}
            <label htmlFor="" style={{  }}>
              Security saving account:{" "}
            </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 80
              }}
            />
            <label htmlFor="" style={{  }}>
              type of account
            </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 80
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{padding: 0}}>
            <label htmlFor="">
              Loan security account (must get prior authorized loan document)
            </label>
          </td>
        </tr>
        <tr>
          <td style={{padding: 0}}>
            <label htmlFor="" style={{  }}>
              Account number{" "}
            </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 120
              }}
            />
            <label htmlFor="" style={{  }}>
              name of account
            </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 120
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{padding: 0}}>
            <label htmlFor="" style={{  }}>
              Block amount:
            </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 100
              }}
            />
            <label htmlFor="" style={{  }}>
              US$
            </label>{" "}
            <label htmlFor="" style={{ fontSize: 18 }}>
              (
            </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 250
              }}
            />{" "}
            <label htmlFor="" style={{  }}>
              )
            </label>
          </td>
        </tr>
        <tr>
          <td style={{padding: 0}}>
            <input
              type="checkbox"
              name=""
              id=""
              style={{ padding: 0 }}
            />{" "}
            <label htmlFor="">
              Value of security asset (must be 120% of proposed credit line)
            </label>
          </td>
        </tr>
        <tr>
          <td style={{padding: 0}}>
            <label htmlFor="" style={{  }}>
              Land title number
            </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 80
              }}
            />
            <label htmlFor="" style={{  }}>
              date
            </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 80
              }}
            />
            <label htmlFor="" style={{  }}>
              area
            </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 90
              }}
            />
            <label htmlFor="">
              m <sup>2</sup>{" "}
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  {/* --------------------------right side page---------------------------- */}
  <div style={{ width: "50%", float: "right" }}>
    <table style={{ width: "95%", margin: "auto", marginTop: 10 }}>
      <tbody>
        <tr>
          <td style={{padding: 0}}>
            <label htmlFor="" style={{  }}>
              Located at village
            </label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 60
              }}
            />{" "}
            ,
            <label htmlFor="" style={{  }}>
              district
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 60
              }}
            />
            <label htmlFor="" style={{  }}>
              province
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 90
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{padding: 0, marginBottom: 5, display: "block"}}>
            <label htmlFor="" style={{  }}>
              Issued under the name of
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
            ,
            <label htmlFor="" style={{  }}>
              value
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 120
              }}
            />
            <label htmlFor="" style={{  }}>
              Total (LVR)
            </label>
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 120
              }}
            />{" "}
            <label htmlFor="" style={{  }}>
              <sub> % </sub>
            </label>
          </td>
        </tr>
        <tr style={{ backgroundColor: "#eeece1" }}>
          <td
            style={{
              border: "2px solid grey",
              padding: "5px 0",
              fontWeight: "bold",
              margin: "5px 0",
              paddingLeft: 10,              
            }}
          >
            7. Form of payment for credit card transaction
          </td>
        </tr>
        <tr>
          <td>
            {" "}
            <input
              type="checkbox"
              name=""
              id=""
              style={{  }}
            />{" "}
            <label htmlFor="" style={{  }}>
              Cash;{" "}
            </label>{" "}
            &nbsp;
            <input
              type="checkbox"
              name=""
              id=""
              style={{  }}
            />{" "}
            <label htmlFor="" style={{  }}>
              {" "}
              Check;{" "}
            </label>{" "}
            &nbsp;
            <input
              type="checkbox"
              name=""
              id=""
              style={{  }}
            />{" "}
            <label htmlFor="" style={{  }}>
              Transfer;{" "}
            </label>{" "}
            &nbsp;
            <input
              type="checkbox"
              name=""
              id=""
              style={{  }}
            />{" "}
            <label htmlFor="" style={{  }}>
              Automatically debt deducted from saving account{" "}
            </label>
          </td>
        </tr>
        <tr>
          <td style={{  }}>
            <label htmlFor="">Account number</label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 100
              }}
            />
            <label htmlFor="">name of account</label>{" "}
            <input
              type="TEXT"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 120
              }}
            />
          </td>
        </tr>
        <tr style={{ backgroundColor: "#eeece1" }}>
          <td
            style={{
              border: "1px solid black",
              padding: "5px 0",
              paddingLeft: 10,
              fontWeight: "bold",
              
            }}
          >
            8. Information of OTP thru online payment (3D Secure)
          </td>
        </tr>
        <tr>
          <td
            style={{
              margin: "10px 0",
              display: "inline-block"
            }}
          >
            <label htmlFor="">Mobile</label>{" "}
            <input
              type="text"
              value={(userdata) ? `${userdata.cellphone_country_code} ${userdata.cellphone_number}` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 160
              }}
            />
            <label htmlFor=""> E-mail address</label>{" "}
            <input
              type="TEXT"
              value={(userdata) ? `${userdata.email_address}` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 160
              }}
            />
          </td>
        </tr>
        <tr style={{ backgroundColor: "#eeece1" }}>
          <td
            style={{
             border: "1px solid black",
              padding: "5px 0",
              paddingLeft: 10,
              fontWeight: "bold",
              
            }}
          >
            9. Condition of deduction for payment by international credit card
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="checkbox"
              name=""
              id=""
              style={{  }}
            />{" "}
            <label htmlFor="" style={{  width: '96%' , float:'right' }}>
              Minimum amount 10% of balance according to the credit statement
              must not less than US$100 per month.
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="checkbox"
              name=""
              id=""
              style={{  }}
            />{" "}
            <label htmlFor="" style={{  }}>
              {" "}
              Deduct of full amount according to the credit statement
            </label>
          </td>
        </tr>
        <tr style={{ backgroundColor: "#eeece1" }}>
          <td
            style={{
              border: "1px solid black",
              padding: "5px 0",
              paddingLeft: 10,
              fontWeight: "bold",
              
            }}
          >
            10. Consent of international cardholder
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td>
            <ol style={{  }}>
              <li>
                I agree and consent to the Bank to block saving account in order
                to ensure of debt payment for the use of my visa credit card.
              </li>
              <li>
                I consent to the Bank to deduct from security saving account in
                case there is any debt occurred from using my credit card
                including interest rate and fees determined by the Bank and will
                not oppose, resist or claim any right to the Bank.
              </li>
              <p style={{ margin: 0, padding: 0 }}>
                I, as an applicant for visa credit certify that, all statements
                contained in this application is true. If there is any damages
                occurred form using of card to the Bank, I agree to take
                responsibilities to compensate all damages and agree to
                accomplish according to the rule of Visa Control Center and the
                law of Lao PDR
              </p>
            </ol>
          </td>
        </tr>
        <tr>
          <td style={{  fontWeight: "bold", textAlign: "right" }}>
            
            <label htmlFor="" style={{fontSize: 18, fontWeight:"bold"}}>Joint Development Bank Limited, date</label>{" "}
            <input
              type="text"
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 100
              }}
            />
            <div style={{ textAlign: "right", margin: "0 100px 0 0" }}>
              {" "}
              <label htmlFor="" style={{fontSize: 18, fontWeight:"bold"}}>Applicant</label>
            </div>
          </td>
        </tr>
        <tr>
          <td
            style={{  display: "inline-block", marginBottom: 10, textAlign: "right", width:"100%" }}
          >
            <label htmlFor="">Signature:</label>{" "}
            {dynamicData ? (<img width={120} src={dynamicData.sign} />) : ''}
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
            ,<label htmlFor="">Name</label>
            <input
              type="text"
              value={(userdata) ? `${userdata.given_name} ${userdata.sur_name}` : ''}
              style={{
                outline: "none",
                background: "none",
                border: "none",
                borderBottom: "2px dotted black",
                verticalAlign: "text-bottom",
                width: 150
              }}
            />
          </td>
        </tr>
        <tr style={{ backgroundColor: "#eeece1" }}>
          <td
            style={{
              border: "1px solid black",
              padding: "5px 0",
              textAlign: "center",
              fontWeight: "bold",
              
            }}
          >
            For Bank Use
          </td>
        </tr>
      </tbody>
    </table>
    <table
      style={{
        width: "95%",
        margin: "auto",
        fontSize: 18,
        border: "1px solid black",
        borderCollapse: "collapse",
        marginTop: 20
      }}
    >
      <tbody>
        <tr style={{ borderBottom: "1px solid black" }}>
          
          <td style={{ borderRight: "1px solid black", width:"50%"}}>
            <div style={{ textAlign: "left", marginBottom: 10 }}>
              <label htmlFor="" style={{ fontWeight: "bold", width: "100%", textAlign: "center", fontSize:18}}>
                officer
              </label>{" "}
              <br />
              <label htmlFor="" style={{  }}>
                Comment:
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 170
                }}
              />{" "}
              </div>

              <div style={{ textAlign: "right",}}>
              <label htmlFor="" style={{  }}>
                date:
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 100
                }}
              />
            </div>{" "}
            <br /> <br /> <br />
            <div style={{ textAlign: "left", marginBottom: 10 }}>
              <label htmlFor="" style={{  }}>
                Signature
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 50
                }}
              />
              ,
              <label htmlFor="" style={{  }}>
                Name
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 50
                }}
              />
            </div>
          </td>
          <td>
            <div style={{ textAlign: "left", marginBottom: 10 }}>
              <label htmlFor="" style={{ fontWeight: "bold", width: "100%", textAlign: "center", fontSize:18}}>
                Receive-check officer
              </label>{" "}
              <br />
              <label htmlFor="" style={{  }}>
                Comment:
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 170
                }}
              />{" "}
               </div>

              <div style={{ textAlign: "right",}}>
              <label htmlFor="" style={{  }}>
                date:
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 100
                }}
              />
            </div>{" "}
            <br /> <br /> <br />
            <div style={{ textAlign: "left", marginBottom: 10 }}>
              <label htmlFor="" style={{  }}>
                Signature
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 50
                }}
              />
              ,
              <label htmlFor="" style={{  }}>
                Name
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 50
                }}
              />
            </div>
          </td>
        </tr>
        <tr style={{ borderBottom: "1px solid black" }}>
        
          <td style={{ borderRight: "1px solid black", width:"50%" }}>
            <div style={{ textAlign: "left" }}>
              <label htmlFor="" style={{ fontWeight: "bold", width: "100%", textAlign: "center", fontSize:18}}>
                Credit Department
              </label>{" "}
              <br />
              <label htmlFor="" style={{  }}>
                Comment:
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 170
                }}
              />{" "}
               </div>

              <div style={{ textAlign: "right",}}>
              <label htmlFor="" style={{  }}>
                date:
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 100
                }}
              />
            </div>{" "}
            <br /> <br /> <br />
            <div style={{ textAlign: "left", marginBottom: 10 }}>
              <label htmlFor="" style={{  }}>
                Signature
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 50
                }}
              />
              ,
              <label htmlFor="" style={{  }}>
                Name
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 50
                }}
              />
            </div>
          </td>
          <td>
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <label htmlFor="" style={{ fontWeight: "bold", width: "100%", textAlign: "center", fontSize:18}}>Risk Management Department</label>
              <label htmlFor="" style={{  }}>
                Comment:
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 170
                }}
              />{" "}
               </div>

              <div style={{ textAlign: "right",}}>
              <label htmlFor="" style={{  }}>
                date:
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 100
                }}
              />
            </div>{" "}
            <br /> <br /> <br />
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <label htmlFor="" style={{  }}>
                Signature
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 50
                }}
              />
              ,
              <label htmlFor="" style={{  }}>
                Name
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 50
                }}
              />
            </div>
          </td>
        </tr>
        <tr style={{ borderBottom: "1px solid black" }}>
        
          <td style={{ borderRight: "1px solid black", width:"50%"}}>
            <div style={{ textAlign: "center" }}>
              <label htmlFor="" style={{ fontWeight: "bold", width: "100%", textAlign: "center", fontSize:18}}>
                Card Center Department
              </label>{" "}
              <br />
              <label htmlFor="" style={{  }}>
                Comment:
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 170
                }}
              />{" "}
               </div>

              <div style={{ textAlign: "right",}}>
              <label htmlFor="" style={{  }}>
                date:
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 100
                }}
              />
            </div>{" "}
            <br /> <br /> <br />
            <div style={{ textAlign: "left", marginBottom: 10 }}>
              <label htmlFor="" style={{  }}>
                Signature
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 50
                }}
              />
              ,
              <label htmlFor="" style={{  }}>
                Name
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 50
                }}
              />
            </div>
          </td>
          <td>
            <div style={{ textAlign: "left", marginBottom: 10 }}>
              <label htmlFor="" style={{ fontWeight: "bold", width: "100%", textAlign: "center", fontSize:18}}>
                Managing Director of JDB
              </label>{" "}
              <br />
              <label htmlFor="" style={{ fontSize: 18 }}>
                Comment:
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 170
                }}
              />{" "}
               </div>

              <div style={{ textAlign: "right",}}>
              <label htmlFor="" style={{  }}>
                date:
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 100
                }}
              />
            </div>{" "}
            <br /> <br /> <br />
            <div style={{ textAlign: "left", marginBottom: 10 }}>
              <label htmlFor="" style={{ fontSize: 18 }}>
                Signature
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 50
                }}
              />
              ,
              <label htmlFor="" style={{ fontSize: 18 }}>
                Name
              </label>{" "}
              <input
                type="text"
                style={{
                  outline: "none",
                  background: "none",
                  border: "none",
                  borderBottom: "2px dotted black",
                  verticalAlign: "text-bottom",
                  width: 50
                }}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div style={{ margin:"40px 20px 0" }}>
      <h4
        style={{
          borderBottom: "1px solid black",
          margin: 0,
          padding: 0,
          display: "inline-block",
          fontSize: 17,
          fontWeight: "bold"
        }}
      >
        {" "}
        Documents required
      </h4>
    </div>
    <table style={{ width: "95%", margin: "auto", padding: 0 }}>
      <tbody>
        <tr>
          <td style={{}}>
            <input type="checkbox" name="" id="" checked={ (userdata.id_card_type == "ID card") ? true :false } />{" "}
            <label htmlFor="">ID card</label>
            <input type="checkbox" name="" id="" />{" "}
            <label htmlFor=""> Passport</label>
            <input type="checkbox" name="" id="" checked={ (userdata.id_card_type == "Passport") ? true :false } />{" "}
            <label htmlFor="">2 photos of size 3x4 </label>
            <input type="checkbox" name="" id="" />{" "}
            <label htmlFor="">guaranty deed (if foreigner)</label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

      </div>

      </>
  )
}

export { Pdf2 };
