import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Compass = () => {
  const [compassValue, setCompassValue] = useState<string>("0");

  useEffect(() => {
    // Function to handle successful retrieval of compass heading
    function onSuccess(heading: any) {
      setCompassValue(String(heading.magneticHeading));
    }

    // Function to handle compass errors
    function onError(compassError: any) {
      alert("Compass error: " + compassError.code);
    }

    // Options for the compass
    var options = {
      frequency: 3000,
    };

    // Check if navigator.compass exists
    //@ts-ignore
    if (navigator.compass) {
      //@ts-ignore
      var watchID = navigator.compass.watchHeading(onSuccess, onError, options);
    } else {
      // Handle the case where compass is not available
      alert("Compass is not supported on this device.");
    }
    // Cleanup function to clear the compass watch
    return () => {
      if (watchID) {
        //@ts-ignore
        navigator.compass.clearWatch(watchID);
      }
    };
  }, []);

  return (
    <div className="fixed top-28 right-1 z-[9999]">
      <div className="w-20 h-20 rounded-full border border-red-800 relative">
        <p className="left-1/2 -bottom-[10%]">
          {Number(compassValue).toFixed(2)}
        </p>
        <div className="absolute top-2/4 left-2/4 w-max h-max border border-red-900">
          <div
            className={cn(
              "absolute top-2/4 left-2/4 origin-top w-1 h-6 bg-black"
            )}
            style={{
              rotate: `${parseFloat(compassValue) - 180}deg`,
            }}
          />
        </div>

        <span className="absolute top-0 left-2/4">N</span>
        <span className="absolute top-1/3 right-0">E</span>
        <span className="absolute bottom-0 left-2/4">S</span>
        <span className="absolute top-1/3 left-0">W</span>
      </div>
    </div>
  );
};

export default Compass;
