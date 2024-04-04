import { AppProvider } from './context/AppContext';
import Calendar from './components/Calendar/Calendar';
import Notes from './components/Notes/Notes';

function App() {
  return (
    <AppProvider>
      <div>
        <Calendar />
        <Notes />
      </div>
    </AppProvider>
  );
}

export default App;
