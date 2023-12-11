
function Pdf6({ dynamicData , userdata }) {
   
  return (
     
      <>
        <div id="pdf6" className=" pdfdata">
        <div style={{ width: "100%", marginTop: 100, textAlign: "center" }}>
  <div style={{ width: "90%", margin: "auto" }}>
    {userdata.imageData ? (<img width={`100%`} src={userdata.imageData[0]} />) : ''}
    {dynamicData ? (<img width={300} src={dynamicData.sign} />) : ''}
  </div>
</div>



        </div>

      </>
  )
}

export { Pdf6 };
