import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ handleSubmit }) => {
  return (
    <div className="hidden flex-1 md:block mr-3">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-1">
          <input
            type="text "
            className="border-2  focus:outline-none px-3 py-1 focus:border-purple-500 border-slate-400 rounded-md "
          />
          <div className="px-3 py-[5.5px] bg-purple-500 rounded-md text-white">
            <AiOutlineSearch className="text-xl md:text-2xl" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
