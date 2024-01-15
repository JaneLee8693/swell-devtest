import { Alert, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ReviewItem from '../review-item/review-item';
import { getReviews } from '../../context/reviewsData';

const styles = {
	title: {
		fontSize: '25pt',
		marginBottom: '10px',
		paddingTop: '10px',
	},
};

export function ReviewsList() {

	const [reviews, setReviews] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		// Fetch reviews and update the state
		const fetchReviews = async () => {
		  try {
			const response = await getReviews();
			setReviews(response.reviews);
		  } catch (error) {
			console.error('Error fetching reviews', error);
			setError('Error retrieving review data. Reload the page to try again.');
		  }
		  setIsLoading(false);
		};
	
		fetchReviews();
	  }, []);

	return (
		<>
			<Typography style={styles.title} variant="h1">
			Reviews:
			</Typography>
			<hr></hr>
	
			{isLoading ? (
			<Typography sx={{ fontSize: '14pt' }} data-testid="loading-msg">
				Loading review data...
			</Typography>
			) : error ? (
			<Alert severity="error" sx={{ width: '100%' }}>
				{error}
			</Alert>
			) : (
			<ReviewItem reviews={reviews} />
			)}
	  </>
	);
}

export default ReviewsList;
