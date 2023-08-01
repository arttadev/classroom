import styles from "./Table.module.css";
import { PropTypes } from "prop-types";

const Table = ({ table }) => {
  const { name, ...tableInfo } = table;
  const WeekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const cellClass = (cell) => {
    if ((cell.rec && cell.reserved) || (!cell.rec && cell.reserved)) {
      return " " + styles.yellowCell;
    } else if (cell.rec && !cell.reserved) {
      return " " + styles.redCell;
    } else {
      return "";
    }
  };
  return (
    <>
      <h2>{name}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Time</th>
            {WeekDays.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(tableInfo).map((time) => (
            <tr key={time}>
              <td>{time.slice(0, 2) + ":" + time.slice(2)}</td>
              {WeekDays.map((day) => (
                <td key={day}>
                  {tableInfo[time][day.toLowerCase()] !== undefined && (
                    <div>
                      <div
                        className={
                          styles.cell +
                          cellClass(tableInfo[time][day.toLowerCase()])
                        }
                      >
                        {tableInfo[time][day.toLowerCase()].group}
                      </div>
                      <div className={styles.teacher}>
                        {tableInfo[time][day.toLowerCase()].teacher}
                      </div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

Table.propTypes = {
  table: PropTypes.object,
};
export default Table;
