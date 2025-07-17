import Image from "next/image"
import newImg from "../../assets/logo.jpg"

export function Header() {
  return (
    <div className="flex justify-center items-center pl-16 ">  
    <Image alt=""  className="  w-[400px] h-[200px]" src={newImg}></Image>
    </div>
  )
}



