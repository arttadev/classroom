import { useEffect, useState } from "react";
import styles from "./ClassRoomsInfo.module.css";
import Table from "./Table/table";
import Search from "../Search/Search";

const ClassRoomInfo = () => {
  // eslint-disable-next-line no-unused-vars
  const [tables, setTables] = useState([]);
  useEffect(() => {
    fetch("https://academyclassrooms.com/api/schedule")
      .then((resp) => resp.json())
      .then((resp) => {
        const resArray = [];
        for (let classRoom in resp) {
          resArray.push({ name: classRoom, ...resp[classRoom] });
        }
        setTables(resArray);
      });
  }, []);
  return (
    <div className={styles.container}>
      <Search />
      {tables.map((table) => (
        <Table key={table.name} table={table} />
      ))}
    </div>
  );
};
export default ClassRoomInfo;
