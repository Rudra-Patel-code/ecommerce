import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { AiFillHome, AiFillStar } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";
import SearchBar from "./Components/SearchBar";
import Account from "./Components/Account";
import { useSelector } from "react-redux";

const linkStyles =
  "flex py-1 px-2 my-2 rounded-md hover:bg-slate-300 justify-start text-base md:text-lg items-center gap-2 ";

const Header = () => {
  const { isAuth } = useSelector((state) => state.auth);

  const [isSideBar, setIsSideBar] = useState(false);

  const closeSidebar = () => setIsSideBar(false);
  const openSidebar = () => setIsSideBar(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="fixed ml-[50%]  translate-x-[-50%] top-0 left-0 text-black  w-[100%] h-[100%] ">
        <div className="flex p-3 items-center ">
          <div className="flex items-center p-2 gap-2 flex-1 ">
            <GiHamburgerMenu
              className={`text-xl hover:cursor-pointer md:text-2xl ${
                isSideBar ? "hidden" : "block"
              } `}
              onClick={openSidebar}
            />
            <ImCross
              className={`text-xl hover:cursor-pointer md:text-2xl ${
                isSideBar ? "block" : "hidden"
              }`}
              onClick={closeSidebar}
            />
            <h1 className="text-xl md:text-2xl hover:cursor-pointer hover:text-purple-500 hover:underline font-bold text-purple-700">
              iCart
            </h1>
          </div>

          {!isSideBar && (
            <>
              <SearchBar handleSubmit={handleSubmit} />
              <Account isAuth={isAuth} />
            </>
          )}
        </div>

        <div className={`mt-5  ${isSideBar ? "visible" : "hidden"} `}>
          <div className=" w-fit m-auto">
            <Link to={"/"} className={linkStyles}>
              <AiFillHome />
              Home
            </Link>

            <Link to={"/cart"} className={linkStyles}>
              <BsFillCartFill />
              Cart
            </Link>

            <Link to={"/recommended"} className={linkStyles}>
              <TbSquareRoundedCheckFilled />
              Recommended
            </Link>

            <Link to={"/favourites"} className={linkStyles}>
              <AiFillStar />
              Favourites
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
