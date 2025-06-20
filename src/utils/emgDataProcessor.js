export const processEMGData = (data) => {
  if (!data) return null;

  try {
    // Convert and validate data entries
    const entries = Object.entries(data)
      .map(([key, value]) => ({
        value: parseFloat(value.value),
        timestamp: parseInt(value.timestamp)
      }))
      .filter(entry => !isNaN(entry.value) && !isNaN(entry.timestamp))
      .sort((a, b) => b.timestamp - a.timestamp);

    if (entries.length === 0) return null;

    // Get only data from the last 2 minutes
    const twoMinutesAgo = Date.now() - 120000;
    const recentEntries = entries.filter(entry => entry.timestamp > twoMinutesAgo);
    
    if (recentEntries.length === 0) {
      return {
        currentValue: 0,
        peakValue: 0,
        averageValue: 0,
        chartData: [],
        timestamps: []
      };
    }

    const currentValue = recentEntries[0].value;
    const allValues = recentEntries.map(entry => entry.value);
    const peakValue = Math.max(...allValues);
    
    // Calculate average from recent entries only
    const averageValue = Number((allValues.reduce((acc, val) => acc + val, 0) / allValues.length).toFixed(2));

    // Get only last 12 entries for chart for better readability
    const chartEntries = recentEntries.slice(-12).reverse();

    return {
      currentValue: Number(currentValue.toFixed(2)),
      peakValue: Number(peakValue.toFixed(2)),
      averageValue,
      chartData: chartEntries.map(entry => Number(entry.value.toFixed(2))),
      timestamps: chartEntries.map(entry => entry.timestamp)
    };
  } catch (error) {
    console.error('Error processing EMG data:', error);
    return {
      currentValue: 0,
      peakValue: 0,
      averageValue: 0,
      chartData: [],
      timestamps: []
    };
  }
};