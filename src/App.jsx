import React, { useEffect } from 'react';

const App = () => {
	const hello = () => {
		console.log('hello from func');
	};
	useEffect(() => {
		hello();
	}, []);

	return <h1>Hello to from React + Webpack!</h1>;
};

export default App;
