import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io("https://dms2.dhm.gov.np", {
      path: "/gss/socket.io",
    });

    socket.on("connect", () => {
      // recieve a msg from the server
      socket.on("Mahakali_Basin", (data) => {
        setData(data);
      });
      // send a msg to the server
      socket.emit("client_request", "Mahakali_Basin");
    });
  }, []);
  const arr = [];
  const calculateAverage = (array) => {
    const sum = array.reduce((acc, cr) => acc + cr);
    const average = sum / array.length;
    return average;
  };
  return (
    <>
      <div className="fit">
        <table className="tab">
          <tbody>
            {data.map((item) => (
              <>
                <tr>
                  <td>{item.name}</td>
                  {item.observations[0].data.map((value) => {
                    const date = new Date(value.datetime);
                    const month = date.getMonth();
                    const day = date.getDate();
                    const hour = date.getHours();

                    switch (hour) {
                      case hour:
                        return (
                          <td>{`${month + 1}/${day}:${hour}-${hour + 1}`}</td>
                        );
                    }
                  })}

                  {/* {item.observations[0].data.forEach(function (value) {
                    console.log(value.value);
                  })} */}
                </tr>
                <tr>
                  <td>
                    <b>Value:</b>
                  </td>

                  {item.observations[0].data.map((value) => {
                    arr.push(value.value);
                    return <td>{value.value}</td>;
                  })}
                </tr>
                <tr>
                  <td>
                    <b>Category:</b>
                  </td>
                  {item.observations[0].data.map((value) => {
                    const val = value.value;
                    {
                      if (
                        val <
                        calculateAverage(
                          item.observations[0].data.map((value) => value.value)
                        )
                      ) {
                        return <td style={{ color: "blue" }}>Below Avg</td>;
                      } else if (
                        val >
                        calculateAverage(
                          item.observations[0].data.map((value) => value.value)
                        )
                      ) {
                        return <td style={{ color: "red" }}>Above Avg</td>;
                      } else {
                        return <td style={{ color: "green" }}>Average</td>;
                      }
                    }
                  })}
                </tr>
                <tr>
                  <td style={{ color: "blue" }}>
                    <b>Min:</b>
                  </td>
                  <td style={{ color: "blue" }}>
                    {Math.min(
                      ...item.observations[0].data.map((value) => value.value)
                    )}
                  </td>
                </tr>
                <tr>
                  <td style={{ color: "green" }}>
                    <b>Avg:</b>
                  </td>
                  <td style={{ color: "green" }}>
                    {calculateAverage(
                      item.observations[0].data.map((value) => value.value)
                    )}
                  </td>
                </tr>
                <tr>
                  <td style={{ color: "red" }}>
                    <b>Max:</b>
                  </td>
                  <td style={{ color: "red" }}>
                    {Math.max(
                      ...item.observations[0].data.map((value) => value.value)
                    )}
                  </td>
                </tr>
                <br />
                <br />
                <br />
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
