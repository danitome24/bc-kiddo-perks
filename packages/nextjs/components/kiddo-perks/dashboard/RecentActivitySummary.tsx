import Image from "next/image";
import { Activity } from "~~/types/kiddoPerks";

type RecentActivitySummaryProps = {
  activities: Activity[];
};

export const RecentActivitySummary = ({ activities }: RecentActivitySummaryProps) => {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity Summary</h2>
      <ul className="bg-secondary shadow-md rounded-lg divide-y divide-gray-200">
        {activities.map(activity => (
          <li key={activity.id} className="flex items-start p-4">
            <Image
              className="w-16 h-16 rounded-full"
              width={90}
              height={90}
              src={"/childAvatar.png"}
              alt="Child image"
            />

            <div className="ml-4">
              <p className="text-sm ">{activity.title}</p>
              <p className="text-xs mt-1">2 hours ago</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
