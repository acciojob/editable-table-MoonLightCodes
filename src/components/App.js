import React, { useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [arr, setArr] = useState(() =>
    Array.from({ length: 6 }, () => {
      return {
        original:"",
        name: "",
        age: "",
        edited: false,
      };
    })
  );
  return (
    <div>
      <h1>Track edited cells to log updates for future</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((e, i) => {
            return (
              <tr key={e+i}>
                <td>{i + 1}</td>
                <td>
                  <input
                    type="text"
                    value={e.name}
                    onChange={(ev) => {
                      const { value } = ev.target;
                      setArr((pre) => {
                        return pre.map((ele, ind) => {
                          if (ind === i) {
                            return {
                              ...ele,
                              name: value,
                              edited: ele.original===ele.name,
                            };
                          } else return ele;
                        });
                      });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={e.age}
                    onChange={(ev) => {
                      const { value } = ev.target;
                      setArr((pre) => {
                        return pre.map((ele, ind) => {
                          if (ind === i) {
                            return {
                              ...ele,
                              age: value,
                              edited: true,
                            };
                          } else return ele;
                        });
                      });
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={() => {
          const rt = arr.reduce((acc, ele, i) => {
            if (ele.edited) {
              return [...acc, i+1];
            } else {
              return acc;
            }
          }, []);
          setArr(pre=>{
            return pre.map((e)=>{
              return {
                ...e,
                edited:false,
                original:e.name,
              }
            })
          })
          console.log("Edited rows: ",rt);
        }}
      >
        Save Changes
      </button>
    </div>
  );
};

export default App;
