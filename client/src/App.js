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
                    const minute = date.getMinutes();
                    return <td>{`${month + 1}/${day} ${hour}:${minute}`}</td>;
                  })}
                </tr>
                <tr>
                  <td>Value:</td>
                  {item.observations[0].data.map((value) => {
                    return <td>{value.value}</td>;
                  })}
                </tr>
                {/* <tr>
                  <td>Min</td>
                  <td>
                  {item.observations[0].data.map((value) => {
                      return <td>{Math.min(value.value)}</td>;
                    })}
                  </td>
                  <td>Avg</td>
                  <td>Max:</td>{item.observations[0].data.map((value) => {
                      return <td>{Math.max(value.value)}</td>;
                    })}
                </tr> */}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
