import { mockPerks, mockTasks } from "~~/app/data/mockData";

export const ChildDashboard = () => {
  const points = 120;

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, Sofia!</h1>
        <p className="">
          You have <span className="text-secondary font-semibold text-2xl">{points} tokens</span> to spend!
        </p>
      </header>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Section */}
        <section className="bg-primary shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm ">Tasks Completed</p>
              <p className="text-xl font-bold text-success">5</p>
            </div>
            <div>
              <p className="text-sm ">Tasks Pending</p>
              <p className="text-xl font-bold text-warning">3</p>
            </div>
          </div>
          <div className="mt-4 bg-gray-100 rounded-full h-4">
            <div className="bg-green-500 h-4 rounded-full" style={{ width: "60%" }}></div>
          </div>
        </section>

        {/* Points Section */}
        <section className="bg-secondary shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Your Tokens</h2>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{points}</p>
            <p className="text-sm ">Current Tokens</p>
          </div>
        </section>
      </div>

      {/* Tasks Section */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
        <div className="bg-primary shadow-md rounded-lg divide-y divide-base">
          {mockTasks.map(task => (
            <div key={task.id} className="p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">{task.description}</h3>
                <p className={`text-sm font-semibold ${task.status === "Pending" ? "text-warning" : "text-success"}`}>
                  {task.status}
                </p>
              </div>
              {task.status === "Pending" && (
                <button className="btn btn-success text-sm text-success-content hover:underline">Mark as Done</button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Perks Section */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Available Perks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockPerks.map(perk => (
            <div key={perk.id} className="bg-secondary shadow-md rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-800">{perk.name}</h3>
                <p className="text-xs text-gray-600">Cost: {perk.cost} points</p>
              </div>
              {perk.redeemedBy ? (
                <span className="text-xs bg-base text-gray-800 px-2 py-1 rounded-full">Redeemed</span>
              ) : points >= perk.cost ? (
                <button className="btn btn-primary">Redeem</button>
              ) : (
                <span className="text-xs bg-accent text-accent-content px-2 py-1 rounded-full">Not Enough Points</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
