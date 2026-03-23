import { useRoutes } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PictureDetails from "./components/PictureDetails";
import HomePage from "./pages/HomePage";
import PicturesPage from "./pages/PicturesPage";

type AppProps = {};

const App = ({}: AppProps) => {
  const routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/pictures", element: <PicturesPage /> },
    { path: "/pictures/:pictureId", element: <PictureDetails /> },
  ]);

  return (
    <>
      <Header />

      <main className="mt-20 min-h-screen">{routes}</main>

      <Footer />
    </>
  );
};

export default App;
