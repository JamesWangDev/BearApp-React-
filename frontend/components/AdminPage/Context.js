import React, {
  useState,
  useMemo,
  useContext,
  createContext,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import CloseIcon from "@iconscout/react-unicons/icons/uil-times";

function getColorString(type) {
  const color = getColor(type);
  return `bg-${color}-500 border-2 border-${color}-900`;
}

function getColor(type) {
  if (type === "success") return `green`;
  if (type === "error") return `red`;
  if (type === "info") return `blue`;
  return `blue`;
}

const AdminPageContext = createContext({});

export const useSnacks = () => useContext(AdminPageContext);

export default function SnackProvider({ children }) {
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snack, setSnack] = useState("");
  const [type, setType] = useState("info");

  const openSnack = useCallback((snack, type) => {
    setSnack(snack);
    setType(type);
    setIsSnackOpen(true);
  });

  const closeSnack = useCallback(() => {
    setIsSnackOpen(false);
  });

  // memotize handlers to avoid unnecessary rerenders
  const handlers = useMemo(() => ({ openSnack, closeSnack }), [snack, type]);

  useEffect(() => {
    let id;
    if (isSnackOpen) {
      id = setTimeout(() => closeSnack(), 8000);
    }
    return () => clearTimeout(id);
  }, [isSnackOpen]);

  return (
    <AdminPageContext.Provider value={handlers}>
      {children}

      <div
        className={`${getColorString(
          type
        )} pl-4 pr-6 py-4 m-3 z-50 rounded-lg text-white text-lg`}
      >
        <span>{snack}</span>
        <CloseIcon
          color="#fff"
          onClick={closeSnack}
          className="absolute top-0 right-0 m-1 rounded-full fill-current cursor-pointer"
        />
      </div>

      <style jsx>{`
        div {
          position: fixed;
          bottom: 0;
          width: 100%;
          max-width: 295px;
          /* need to add 30px to account for margin */
          transform: translateY(${isSnackOpen ? 0 : `calc(100% + 30px)`});
          transition: transform 0.3s;
        }
      `}</style>
    </AdminPageContext.Provider>
  );
}

SnackProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
