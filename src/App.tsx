import { ErrorBoundary } from "react-error-boundary";

import { AuthProvider } from "./context/AuthHandler";

import AllRoutes from "./utils/AllRoutes";
import FallbackRender from "./errorHandling/FallbackRender";

import "./App.scss";

function App() {
  return (
    <ErrorBoundary 
      FallbackComponent={FallbackRender} 
      onError={(error)=>{console.log(error);
    }}>
      <AuthProvider>
        <AllRoutes />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
