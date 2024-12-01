import { Activity } from "~~/types/kiddoPerks";

// const mockChildrenData: Child[] = [
//   {
//     id: 1,
//     name: "Joe",
//     avatar: "/childAvatar.png",
//     address: "0x0",
//     tokens: 320,
//     progress: { completed: 5, total: 7 },
//   },
//   {
//     id: 2,
//     name: "Sofía",
//     avatar: "/childAvatar.png",
//     address: "0x0",
//     tokens: 220,
//     progress: { completed: 3, total: 6 },
//   },
//   {
//     id: 3,
//     name: "Laura",
//     avatar: "/childAvatar.png",
//     address: "0x0",
//     tokens: 5,
//     progress: { completed: 3, total: 6 },
//   },
//   {
//     id: 4,
//     name: "Edwin",
//     avatar: "/childAvatar.png",
//     address: "0x0",
//     tokens: 10,
//     progress: { completed: 3, total: 6 },
//   },
// ];

// const mockPerks: Perk[] = [
//   { id: 1, name: "1 extra hour of TV time", cost: 50, redeemedBy: ["Edwin", "Laura"] },
//   { id: 2, name: "Choose the family movie", cost: 80 },
//   { id: 3, name: "Stay up 30 minutes past bedtime", cost: 80, redeemedBy: ["Sofía"] },
//   { id: 4, name: "Get a new toy", cost: 200 },
// ];

// const mockTasks: Task[] = [
//   { id: 1, description: "Make your bed", status: "Pending" },
//   { id: 2, description: "Do your homework", status: "Pending" },
//   { id: 3, description: "Feed the pets", status: "Pending" },
//   { id: 4, description: "Help with dinner", status: "Pending" },
// ];

const mockTasksHistory: Activity[] = [
  { id: 1, title: "Make your bed: Completed by Sofia." },
  { id: 2, title: "Edwin redeemed:1 extra hour of TV time." },
  { id: 3, title: "New Task created: Help with dinner" },
];

export { mockTasksHistory };
