import { createContext, useEffect, useState, useRef, useCallback } from "react";

const AlertContext = createContext({});

export const AlertProvider = ({ children }) => {
  const alertDiv = useRef(null);
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = useCallback((msg) => {
    setAlertMessage(msg);
    setShow(true);
  }, []);

  useEffect(() => {
    if (show && alertDiv.current) {
      alertDiv.current.classList.add("animate-slide-in-top");
      alertDiv.current.classList.remove("animate-slide-out-top");

      setTimeout(() => {
        alertDiv.current.classList.remove("animate-slide-in-top");
        alertDiv.current.classList.add("animate-slide-out-top");
        setTimeout(() => {
          setShow(false);
        }, 1000);
      }, 2500);
    }
  }, [show, alertDiv]);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {show ? (
        <div className="relative">
          <div ref={alertDiv} className="fixed top-0 left-0 w-screen z-50 bg-red-800 p-4 text-sm text-white font-bold animate-slide-in-top duration-1000 shadow">
            {alertMessage}
          </div>
        </div>
      ) : null}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
