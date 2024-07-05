import './App.css';
import Todo from './components/Todo'

function App() {
  return (
    <div>
      <div className="header">
        <p className="app-header">Todo App</p>
      </div>
      <div>
        <Todo/>
      </div>
    </div>
  );
}

export default App;
