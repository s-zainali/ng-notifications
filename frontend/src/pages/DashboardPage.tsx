import { useNavigate } from "react-router-dom";
import NotificationCard from "../components/NotificationCard";
import { authService } from "../services/authService";


function DashboardPage() {
    const navigate = useNavigate(); 
    const user = JSON.parse(localStorage.getItem('user'));

    const fullName = user?.fullName
    
    function handleLogout() {
        authService.logout()
        navigate("/login")
    }

  return (
    <div className="h-[100dvh] w-[100dvw] bg-alabaster-grey-200 flex flex-col gap-6 p-6">
      <header className="grid grid-cols-3 bg-alabaster-grey-100 p-4 rounded-3xl border-1 border-ink-black-800">
        <div className="flex items-center justify-start ">
          <div className="flex gap-2 justify-start items-center rounded-xl border-1 border-ink-black-700 bg-ink-black-800 px-2 h-full">
            <img src="/userAvatar.png" className="h-5" alt="🧔️" />
            <span className="text-sm font-bold text-alabaster-grey-50">
              {fullName}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="w-xl h-[1px] bg-gradient-to-r from-transparent via-ink-black-800 to-transparent "></div>
          <h1 className="text-center text-2xl text-ink-black-800 font-bold tracking-widest">
            NG-Notifications
          </h1>
          <div className="w-xl h-[1px] bg-gradient-to-r from-transparent via-ink-black-800 to-transparent "></div>
        </div>
        <div className="flex justify-end items-center h-full ">
          <button onClick={handleLogout} className="border border-ink-black-700 bg-ink-black-800 hover:bg-ink-black-700 text-alabaster-grey-50 uppercase font-bold cursor-pointer rounded-xl h-full px-5 text-xs active:scale-95 transition duration-300 ease-in-out">
            Log Out
          </button>
        </div>
      </header>
      <main className="flex flex-col gap-6 h-full">
        <div className="bg-alabaster-grey-100 w-full h-50 rounded-3xl border-1 borer-ink-black-800 p-4"></div>
        <div className="bg-alabaster-grey-100 w-full h-full rounded-3xl border-1 borer-ink-black-800 p-4 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-ink-black-800">
              My Notifications
            </h2>
            <button className="cursor-pointer flex gap-1 items-center text-alabaster-grey-50 rounded-xl h-full px-3 hover:bg-ink-black-700 transition duration-300 ease-in-out bg-ink-black-800 border-1 border-ink-black-800">
                <span className="text-sm font-bold tracking-tight ">ADD</span>
                <span className="text-xl font-bold">+</span>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <NotificationCard
              category={"INFO"}
              header={"Sample Info Header"}
              body={"This is a sample body for info"}
              isLive={false}
            />
            <NotificationCard
              category={"WARNING"}
              header={"Sample Warning Header"}
              body={"This is a sample body for warning"}
              isLive={false}
            />
            <NotificationCard
              category={"ERROR"}
              header={"Sample Error Header"}
              body={"This is a sample body for error"}
              isLive={false}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
