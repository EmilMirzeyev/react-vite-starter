import type { TableHeaderType } from "@/ui/shared/Table/table.type";

type RowsType = {
  id: number;
  lastName: string;
  firstName: string;
  age: number;
};

export const HomePageVM = () => {
  const rows: RowsType[] = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 15 },
    { id: 6, lastName: "Melisandre", firstName: "null", age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const columns: TableHeaderType<RowsType>[] = [
    { id: 1, key: ["id"], name: "ID" },
    { id: 2, key: ["firstName"], name: "First name" },
    { id: 3, key: ["lastName"], name: "Last name" },
    { id: 4, key: ["age"], name: "Age" },
  ];

  return { rows, columns };
};
