import { ChildTasksSummary } from "./ChildTasksSummary";

export const ParentDashboard = () => {
  return (
    <div className="flex-grow w-full px-8 py-16">
      <div className="flex flex-row justify-center items-center mb-5">
        <h4 className="text-2xl">Child resume</h4>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-12 flex-col sm:flex-row">
        <ChildTasksSummary />
        <ChildTasksSummary />
        <ChildTasksSummary />
        <ChildTasksSummary />
        <ChildTasksSummary />
        <ChildTasksSummary />
      </div>
    </div>
  );
};
