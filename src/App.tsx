import { Chat } from './components/Chat';
import { useSettings } from './store/settings';

function App() {
  const theme = useSettings((state) => state.theme);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <Chat />
    </div>
  );
}

export default App;