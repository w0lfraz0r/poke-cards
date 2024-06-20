import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import PokemonList from './components/PokemonList';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonList />
    </QueryClientProvider>
  )
}

export default App
