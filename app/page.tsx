import RegisterData from "../public/data/RegisterData.json"
import Image from "next/image";
import Register from "./ui/register";


export default function Home() {
  let regCount = 12;

  // console.log(RegisterData);


  return (
    <div className="">
      {Object.keys(RegisterData).map((reg)=>(
        <Register regNum={reg}  key={reg} regNumber={reg}></Register>
      )
      )}
      {/* <h1 className="text-5xl">Hello World</h1> */}
    </div>
  );
}
