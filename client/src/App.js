// Import dependencies
import './App.css';

// Import redux components
import { Provider } from 'react-redux';
import store from './store';

// Import chat component

// Connect application to redux
const App = () => {
	return (
		<Provider store={store}>
			<div className="App">
				{/* Insert chat component here! */}
				Hello World!
			</div>
		</Provider>
	);
};

export default App;
