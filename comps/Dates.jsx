import React from 'react';

function Dates({ list }) {
    if (!list || list.length === 0) {
        return <p>Loading data...</p>;
    }
    const groupedDates = {};

    list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0];
        const lastTwoChars = date.slice(-2);

        if (!groupedDates[lastTwoChars]) {
            groupedDates[lastTwoChars] = {
                dates: [],
                totalTemp: 0,
                dayCount: 0,
            };
        }

        groupedDates[lastTwoChars].dates.push(date);
        groupedDates[lastTwoChars].totalTemp += item.main.temp;
        groupedDates[lastTwoChars].dayCount += 1;
    });


    const style = {
        color: 'red',
    };
    return (
        <div style={style}>
            {Object.entries(groupedDates).map(([lastTwoChars, data], index) => (
                <div key={index}>
                    <h3>Last Two Characters: {lastTwoChars}</h3>
                    <p>Total Temperature: {data.totalTemp.toFixed(2)}</p>
                    <p>Day Count: {data.dayCount}</p>
                    <p>Average Temperature: {(data.totalTemp / data.dayCount).toFixed(2)}</p>
                    <ul>
                        {data.dates.map((date, dateIndex) => (
                            <li key={dateIndex}>{date}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Dates;
