import Link from "next/link";

const Header = () => {
  const isLogedin = false;
  return (
    <div className="pb-0 bg-gray-200">
      <div className="px-[15px]">
        <div className="flex justify-between mx-3">
          <Link href={"/"}>
            <img src="" />
          </Link>
          {isLogedin ? (
            <button>Logout</button>
          ) : (
            <Link href={"/login"}>
              <button>Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
