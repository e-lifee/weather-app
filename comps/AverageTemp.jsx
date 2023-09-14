import React from 'react';

function AverageTemperature({ list }) {
    const totalTemp = list.reduce((sum, item) => sum + item.main.temp, 0);
    const averageTemp = totalTemp / list.length;

    return <>{averageTemp.toFixed(2)}</>;
}

export default AverageTemperature;
