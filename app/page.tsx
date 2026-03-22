import Image from "next/image";
import Register from "./ui/register";



export default function Home() {
  let regCount = 12;
  const Registers = [];

  for(let i=1;i<13;i++){
    Registers.push(<Register regNum={i} key={i}> </Register>);
  }


  return (
    <div className="">
      {Registers}
      <Register regNum="4"></Register>
      {/* <h1 className="text-5xl">Hello World</h1> */}
    </div>
  );
}
