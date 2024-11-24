type DashboardBannerProps = {
  childrenLength: number;
  tasksLength: number;
};

export const DashboardBanner = ({ childrenLength, tasksLength }: DashboardBannerProps) => {
  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <h1 className="text-2xl font-bold text-primary-content">Welcome, Mommy/Daddy! 👋</h1>
      <p className="text-primary-content">
        Overview: <strong>{childrenLength} children registered</strong>,{" "}
        <strong>{tasksLength} tasks completed today</strong>
      </p>
    </div>
  );
};
