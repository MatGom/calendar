import { AppProvider } from './context/AppContext';
import Calendar from './components/Calendar/Calendar';
import Notes from './components/Notes/Notes';
import Info from './components/Info/Info';

function App() {
  return (
    <AppProvider>
      <div>
        <Info />
        <Calendar />
        <Notes />
      </div>
    </AppProvider>
  );
}

export default App;
