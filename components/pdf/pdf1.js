import React, { useRef } from 'react';

function Pdf1({ dynamicData , userdata}) {
  const pdfRef = useRef(null);

    return (
       
      <>
  <meta charSet="utf-8" />
  <title>pdf</title>
  <div style={{ width: "90%", margin: "auto" }} id="pdf1" className='pdfdata'>
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td>
            <div style={{ width: 200 }}>
              <img src="/pdf_logo.png" width="100px" />
            </div>
          </td>
          <td style={{ textAlign: "center" }}>
            <p style={{ fontSize: 20, marginBottom: 7 }}>
              <b>ຄາຮອງຂເປີດບັນຊີເງິນຝາກ</b>
            </p>
            <p style={{ fontSize: 10, marginTop: 0 }}>
              <b>APPLICATION FOR OPENNING ACCOUNT</b>
            </p>
          </td>
          <td style={{ textAlign: "right" }}>
            Branch:{" "}
            <input
              type="text"
              name=""
              style={{
                width: 150,
                border: "none",
                borderBottom: "1px dotted #000",
                outline: "none"
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
    <table
      style={{
        width: "100%",
        border: "2px solid #000",
        borderCollapse: "collapse"
      }}
    >
      <tbody>
        <tr>
          <td style={{ textAlign: "center", border: "2px solid #000" }}>
            <div style={{ height: 100,  padding: 10, fontSize: 10 }}>
              <b style={{ fontSize: 10 , display: "block"}}>ຕົວຢາງລາຍເຊັນ (Specimen signature)</b>
              {dynamicData ? (<img width={120} src={dynamicData.sign} />) : ''}
            </div>
            <div
              style={{ height: 30, borderTop: "2px solid #000", paddingTop: 2 }}
            >
              <b style={{ fontSize: 15 }}>ເງືອນໄຂໃນການເຄືອນໄຫວບັນຊີ</b>
            </div>
            <div
              style={{ height: 30, borderTop: "2px solid #000", paddingTop: 2 }}
            >
              <b style={{ fontSize: 14 }}>
                <input
                  type="text"
                  name=""
                  style={{
                    outline: "none",
                    width: 200,
                    border: "none",
                    borderBottom: "1px dotted #000"
                  }}
                />
              </b>
            </div>
            <div
              style={{ height: 30, borderTop: "2px solid #000", paddingTop: 2 }}
            >
              <b style={{ fontSize: 14 }}>
                ເລກບນັຊ/ີAccount No:
                <input
                  type="text"
                  name=""
                  style={{
                    outline: "none",
                    width: 200,
                    border: "none",
                    borderBottom: "1px dotted #000"
                  }}
                />
              </b>
            </div>
          </td>
          <td style={{ textAlign: "center", verticalAlign: "baseline" }}>
            <div style={{ height: 180, padding: 10, fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>ຕົວຢາງລາຍເຊັນ (Specimen signature)</b>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td>
            <p
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 0,
                marginBottom: 5
              }}
            >
              ຂາ້ພະເຈົ ້ າ/ພວກຂາ້ພະເຈົ ້ າ I/We
            </p>
          </td>
          <td style={{ textAlign: "right", fontSize: 19 }}>
            ເລກທລີູກຄາ້ Customer ID &nbsp;
            <input
              type="text"
              name=""
              style={{
                outline: "none",
                border: "2px solid #000",
                height: 20,
                width: 120
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td style={{ fontSize: 16 }}>
            ຊື ່/Name(1):{" "}
            <input
              type="text"
              value={(userdata) ? `${userdata.given_name} ${userdata.sur_name}` : ''}
              style={{
                outline: "none",
                width: "15%",
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />{" "}
            …ວນັ ເດອືນປີເກດີ/Date of birth:{" "}
            <input
              type="text"
              value={(userdata) ? userdata.date_of_birth.split("/")[0] : ''}
              style={{
                outline: "none",
                width: 50,
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />
            /{" "}
            <input
              type="text"
              value={(userdata) ? userdata.date_of_birth.split("/")[1] : ''}
              style={{
                outline: "none",
                width: 50,
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />{" "}
            /{" "}
            <input
              type="text"
              value={(userdata) ? userdata.date_of_birth.split("/")[2] : ''}
              style={{
                outline: "none",
                width: 50,
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />{" "}
            …ເລກບດັປະຈາໍຕວົ ID/ Passport No:{" "}
            <input
              type="text"
              value={(userdata) ? userdata.id_card_number: ''}
              style={{
                outline: "none",
                width: 100,
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ fontSize: 16 }}>
            ຊື ່/Name(2):{" "}
            <input
              type="text"
              name=""
              style={{
                outline: "none",
                width: "15%",
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />{" "}
            …ວນັ ເດອືນປີເກດີ/Date of birth:{" "}
            <input
              type="text"
              name=""
              style={{
                outline: "none",
                width: 50,
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />
            /{" "}
            <input
              type="text"
              name=""
              style={{
                outline: "none",
                width: 50,
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />{" "}
            /{" "}
            <input
              type="text"
              name=""
              style={{
                outline: "none",
                width: 50,
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />{" "}
            …ເລກບດັປະຈາໍຕວົ ID/ Passport No:{" "}
            <input
              type="text"
              name=""
              style={{
                outline: "none",
                width: 100,
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ fontSize: 16 }}>
            ທີ ່ ຢ່ ູປະຈບຸ ນັ /Present Address:{" "}
            <input
              type="text"
              value={(userdata) ? userdata.address : ''}
              style={{
                outline: "none",
                width: "15%",
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />
            ເມອືງ/City{" "}
            <input
              type="text"
              value={(userdata) ? userdata.district : ''}
              style={{
                outline: "none",
                width: 250,
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />{" "}
            ແຂວງ/Province{" "}
            <input
              type="text"
              value={(userdata) ? userdata.province : ''}
              style={{
                outline: "none",
                width: 180,
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ fontSize: 16 }}>
            ເວລາສຸກເສນີໃຫຕ້ດິຕໍ ່ ຊື{" "}
            <input
              type="text"
              name=""
              style={{
                outline: "none",
                width: "40%",
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />
            …ແຟັກ/Fax:{" "}
            <input
              type="text"
              name=""
              style={{
                outline: "none",
                width: "30%",
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ fontSize: 16 }}>
            ໂທ/Tel:{" "}
            <input
              type="text"
              value={(userdata) ? `${userdata.cellphone_country_code} ${userdata.cellphone_number}` : ''}
              style={{
                outline: "none",
                width: "50%",
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />
            ເບໂີທ{" "}
            <input
              type="text"
              name=""
              style={{
                outline: "none",
                width: 250,
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ fontSize: 16 }}>
            ທີ ່ ຢ່ ູອເີມວ/E-Mail:{" "}
            <input
              type="text"
              value={(userdata) ? userdata.email_address : ''}
              style={{
                outline: "none",
                width: "60%",
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            ມຈີດຸ ປະສງົຂໍເປີດບນັຊເີງນິຝາກຢ່ ູທະນາຄານ ຮ່ວມພດັທະນາ
            ຕາມລາຍລະອຽດແລະເອກະສານແນບຄດັ
            <br />
            <p style={{ margin: 0 }}>
              <b>
                Apply to open account with JDB and here are all my/our necessary
                details information (Attachment)
              </b>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      style={{
        width: "100%",
        border: "2px solid #000",
        borderCollapse: "collapse"
      }}
    >
      <tbody>
        <tr>
          <td
            style={{ textAlign: "center", border: "2px solid #000" }}
            rowSpan={2}
          >
            <div style={{}}>
              <b style={{ fontSize: 10 }}>
                ປະເພດບນັຊີ <br /> Account Type
              </b>
            </div>
          </td>
          <td style={{ textAlign: "right" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="checkbox"
                name=""
                style={{ width: 20, height: 20 }}
                checked={true}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>
                ບຸກຄນົ /ຮ່ວມກນ <br /> Personal/Joint
              </b>
            </div>
          </td>
          <td style={{ textAlign: "right" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="checkbox"
                name=""
                style={{ width: 20, height: 20 }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>
                ບໍລສິດັ <br /> Company
              </b>
            </div>
          </td>
          <td style={{ textAlign: "right" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="checkbox"
                name=""
                style={{ width: 20, height: 20 }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>
                ບໍລສິດັຫຸນ້ສ່ວນ <br /> Partnership/Sole Proprietor
              </b>
            </div>
          </td>
          <td style={{ textAlign: "right" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="checkbox"
                name=""
                style={{ width: 20, height: 20 }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>
                ສະຖານທດູ
                <br /> Embrassy
              </b>
            </div>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="checkbox"
                name=""
                style={{ width: 20, height: 20 }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>
                ລດັວສິ າຫະກດິ/ບໍລສິດັຮ່ວມທນ <br /> State Owned/Joint Venture Co;
              </b>
            </div>
          </td>
          <td style={{ textAlign: "right" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="checkbox"
                name=""
                style={{ width: 20, height: 20 }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>
                ສະມາຄມ <br /> Associates/NGO
              </b>
            </div>
          </td>
          <td style={{ textAlign: "right" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="checkbox"
                name=""
                style={{ width: 20, height: 20 }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>
                ອງົການຈດັຕັ ້ ງສາກນ <br /> International Organization
              </b>
            </div>
          </td>
          <td style={{ textAlign: "right" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="checkbox"
                name=""
                style={{ width: 20, height: 20 }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>
                ອື ່ ນໆ
                <br /> Other
              </b>
            </div>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "center", border: "2px solid #000" }}>
            <div style={{ padding: 10, fontSize: 10, paddingBottom: 20 }}>
              <b style={{ fontSize: 10 }}>
                ຮູບແບບການເຄື ່ ອນ <br /> ໄຫວທຸລະກດິ <br /> Type of Business
              </b>
            </div>
          </td>
          <td
            style={{ textAlign: "center", border: "2px solid #000" }}
            colSpan={4}
          >
            <div style={{ width: 200, margin: "auto" }}>
              <input
                type="text"
                name=""
                style={{
                  outline: "none",
                  width: "100%",
                  border: "none",
                  borderBottom: "1px dotted #000",
                  height: 30
                }}
              />
              <input
                type="text"
                name=""
                style={{
                  outline: "none",
                  width: "100%",
                  border: "none",
                  borderBottom: "1px dotted #000",
                  height: 30
                }}
              />
            </div>
          </td>
          <td style={{ border: "2px solid #000" }} colSpan={4}>
            <div
              style={{
                borderBottom: "2px solid #000",
                padding: "1px 10px",
                fontSize: 10
              }}
            >
              ທະບຽນວສິ າຫະກດິ/ໃບອະນຸຍາດລງົທນຶ ເລກທ:ີ
              <br />
              ERC/IL No:
            </div>
            <div
              style={{
                borderBottom: "2px solid #000",
                padding: "1px 10px",
                fontSize: 10
              }}
            >
              ລງົວນັທ
              <br />
              Date of Issue:
            </div>
            <div style={{ padding: "1px 10px" }}>
              ສະຖານທໄດີ ຮ້ ບອະນຸຍາດ ັ :
              <br />
              Place of Issue
            </div>
          </td>
        </tr>
        <tr>
          <td
            style={{ textAlign: "center", border: "2px solid #000" }}
            rowSpan={4}
          >
            <div style={{}}>
              <b style={{ fontSize: 10 }}>
                ປະເພດບນັຊີແລະ ຈາໍ ນວນເງນິຝາກເບື ້ ອງຕົນ <br /> Type of Account
                &amp; Initial Deposit(Amount){" "}
              </b>
            </div>
          </td>
          <td style={{ textAlign: "left" }} colSpan={2}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>
                ເງນິຝາກກະແສລາຍວນ <br /> Current Acct.
              </b>
            </div>
          </td>
          <td style={{ textAlign: "left" }} colSpan={2}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>
                ເງນິຝາກປະຢັດ <br /> Saving Acct.
              </b>
            </div>
          </td>
          <td style={{ textAlign: "left" }} colSpan={3}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>
                ເງນິຝາກປະຈາໍ :{" "}
                <input
                  type="text"
                  name=""
                  style={{
                    outline: "none",
                    width: 100,
                    border: "none",
                    borderBottom: "1px dotted #000"
                  }}
                />{" "}
                ເດອືນ/Month
              </b>
            </div>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "left" }}>
            <div
              style={{
                padding: 5,
                marginLeft: 14,
                textAlign: "center",
                width: 25,
                height: 20,
                border: "2px solid #000"
              }}
            >
              <b> ກີບ</b>
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="text"
                name=""
                style={{
                  outline: "none",
                  border: "none",
                  borderBottom: "1px dotted #000"
                }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div
              style={{
                padding: 5,
                marginLeft: 14,
                textAlign: "center",
                width: 25,
                height: 20,
                border: "2px solid #000"
              }}
            >
              <b> ກີບ</b>
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="text"
                name=""
                style={{
                  outline: "none",
                  border: "none",
                  borderBottom: "1px dotted #000"
                }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div
              style={{
                padding: 5,
                marginLeft: 14,
                textAlign: "center",
                width: 25,
                height: 20,
                border: "2px solid #000"
              }}
            >
              <b> ກີບ</b>
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="text"
                name=""
                style={{
                  outline: "none",
                  border: "none",
                  borderBottom: "1px dotted #000"
                }}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "left" }} >
            <div
              style={{
                padding: 5,
                marginLeft: 14,
                textAlign: "center",
                width: 25,
                height: 20,
                border: "2px solid #000",
                fontSize: 10
              }}
            >
              <b> ໂດລາ USD</b>
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="text"
                name=""
                style={{
                  outline: "none",
                  border: "none",
                  borderBottom: "1px dotted #000"
                }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }} className='checked'>
            <div
              style={{
                padding: 5,
                marginLeft: 14,
                textAlign: "center",
                width: 25,
                height: 20,
                border: "2px solid #000",
                fontSize: 10
              }}
            >
              <b> ໂດລາ USD</b>
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 16 }}>
              <input
                type="text"
                value={150}
                style={{
                  outline: "none",
                  border: "none",
                  borderBottom: "1px dotted #000"
                }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div
              style={{
                padding: 5,
                marginLeft: 14,
                textAlign: "center",
                width: 25,
                height: 20,
                border: "2px solid #000",
                fontSize: 10
              }}
            >
              <b> ໂດລາ USD</b>
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="text"
                name=""
                style={{
                  outline: "none",
                  border: "none",
                  borderBottom: "1px dotted #000"
                }}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "left" }}>
            <div
              style={{
                padding: 5,
                marginLeft: 14,
                textAlign: "center",
                width: 25,
                height: 20,
                border: "2px solid #000",
                fontSize: 10
              }}
            >
              <b> ບາດ THB</b>
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="text"
                name=""
                style={{
                  outline: "none",
                  border: "none",
                  borderBottom: "1px dotted #000"
                }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div
              style={{
                padding: 5,
                marginLeft: 14,
                textAlign: "center",
                width: 25,
                height: 20,
                border: "2px solid #000",
                fontSize: 10
              }}
            >
              <b> ບາດ THB</b>
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="text"
                name=""
                style={{
                  outline: "none",
                  border: "none",
                  borderBottom: "1px dotted #000"
                }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div
              style={{
                padding: 5,
                marginLeft: 14,
                textAlign: "center",
                width: 25,
                height: 20,
                border: "2px solid #000",
                fontSize: 9
              }}
            >
              <b> ກບາດ THB</b>
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="text"
                name=""
                style={{
                  outline: "none",
                  border: "none",
                  borderBottom: "1px dotted #000"
                }}
              />
            </div>
          </td>
        </tr>
        <tr style={{ borderTop: "2px solid #000" }}>
          <td
            style={{ textAlign: "center", border: "2px solid #000" }}
            rowSpan={6}
          >
            <div style={{}}>
              <b style={{ fontSize: 10 }}>
                ເອກະສານອາ້ງອງີ <br /> Reference Document(s){" "}
              </b>
            </div>
          </td>
        </tr>
        <tr style={{ borderBottom: "2px solid #000" }}>
          <td style={{ textAlign: "left" }}>
            <input
              type="checkbox"
              style={{ width: 20, height: 20, marginLeft: 20 }}
            />
          </td>
          <td style={{ textAlign: "left" }} colSpan={3}>
            <div
              style={{
                padding: "1px 10px",
                borderRight: "2px solid #000",
                fontSize: 10
              }}
            >
              <b>
                ຜູອ້າໃສຢ່ ູສປປ ລາວ /Resident
                <br />
                ບດັປະຈາໍ ຕວົ / ໜງັສເືດນີທາງ / ປືມ້ ສໍາມະໂນ
                <input
                  type="text"
                  name=""
                  style={{
                    outline: "none",
                    width: 60,
                    border: "none",
                    borderBottom: "1px dotted #000"
                  }}
                />
                <br />
                Identify Card / Passport / Family Book
                <input
                  type="text"
                  name=""
                  style={{
                    outline: "none",
                    width: 60,
                    border: "none",
                    borderBottom: "1px dotted #000"
                  }}
                />
              </b>
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <input
              type="checkbox"
              style={{ width: 20, height: 20, marginLeft: 20 }}
            />
          </td>
          <td style={{ textAlign: "left" }} colSpan={2}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              ໃບອະນຸຍາດລງົທນຶ /Invesment License
            </div>
          </td>
        </tr>
        <tr style={{ borderBottom: "2px solid #000" }}>
          <td style={{ textAlign: "left" }}>
            <input
              type="checkbox"
              style={{ width: 20, height: 20, marginLeft: 20 }}
            />
          </td>
          <td style={{ textAlign: "left" }} colSpan={3}>
            <div
              style={{
                padding: "1px 10px",
                borderRight: "2px solid #000",
                fontSize: 10
              }}
            >
              <b>
                ຜູບ້ໍ ່ ໄດອ້າໃສຢ່ ູສປປ ລາວ /Non Resident
                <br />
                ໜງັສເືດນີທາງ/ໃບອະນຸຍາດເຮດັວຽກ/ບດັປະຈາໍ ຕວົ ຕ/ທ
                <br />
                Passport/Working permit and Foreign ID
              </b>
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <input
              type="checkbox"
              style={{ width: 20, height: 20, marginLeft: 20 }}
            />
          </td>
          <td style={{ textAlign: "left" }} colSpan={2}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              ໃບທະບຽນວສິາຫະກດິ/Enterprise Registration License
            </div>
          </td>
        </tr>
        <tr style={{ borderBottom: "2px solid #000" }}>
          <td style={{ textAlign: "left" }}>
            <input
              type="checkbox"
              style={{ width: 20, height: 20, marginLeft: 20 }}
            />
          </td>
          <td style={{ textAlign: "left" }} colSpan={3}>
            <div style={{ padding: 10, fontSize: 10 }}>
              <b>ກດົລະບຽບຂອງບໍລສິດັ /Article of Association</b>
            </div>
          </td>
          <td style={{ textAlign: "left", borderLeft: "2px solid #000" }}>
            <input
              type="checkbox"
              style={{ width: 20, height: 20, marginLeft: 20 }}
            />
          </td>
          <td style={{ textAlign: "left" }} colSpan={2}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              ໃບທະບຽນອາກອນ/Tax License
            </div>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "left" }}></td>
          <td style={{ textAlign: "left" }} colSpan={3}></td>
          <td
            style={{
              textAlign: "left",
              borderLeft: "2px solid #000",
              borderBottom: "2px solid #000"
            }}
          >
            <input
              type="checkbox"
              style={{ width: 20, height: 20, marginLeft: 20 }}
            />
          </td>
          <td
            style={{ textAlign: "left", borderBottom: "2px solid #000" }}
            colSpan={3}
          >
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              ມະຕຕິກົ ລງົແຕ່ງຕັ ້ ງ/ບດົບນັທກຶຂອງບໍລສິດັກ່ຽວກບັການເປີດບນັຊີ
              Resolution/Memorandum for Openning Acct.
            </div>
          </td>
        </tr>
        <tr style={{ borderBottom: "2px solid #000" }}>
          <td style={{ textAlign: "left" }}></td>
          <td style={{ textAlign: "left" }} colSpan={3}></td>
          <td
            style={{
              textAlign: "left",
              borderLeft: "2px solid #000",
              borderBottom: "2px solid #000"
            }}
          >
            <input
              type="checkbox"
              style={{ width: 20, height: 20, marginLeft: 20 }}
            />
          </td>
          <td style={{ textAlign: "left" }} colSpan={2}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              ອື ່ ນໆ/othe{" "}
              <input
                type="text"
                name=""
                style={{
                  outline: "none",
                  width: 60,
                  border: "none",
                  borderBottom: "1px dotted #000"
                }}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td
            style={{ textAlign: "center", border: "2px solid #000" }}
            rowSpan={2}
          >
            <div style={{}}>
              <b style={{ fontSize: 10 }}>
                ສະໝກັ ສະມາຊກິ :
                <br /> Submission For
              </b>
            </div>
          </td>
          <td style={{ textAlign: "right" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="checkbox"
                name=""
                style={{ width: 20, height: 20 }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>
                ບດັ ເອທເີອມ
                <br /> ATM CARD
              </b>
            </div>
          </td>
          <td style={{ textAlign: "right" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="checkbox"
                name=""
                style={{ width: 20, height: 20 }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>
                ບດັວຊີ່າ ເດບດ <br /> VISA DEBIT CARD
              </b>
            </div>
          </td>
          <td style={{ textAlign: "right" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="checkbox"
                name=""
                style={{ width: 20, height: 20 }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>
                ບດັວຊີ່າ ເຄຼດດ <br /> VISA CREDIT CARD
              </b>
            </div>
          </td>
          <td style={{ textAlign: "right" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="checkbox"
                name=""
                style={{ width: 20, height: 20 }}
              />
            </div>
          </td>
          <td style={{ textAlign: "left" }}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <b style={{ fontSize: 10 }}>
                ເຄື ່ ອງຮູດບດ
                <br /> EDC
              </b>
            </div>
          </td>
        </tr>
        <tr>
          <td style={{}} colSpan={2}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              <input
                type="checkbox"
                name=""
                style={{ height: 20, width: 20 }}
              />
              Premium
              <input
                type="checkbox"
                name=""
                style={{ height: 20, width: 20 }}
              />
              General <br /> ເລກບດັ{" "}
              <input
                type="text"
                name=""
                style={{
                  outline: "none",
                  width: 150,
                  border: "none",
                  borderBottom: "1px dotted #000"
                }}
              />
            </div>
          </td>
          <td colSpan={2}>
            <div>
              ເລກບດັ
              <input
                type="text"
                name=""
                style={{
                  outline: "none",
                  width: 150,
                  border: "none",
                  borderBottom: "1px dotted #000"
                }}
              />
            </div>
          </td>
          <td colSpan={2}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              ເລກບດັ
              <input
                type="text"
                name=""
                style={{
                  outline: "none",
                  width: 150,
                  border: "none",
                  borderBottom: "1px dotted #000"
                }}
              />
            </div>
          </td>
          <td colSpan={2}>
            <div style={{ padding: "0px 10px", fontSize: 10 }}>
              ເລກເຄື ່ ອງ
              <input
                type="text"
                name=""
                style={{
                  outline: "none",
                  width: 150,
                  border: "none",
                  borderBottom: "1px dotted #000"
                }}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td style={{ fontSize: 10 }} colSpan={3}>
            <b>
              ຂາພະເຈົ້າ, ຂຢັ້ງຢືນວາ ຂ້ມູນທີ່ໃຫມາຂາງເທິງນັ້ນ
              ແມນຖືກຕອງຕາມຄວາມເປັນຈິງ ແລະ ຂຽນດວຍຄວາມເຂົ້າໃຈຢາງຄົບຖວນ. ຂາພະເຈົ້າ,
              ຂຢັ້ງຢືນວາ ໄດອານ, ໄດເຂົ້າໃຈ ແລະ ເຫັນດີກັບ
            </b>
            <p style={{ margin: 0 }}>
              ຂ້ຕົກລົງ ແລະ ເງື່ອນໄຂຂອງບັນຊີເງິນຝາກ
              ທີ່ຂາພະເຈົ້າໄດເລືອກທີ່ສາງຂື້ນໂດຍ ທະນາຄານຮວມພັດທະນາ. ຂາພະເຈົ້າ,
              ຈະຍອມຮັບເອົາທຸກນະໂຍບາຍ ທີ່ອາດມີການປຽນແປງໃນແຕລະໄລຍະ
            </p>
            <p style={{ margin: 0 }}>ໂດຍບ່ມີການແຈງລວງໜາຈາກທະນາຄານ.</p>
            <p style={{ margin: 0 }}>
              I/We hereby certify that the above information given is true and
              complete to the best of my/our knowledge. I/We confirm that I/We
              have read, understood and
            </p>
            <p style={{ margin: 0 }}>
              agree with the terms and conditions made available to me/us by
              Joint Development Bank for the account chosen by me/us. I/We
              am/are also bound to accept any
            </p>
            <p style={{ margin: 0 }}>
              changes made by the bank's policies without any further notice
              whatsover.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td style={{ fontSize: 12, position: "relative" , textAlign: "center" }}>
          {dynamicData ? (<img style={{ position: "absolute", top: "-10%", left: "30%" }} width={120} src={dynamicData.sign} />) : ''}
            <input
              type="text"
              name=""
              style={{
                outline: "none",
                width: 300,
                border: "none",
                borderBottom: "1px dotted #000",
                height: 28
              }}
            />
            <br />
            <b>ລາຍເຊັນເຈົ້າຂອງບັນຊ/ີກາປະທັບ</b>
            <br />
            Account Holder's Signature(s)/Seal
          </td>
          <td style={{ fontSize: 12, textAlign: "center" }}>
            <input
              type="text"
              name=""
              style={{
                outline: "none",
                width: 300,
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />
            <br />
            <b>ລາຍເຊັນຜູເປີດບັນຊ/ີ Staff</b>
          </td>
          <td style={{ fontSize: 12, textAlign: "center" }}>
            <input
              type="text"
              name=""
              style={{
                outline: "none",
                width: 300,
                border: "none",
                borderBottom: "1px dotted #000"
              }}
            />
            <br />
            <b>ລາຍເຊັນຜູອະນູມັດ/Authorized Person</b>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</>


    
    )
}

export { Pdf1 };
