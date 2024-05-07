export const convertSecToAudioTimeStamp = (totalSecs: number): string => {
  if (!Number.isFinite(totalSecs) || totalSecs <= 0) return "0:00";

  // if totalSecs is over 3600 === render in hours format e.g 02:01:56
  if (totalSecs >= 3600) {
    const hrs = totalSecs / 3600;
    const rem_hrs = totalSecs % 3600;
    const mins = rem_hrs / 60;
    const secs = rem_hrs % 60;

    return `${Math.floor(hrs).toString()}:${Math.floor(mins)
      .toString()
      .padStart(2, "0")}:${Math.floor(secs).toString().padStart(2, "0")}`;
  }

  //render in minutes e.g 35:01
  const durationMaths = `${Math.floor(totalSecs / 60)}:${Math.floor(
    totalSecs % 60
  )
    .toString()
    .padStart(2, "0")}`;

  return durationMaths;
};

export const widthCalc = (currentTime: number) => {
  //   const result = currentTime / 60;
  //   console.log(result, Math.floor(currentTime * 100));

  return Math.floor((currentTime / 60) * 100);
};
