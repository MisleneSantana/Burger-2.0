import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles } from "./styles/global";
import { UserProvider } from "./providers/UserProvider";
import RoutesMain from "./routes";

const App = () => (
  <>
    <GlobalStyles />
    <ToastContainer position="top-right" theme="dark" limit={1} />
    <UserProvider>
      <RoutesMain />
    </UserProvider>
  </>
);

export default App;
