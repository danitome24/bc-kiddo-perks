import { Child, Perk, Task } from "~~/types/kiddoPerks";

const mockChildrenData: Child[] = [
  {
    id: 1,
    name: "Juan",
    avatar: "/childAvatar.png",
    tokens: 320,
    progress: { completed: 5, total: 7 },
  },
  {
    id: 2,
    name: "Sofía",
    avatar: "/childAvatar.png",
    tokens: 220,
    progress: { completed: 3, total: 6 },
  },
  {
    id: 3,
    name: "Pepe",
    avatar: "/childAvatar.png",
    tokens: 220,
    progress: { completed: 3, total: 6 },
  },
  {
    id: 4,
    name: "María",
    avatar: "/childAvatar.png",
    tokens: 220,
    progress: { completed: 3, total: 6 },
  },
];

const mockPerks: Perk[] = [
  { id: 1, name: "1 hora extra de TV", cost: 50, redeemedBy: ["Anna", "Pablo"] },
  { id: 2, name: "Dormir tarde", cost: 80 },
  { id: 3, name: "Bolsa de chuches", cost: 80, redeemedBy: ["Luis", "Spfía"] },
  { id: 4, name: "Pizza para cenar", cost: 200 },
];

const mockTasks: Task[] = [
  { id: 1, description: "Hacer la cama", status: "Pending" },
  { id: 2, description: "Lavarse los dientes", status: "Pending" },
  { id: 3, description: "Recoger juguetes", status: "Pending" },
];

const mockTasksHistory: Task[] = [
  { id: 1, description: "Sofía completó la tarea: Leer 30 minutos." },
  { id: 2, description: "Juan canjeó el perk: 1 hora extra de TV." },
  { id: 3, description: "Nueva tarea asignada: Recoger juguetes." },
];

export { mockChildrenData, mockPerks, mockTasks, mockTasksHistory };
