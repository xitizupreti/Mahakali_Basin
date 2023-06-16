import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const App2 = () => {
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

  const hourlyGroups = {};
  const monthGroups = {};
  const dateGroups = {};
  data.map((item) =>
    item.observations[0].data
      .map((value) => ({
        time: value.datetime,
        value: value.value,
      }))
      ?.forEach((time) => {
        const h = new Date(time.time);
        const hour = h.getHours();
        const date = h.getDate();
        const month = h.getMonth();
        if (!dateGroups[date]) {
          dateGroups[date] = [];
        }
        if (!month[month]) {
          monthGroups[month] = [];
        }
        if (!hourlyGroups[hour]) {
          hourlyGroups[hour] = [];
        }
        hourlyGroups[hour].push(time.time, time.value);
        // dateGroups[hour].sort((a,b) =>  new Date(b.date) - new Date(a.date));
      })
  );
  // console.log(times.value);
  // console.log({times});
  // const valueGroups = {};
  // times[0]?.forEach((time) => {
  //   // console.log({time});
  //   const hour = new Date(time.time).getHours();
  //   if (!hourlyGroups[hour]) {
  //     hourlyGroups[hour] = [];
  //   }
  //   hourlyGroups[hour].push(time.time);

  //   // const value=(time.value);
  //   // if (!valueGroups[value]) {
  //   //   valueGroups[value] = [];
  //   // }
  //   // valueGroups[value].push(time.value);
  // });
  // times[0]?.forEach((time) => {
  //   // console.log({time});
  //   const hour = new Date(time.time).getHours();

  //   if (!hourlyGroups[hour]) {
  //     hourlyGroups[hour] = [];
  //   }
  //   hourlyGroups[hour].push(time.value);

  //   // const value=(time.value);
  //   // if (!valueGroups[value]) {
  //   //   valueGroups[value] = [];
  //   // }
  //   // valueGroups[value].push(time.value);
  // });

  // times[1]?.forEach((time) => {
  //   // console.log({time});
  //   const hour = new Date(time.time).getHours();
  //   if (!hourlyGroups[hour]) {
  //     hourlyGroups[hour] = [];
  //   }
  //   hourlyGroups[hour].push(time.time);
  // });
  // times[1]?.forEach((time) => {
  //   // console.log({time});
  //   const hour = new Date(time.time).getHours();

  //   if (!hourlyGroups[hour]) {
  //     hourlyGroups[hour] = [];
  //   }
  //   hourlyGroups[hour].push(time.value);
  // });
  // console.log(valueGroups);
  return (
    <div>
      {Object.entries(dateGroups).map(([date, times]) => (
        <div key={date}>
          <h3>Date: {date}</h3>
          {Object.entries(hourlyGroups).map(([hour, times]) => (
            <div key={hour}>
              <h3>
                Hour: {hour}-{parseInt(hour) + 1}
              </h3>
              <ul>
                {times.map((time, index) => {
                  const h = new Date(time);
                  const date = h.getDate();

                  for (let i = 0; i <= 30; i++) {
                    return <li key={index}>{time}</li>;
                  }
                  // console.log({ time });
                })}
                {/* {times.filter(function (item) {
                  const h = new Date(item);
                  const date = h.getDate();
                  //  console.log(date);
                  if (date == 15) {
                    times.map((time, index) => (
                      // <li key={index}>{time}</li>
                      console.log({time})
                    ));
                  } else {
                    return false;
                  }
                })} */}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App2;
