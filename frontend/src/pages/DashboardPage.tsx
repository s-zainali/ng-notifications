function DashboardPage() {
  return (
    <div className="h-[100dvh] w-[100dvw] bg-alabaster-grey-200 flex flex-col gap-6 p-6">
      <header className="grid grid-cols-3 bg-alabaster-grey-100 p-4 rounded-3xl border-1 border-ink-black-800">
        <div className="flex items-center justify-start ">
          <div className="flex gap-4 justify-start items-center rounded-xl border-1 border-ink-black-700 bg-ink-black-800 py-1 px-2">
            <img src="/sdf" alt="🧔️" />
            <span className="text-sm font-bold text-alabaster-grey-50">Full Name </span> 
            <span className="text-xs text-alabaster-grey-50">@username</span>
          </div>
        </div>
        <h1 className="text-center text-2xl text-ink-black-800 font-bold tracking-widest">
          NG-Notifications
        </h1>
        <div className="flex justify-end items-center h-full ">
          <button className="border border-ink-black-700 bg-ink-black-800 text-alabaster-grey-50 uppercase font-bold cursor-pointer rounded-xl py-2 px-5 text-xs ">
            Log Out
          </button>
        </div>
      </header>
      <main className="flex flex-col gap-6 h-full">
        <div className="bg-alabaster-grey-100 w-full h-50 rounded-3xl border-1 borer-ink-black-800"></div>
        <div className="bg-alabaster-grey-100 w-full h-full rounded-3xl border-1 borer-ink-black-800"></div>
      </main>
    </div>
  );
}

export default DashboardPage;
