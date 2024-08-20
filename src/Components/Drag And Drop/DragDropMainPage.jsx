import DragArea from "./DragArea";


const App = () => {
  const containers = {
    container1: [1, 2, 3, 10, 11, 12],
    container2: [4, 5, 6],
    container3: [7, 8, 9],
  };

  return <DragArea data={containers} />;
};

export default App;


