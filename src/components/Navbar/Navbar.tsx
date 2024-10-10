import raqeebLogoBlack from "../../assets/images/svgs/raqeeb-logo-black.svg";
import raqeebLogoWhite from "../../assets/images/svgs/raqeeb-logo-white.svg";
import profilePhoto from "../../assets/images/svgs/profile-Kittl.svg";
import { FaFilter } from "react-icons/fa6";
import useRecords from "../../hooks/use-records";
import React, { useEffect, useState } from "react";
import { LuCalendarSearch } from "react-icons/lu";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
// type ValuePiece = Date | string;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

const Navbar = () => {
  const {
    setTheme,
    theme,
    search,
    setSearch,
    setStatus,
    status,
    searchRecords,
    searchWithDate,
    setUsername,
    // leakedSources,
    username,
    setLeakedSources,
    startDate,
    setStartDate,
    setEndDate,
  } = useRecords();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  const [statusDropDonw, setStatusDropDonw] = useState<boolean>(false);
  const [dateIsShown, setDateIsShown] = useState<boolean>(false);
  const [searchIsShown, setSearchIsShown] = useState<boolean>(false);

  const [filterName, setFilterName] = useState<boolean>(false); //
  const [filterLeaked, setFilterLeaked] = useState<boolean>(false); //);
  const [filterStatus, setFilterStatus] = useState<boolean>(false); //);

  const handleFilterSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(e.currentTarget.checked);
    if (e.currentTarget.checked == false) {
      setUsername("");
    }
  };

  const handleFilterSearchLeaked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterLeaked(e.currentTarget.checked);
    if (e.currentTarget.checked == false) {
      setLeakedSources(0);
    }
  };
  
  const handleStatusFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterStatus(e.currentTarget.checked);
    if (e.currentTarget.checked == false) {
      setStatus("");
    }
  };
  
  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dim" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save to localStorage
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleDateSearch = () => {
    if (startDate) {
      console.log(startDate);

      searchWithDate();
    }
  };
  useEffect(() => {
    if (search) {
      searchRecords(); // Call your search function whenever `search` state changes
    }
  }, [search]); // Dependencies, so it runs on search or page change

  return (
    <nav className="navbar justify-between bg-base-100 mb-10">
      <div className="gap-8">
        <div className="">
          <a className="btn btn-ghost text-xl w-28">
            <img
              src={theme === "light" ? raqeebLogoBlack : raqeebLogoWhite}
              alt="raqeeb logo"
            />
          </a>
        </div>
        <div className="form-control flex flex-row gap-2">
          <div className=" md:border  border-gray-500  rounded-md flex  relative">
            <div
              className={`${
                searchIsShown
                  ? "flex  absolute w-[300px] top-12 shadow-md py-1 border border-gray-400 rounded-md"
                  : "md:flex hidden justify-between  w-[360px] "
              } `}
            >
              <input
                type="text"
                placeholder="Search"
                className="border-none h-full w-full rounded-md bg-transparent"
                value={search}
                onChange={handleSearchChange}
              />
              <div
                className={`${
                  dateIsShown ? "block" : "hidden"
                } absolute shadow-2xl  p-0 top-14 w-full z-30 border border-gray-200 rounded-md `}
              >
                <div className="bg-white dark:bg-black text-black    p-5  pl-5">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col ">
                      <span className="text-[11px]  ">Start Date</span>
                      <input
                        type="date"
                        className="h-7 rounded-md text-[13px] border-none pl-0 bg-transparent "
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px]">
                        End Date{" "}
                        <span className="text-[8px] mb-6 "> (optional)</span>
                      </span>
                      <input
                        type="date"
                        className="bg-transparent  h-7 rounded-md text-[13px] border-none pl-0"
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className=" dark:bg-gray-800 justify-evenly flex gap-2 max-h-full ">
                    <button
                      className=" text-white  border-none bg-black dark:bg-dimSecondary px-4 py-2 rounded-md mt-6 max-h-[90%] "
                      onClick={handleDateSearch}
                    >
                      search
                    </button>
                  </div>
                </div>
              </div>
              {/* ////// */}
              <div className=" flex gap-2 max-h-full ">
                <button
                  className=" px-3 text-black  max-h-[90%] bg-transparent"
                  onClick={() => setDateIsShown(!dateIsShown)}
                >
                  <LuCalendarSearch className="text-xl" />
                </button>
              </div>
            </div>
            <button
              className="md:hidden block btn text-[18px] "
              onClick={() => setSearchIsShown(!searchIsShown)}
            >
              <BsSearch />
            </button>
          </div>
          <button
            className="btn ml-4 "
            onClick={() => setIsFilterModalOpen(true)}
          >
            <FaFilter />
          </button>
          <dialog
            id="my_modal_1 "
            className={`modal ${isFilterModalOpen && "modal-open"} `}
          >
            <div className="modal-box ">
              <div className="">
                <div className="mb-4 flex gap-2">
                  <div className=" flex justify-start items-center">
                    <input type="checkbox" className=" mr-5 rounded-[.20rem] scale-125 " onChange={handleFilterSearchName} />
                  </div>
                  <div className="w-full input input-bordered flex items-center px-0">
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Username"
                      value={username}
                      disabled={!filterName}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="">
                  <div className="mb-4 flex gap-2">
                    <div className=" flex justify-start items-center">
                      <input type="checkbox" className="mr-[10px] rounded-[.20rem] scale-125 "  onChange={handleFilterSearchLeaked}  />
                    </div>
                    <div className="label p-[1px]"></div>
                    <input
                      type="number"
                      placeholder="Leaked Sources Count"
                      className="input input-bordered w-full"
                      disabled={!filterLeaked}
                      // value={leakedSources}
                      onChange={(e) =>
                        setLeakedSources(parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>
                <div className="mb-4 flex gap-2 ">
                  <div className=" flex mt-4 ">
                  
                  <div className=" ">
                    <input type="checkbox" className="mr-[10px] rounded-[.20rem] scale-125 "  onChange={handleStatusFilter} />
                  </div></div>
                  <div className="ml-3 dropdown mt-2 w-full ">
                    <button
                      disabled={!filterStatus}
                      onClick={() => setStatusDropDonw(!statusDropDonw)}
                      className="h-[48px] w-full  items-center justify-start px-4 py-2 border border-gray-400 dark:border-gray-800 rounded-md  text-nowrap flex gap-3"
                    >
                      <span > {status != "" ? status : "Status"} </span>
                      <span className="">
                        <FaChevronUp
                          className={`${statusDropDonw ? "block" : "hidden"}`}
                        />{" "}
                        <FaChevronDown
                          className={`${statusDropDonw ? "hidden" : "block"}`}
                        />
                      </span>
                    </button>
                    <div className="min-h-28  ">
                      <ul
                        className={`${
                          statusDropDonw ? "block" : "hidden"
                        } bg-base-100 rounded-box z-[1]  p-2 shadow-md`}
                      >
                        <li
                          onClick={() => {
                            setStatus("");
                            setStatusDropDonw(!statusDropDonw);
                          }}
                        >
                          <button>all</button>
                        </li>
                        <li
                          onClick={() => {
                            setStatus("done");
                            setStatusDropDonw(!statusDropDonw);
                          }}
                        >
                          <button>done</button>
                        </li>
                        <li
                          onClick={() => {
                            setStatus("pending");
                            setStatusDropDonw(!statusDropDonw);
                          }}
                        >
                          <button>pending</button>
                        </li>
                        <li
                          onClick={() => {
                            setStatus("in progress");
                            setStatusDropDonw(!statusDropDonw);
                          }}
                        >
                          <button>in progress</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    className="btn"
                    onClick={() => setIsFilterModalOpen(false)}
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <div className="flex-none gap-2">
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            className="theme-controller hidden"
            value={theme}
            onChange={handleThemeChange}
          />

          {/* sun icon */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={profilePhoto} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
