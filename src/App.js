import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <div className="flex flex-col justify-between h-screen">
      <Navbar />
        <main className="container mx-auto px-3 pb-12">
          <Home />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
