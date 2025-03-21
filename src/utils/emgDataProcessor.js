export const processEMGData = (data) => {
  if (!data) return null;

  try {
    // Convert and validate data entries
    const entries = Object.entries(data)
      .map(([key, value]) => {
        // Check if value is a string and contains the delimiter
        if (typeof value !== 'string' || !value.includes('-')) {
          console.warn(`Invalid data format for key ${key}:`, value);
          return null;
        }

        const [emgValue, timestamp] = value.split('-');
        return {
          value: parseFloat(emgValue),
          timestamp: parseInt(timestamp)
        };
      })
      .filter(entry => entry !== null && !isNaN(entry.value) && !isNaN(entry.timestamp))
      .sort((a, b) => b.timestamp - a.timestamp);

    if (entries.length === 0) return null;

    // Get the last 30 seconds of data for a rolling average
    const recentEntries = entries.slice(0, 30);
    
    const allValues = recentEntries.map(entry => entry.value);
    const currentValue = entries[0].value;
    const peakValue = Math.max(...allValues);
    
    // Calculate rolling average from recent entries
    const averageValue = recentEntries.length > 0
      ? Number((recentEntries.reduce((acc, entry) => acc + entry.value, 0) / recentEntries.length).toFixed(2))
      : 0;

    // Get last 30 entries for chart
    const last30Entries = entries.slice(0, 30).reverse();

    return {
      currentValue: Number(currentValue.toFixed(2)),
      peakValue: Number(peakValue.toFixed(2)),
      averageValue,
      chartData: last30Entries.map(entry => Number(entry.value.toFixed(2))),
      timestamps: last30Entries.map(entry => {
        const date = new Date();
        date.setSeconds(date.getSeconds() - (last30Entries[0].timestamp - entry.timestamp));
        return date.toLocaleTimeString();
      })
    };
  } catch (error) {
    console.error('Error processing EMG data:', error);
    return null;
  }
};