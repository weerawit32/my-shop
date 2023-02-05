import Link from "next/link";
import HouseIcon from "../Icons/HouseIcon";
import CartIcon from "../Icons/CartIcon";
import useAuthenService from "@/service/authenService";
import { useContext } from "react";
import { authContext } from "@/context/authContext";
import MiniCart from "../MiniCart";

const Header = () => {
  const { logout } = useAuthenService();
  const { uid } = useContext(authContext);
  const isLogedin = uid;
  return (
    <div className="pb-0 bg-black mb-4 text-white ">
      <div className="px-[15px]">
        <div className="flex justify-between items-center mx-3 h-16 ">
          <Link href={"/"}>
            <HouseIcon />
          </Link>
          <div className="flex items-center space-x-3">
            {isLogedin ? (
              <button onClick={() => logout()}>Logout</button>
            ) : (
              <Link href={"/login"}>
                <button>Login</button>
              </Link>
            )}
            <MiniCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
