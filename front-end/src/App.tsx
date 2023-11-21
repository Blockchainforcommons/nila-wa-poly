import Provider from "./provider";
import Layout from "./layout/layout";
import { ToastContainer } from "./utils/toast";
// import "../src/assets/css/index.css"

const App = () => {
  return (
    <Provider>
      <Layout />
      <ToastContainer
        newestOnTop
        hideProgressBar={true}
        pauseOnFocusLoss={false}
      />
    </Provider>
  );
};

export default App;
