import { useNavigate } from "react-router-dom";
import NotificationCard from "../components/NotificationCard";
import { authService } from "../services/authService";
import { useNotifications } from "../context/NotificationContext";

function DashboardPage() {
  const navigate = useNavigate();
  const { notifications, dismissNotification, deleteNotification } =
    useNotifications();
  const user = JSON.parse(localStorage.getItem("user"));

  const fullName = user?.fullName;

  function handleLogout() {
    authService.logout();
    navigate("/login");
  }

  const unclosedNotifications = notifications.filter((n) => !n.isClosed);
  const visibleBanners = unclosedNotifications.slice(0, 5);
  const hasMoreBanners = unclosedNotifications.length > 5;

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
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from transparent via-alabaster-grey-200 to-transparent">
          <div className="w-full lg:w-lg xl:w-xl h-[1px] bg-gradient-to-r from-transparent via-ink-black-800 to-transparent "></div>
          <h1 className="text-center text-2xl text-ink-black-800 font-bold tracking-widest">
            NG-Notifications
          </h1>
          <div className="w-full lg:w-lg xl:w-xl h-[1px] bg-gradient-to-r from-transparent via-ink-black-800 to-transparent "></div>
        </div>
        <div className="flex justify-end items-center h-full ">
          <button
            onClick={handleLogout}
            className="border border-ink-black-700 bg-ink-black-800 hover:bg-ink-black-700 text-alabaster-grey-50 uppercase font-bold cursor-pointer rounded-xl h-full px-5 text-xs active:scale-95 transition duration-300 ease-in-out"
          >
            Log Out
          </button>
        </div>
      </header>
      <main className="flex flex-col gap-6 h-full">
        <div className="bg-alabaster-grey-100 w-full  rounded-3xl border-1 flex flex-col gap-4 borer-ink-black-800 p-4">
          <h2 className="text-xl font-bold text-ink-black-800">
            Live Notifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {visibleBanners.map((item) => (
              <NotificationCard
                key={item._id}
                category={item.category}
                header={item.header}
                body={item.body}
                isLive={true}
                onClose={() => dismissNotification(item._id)}
              />
            ))}

            {hasMoreBanners && (
              <div className="bg-ink-black-800 border border-ink-black-700 text-alabaster-grey-50 rounded-2xl p-4 flex items-center justify-center text-center font-bold text-xs uppercase tracking-wider">
                You have more notifications
              </div>
            )}
          </div>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notifications.map((item) => (
              <NotificationCard
                key={item._id}
                category={item.category}
                header={item.header}
                body={item.body}
                isLive={false}
                onDelete={() => deleteNotification(item._id)}
                onEdit={() => navigate(`/notifications/edit/${item._id}`)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
