import NotificationCard from "../components/NotificationCard";

function DashboardPage() {
  return (
    <div className="h-[100dvh] w-[100dvw] bg-alabaster-grey-200 flex flex-col gap-6 p-6">
      <header className="grid grid-cols-3 bg-alabaster-grey-100 p-4 rounded-3xl border-1 border-ink-black-800">
        <div className="flex items-center justify-start ">
          <div className="flex gap-4 justify-start items-center rounded-xl border-1 border-ink-black-700 bg-ink-black-800 px-2 h-full">
            <img src="/sdf" alt="🧔️" />
            <span className="text-sm font-bold text-alabaster-grey-50">
              Full Name{" "}
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
          <button className="border border-ink-black-700 bg-ink-black-800 text-alabaster-grey-50 uppercase font-bold cursor-pointer rounded-xl h-full px-5 text-xs ">
            Log Out
          </button>
        </div>
      </header>
      <main className="flex flex-col gap-6 h-full">
        <div className="bg-alabaster-grey-100 w-full h-50 rounded-3xl border-1 borer-ink-black-800 p-4"></div>
        <div className="bg-alabaster-grey-100 w-full h-full rounded-3xl border-1 borer-ink-black-800 p-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-ink-black-800">My Notifications</h2>
            <div className="flex flex-col gap-4">
                <NotificationCard 
                    category={'INFO'}
                    header={'Sample Info Header'}
                    body={'This is a sample body for info'}
                    />
                <NotificationCard 
                    category={'WARNING'}
                    header={'Sample Warning Header'}
                    body={'This is a sample body for warning'}
                    />
                <NotificationCard 
                    category={'ERROR'}
                    header={'Sample Error Header'}
                    body={'This is a sample body for error'}
                    />
            </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
