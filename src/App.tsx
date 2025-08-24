import ThemeInitializer from "./components/ThemeInitializer";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Todo from "./pages/Todo";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",        // dynamic viewport unit (better on mobile too)
      }}
    >
      <ThemeInitializer />
      <Header />
      <Todo />
      <Footer />
    </div>
  )
}

export default App;