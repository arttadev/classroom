/* eslint-disable no-unused-vars */
import { useState } from "react";
import styles from "./Search.module.css";

const Search = () => {
  const [term, setTerm] = useState("");
  const [from, setFrom] = useState("from");
  const [day, setDay] = useState("day");
  const [to, setTo] = useState("to");
  const [result, setResult] = useState();
  // Object.keys(result).map((key) => {
  //   Object.keys(result[key]).map((key2) => {
  //     console.log(key2);
  //   });
  // });
  function resetHandler() {
    setTerm("");
    setFrom("from");
    setDay("day");
    setTo("to");
    setResult(undefined);
  }
  const searchInputHandler = (event) => {
    setTerm(event.target.value);
    if (event.target.value === "") {
      return;
    }
    const params = new URLSearchParams({});
    params.append("term", event.target.value);
    if (from !== "from") params.append("from", from);
    if (day !== "day") params.append("day", day);
    if (to !== "to") params.append("to", to);
    fetch("https://academyclassrooms.com/api/schedule/search?" + params)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        console.log(result);
        setResult(result.groups);
      });
  };
  const daySelectHandler = (event) => {
    setDay(event.target.value);
  };
  const fromSelectHandler = (event) => {
    setFrom(event.target.value);
  };

  const toSelectHandler = (event) => {
    setTo(event.target.value);
  };
  const searchRequestHandler = (event) => {
    if (!term && from === "from" && day === "day" && to === "to") {
      return;
    }
    const params = new URLSearchParams({});
    if (term !== "") params.append("term", term);
    if (from !== "from") params.append("from", from);
    if (day !== "day") params.append("day", day);
    if (to !== "to") params.append("to", to);
    fetch("https://academyclassrooms.com/api/schedule/search?" + params)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        setResult(result.groups);
      });
  };
  const time = [
    { time: 10, value: 1000 },
    { time: 11, value: 1100 },
    { time: 12, value: 1200 },
    { time: 13, value: 1300 },
    { time: 14, value: 1400 },
    { time: 15, value: 1500 },
    { time: 16, value: 1600 },
    { time: 17, value: 1700 },
    { time: 18, value: 1800 },
    { time: 19, value: 1900 },
    { time: 20, value: 2000 },
    { time: 21, value: 2100 },
  ];
  return (
    <div className={styles.search}>
      <h1>Classrooms: Beta</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={searchInputHandler}
        value={term}
      />
      <select onChange={daySelectHandler} value={day}>
        <option value="day">day</option>
        <option value="mon">Monday</option>
        <option value="tue">Tuesday</option>
        <option value="wed">Wednesday</option>
        <option value="thu">Thursday</option>
        <option value="fri">Friday</option>
        <option value="sat">Saturday</option>
        <option value="sun">Sunday</option>
      </select>
      <select onChange={fromSelectHandler} value={from}>
        <option value="from"> From</option>
        {time.map((time) => (
          <option key={time.time} value={time.value}>
            {time.time}
          </option>
        ))}
      </select>
      <select onChange={toSelectHandler} value={to}>
        <option value="to"> To</option>
        {time.map((time) => (
          <option key={time.time} value={time.value}>
            {time.time}
          </option>
        ))}
      </select>
      <button type="button" onClick={searchRequestHandler}>
        Search
      </button>
      <button onClick={resetHandler}>Reset</button>
      {result && (
        <table>
          <thead>
            <tr>
              <th>Group</th>
              <th>Classroom</th>
              <th>SCHEDULE</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(result).map((key) => {
              return Object.keys(result[key]).map((key2) => {
                return (
                  <tr key={key2}>
                    <td>{key}</td>
                    <td>{key2}</td>
                    <td>
                      {Object.keys(result[key][key2]).map((key3) => {
                        return (
                          <div key={key3}>
                            <div>
                              {key3.toUpperCase() +
                                ":" +
                                result[key][key2][key3].hours[0] +
                                "-" +
                                result[key][key2][key3].hours.slice(-1)}
                            </div>
                            <div>
                              {"Teacher: " + result[key][key2][key3].teacher}
                            </div>
                          </div>
                        );
                      })}
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default Search;
