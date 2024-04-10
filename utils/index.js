export const getOtherValues = (startPoint, endPoint) => {
  let latDiff = Math.abs(startPoint.latitude - endPoint.latitude);
  let lonDiff = Math.abs(startPoint.longitude - endPoint.longitude);

  return {
    verticalInitial: {
      latitude: startPoint.latitude - latDiff,
      longitude: startPoint.longitude,
    },
    verticalEnd: {
      latitude: startPoint.latitude + latDiff,
      longitude: startPoint.longitude,
    },

    horizontalInitial: {
      latitude: startPoint.latitude,
      longitude: endPoint.longitude - lonDiff,
    },
    horizontalEnd: {
      latitude: startPoint.latitude,
      longitude: startPoint.longitude + lonDiff,
    },
  };
};

