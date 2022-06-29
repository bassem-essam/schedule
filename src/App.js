import "./App.css";
import React, { useState } from "react";
import { ALL_INDICES, ALL_SECTIONS, filterables } from "./data.js";
import FilterBar from "./components/FilterBar";
import TableView from "./components/TableView";
import GridView from "./components/GridView";

Array.prototype.intersect = function (b) {
  return this.length === 0 ? b : this.filter((val) => b.includes(val));
};

function intersection(start, ...args) {
  let result = start;
  for (let arg of args) {
    result = result.intersect(arg);
  }
  return result;
}

function App() {
  let [filter, setFilter] = useState({
    department: "",
    section: "",
    subject: [],
    lecture: true,
  });
  let [indices, setIndices] = useState(ALL_INDICES);

  function handleChange(kvp) {
    let whatIndices = [];
    let changedFilter = { ...filter, ...kvp };
    let allIndices = {};
    for (let [key, value] of Object.entries(changedFilter)) {
      // Return all data when a filter is empty
      let currentArray = ALL_INDICES;
      if (key == "section") {
        currentArray = ALL_SECTIONS;
      }

      if (key == "lecture") {
        currentArray = filterables["lecture"][value];
      } else if (
        value != "" ||
        (typeof value == "object" && value.length != 0)
      ) {
        currentArray =
          key == "subject"
            ? value.map((elem) => filterables[key][elem]).flat()
            : filterables[key][value];
      }
      allIndices[key] = currentArray;
    }

    let attendables = allIndices["section"].concat(allIndices["lecture"]);
    whatIndices = intersection(
      ALL_INDICES,
      attendables,
      allIndices["department"],
      allIndices["subject"]
    );

    setIndices(whatIndices);
    setFilter(changedFilter);
  }
  if (
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(
      navigator.userAgent
    )
  ) {
    return (
      <div id="App">
        <FilterBar filter={filter} onChange={handleChange} />
        <h3>{indices.length} results</h3>
        <TableView indices={indices} filter={filter} />
      </div>
    );
  } else {
    return (
      <div id="App">
        <FilterBar filter={filter} onChange={handleChange} />
        <h3>{indices.length} results</h3>
        <GridView indices={indices} filter={filter} />
      </div>
    );
  }
}

export default App;
