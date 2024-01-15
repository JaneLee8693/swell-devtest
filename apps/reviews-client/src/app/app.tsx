import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import WebFont from 'webfontloader';
import Header from './components/header/header';
import ReviewsList from './components/reviews-list/reviews-list';
import { theme } from './theme';
import { getReviews } from './context/reviewItems';
import React, { useEffect, useState } from 'react';

WebFont.load({
	google: {
		families: ['Montserrat:500,600,700'],
	},
});

export function App() {
	const [reviews, setReviews] = useState([]);
	useEffect(() => {
		// Fetch reviews and update the state
		const fetchReviews = async () => {
		  try {
			const response = await getReviews();
			setReviews(response.reviews);
		  } catch (error) {
			console.error('Error fetching reviews', error);
		  }
		};
	
		fetchReviews();
	  }, []);

	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Container sx={{ mt: 2, typography: 'body1' }}>
				<ReviewsList reviews={reviews}/>
			</Container>
		</ThemeProvider>
	);
}

export default App;
