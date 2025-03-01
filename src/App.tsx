import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RecipesPage from "./pages/RecipesPage";
import RecipePage from "./pages/RecipePage";
import FavoritesPage from "./pages/FavoritesPage";
import { CustomLink } from "./components/CustomLink";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <header>
          <CustomLink title="Go Home" route="/" />
          <CustomLink title="Go to ❤️" route="/favorites"/>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<RecipesPage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
