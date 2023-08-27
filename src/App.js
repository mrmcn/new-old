import { Btns } from "./components/FilterTasks";
import { Form } from "./components/Form";
import { Todo } from "./components/Todo";
import { AllProvider } from "./reducer_context/All";

function App() {
  return (
    <div className="todoapp stack-large">
      <AllProvider>
        <Form />
        <Btns />
        <Todo />
      </AllProvider>
    </div>
  );
}

export default App;
