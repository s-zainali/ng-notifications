import { Link } from "react-router-dom";

function AuthTypeSwitch({currentPage}) {
  return (
    <div className="flex gap-4 items-center justify-center">
      <div className="flex overflow-hidden rounded-xl border-1 border-ink-black-800">
        <Link
          to="/login"
          className={`cursor-pointer text-sm font-bold uppercase text-center w-25 p-2 hover:bg-ink-black-700 hover:text-alabaster-grey-50 transition duration-300 ease-in-out ${currentPage === 'login'? 'text-alabaster-grey-100 bg-ink-black-800 ' : ''}`}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={`cursor-pointer text-sm font-bold uppercase text-center w-25 p-2 hover:bg-ink-black-700 hover:text-alabaster-grey-50 transition duration-300 ease-in-out ${currentPage === 'register'? 'text-alabaster-grey-100 bg-ink-black-800 ' : ''}`}
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default AuthTypeSwitch;
