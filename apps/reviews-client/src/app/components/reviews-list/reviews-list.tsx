import { Alert, Typography, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from 'react';
import ReviewItem, { ReviewsProps } from '../review-item/review-item';
import { getReviews } from '../../context/reviewsData';

const styles = {
	title: {
		fontSize: '25pt',
		marginBottom: '10px',
		paddingTop: '10px',
	},
	searchInput: {
		marginBottom: '10px',
	},
	noMatchingReviews: {
		fontSize: '14pt',
	},
};

export function ReviewsList() {

	const [reviews, setReviews] = useState<ReviewsProps['reviews']>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [searchKeyword, setSearchKeyword] = useState('');
	const [filteredReviews, setFilteredReviews] = useState<ReviewsProps['reviews']>([]);


	useEffect(() => {
		// Fetch reviews and update the state
		const fetchReviews = async () => {
		  try {
			const response = await getReviews();
			setReviews(response.reviews);
			setFilteredReviews(response.reviews);
		  } catch (error) {
			console.error('Error fetching reviews', error);
			setError('Error retrieving review data. Reload the page to try again.');
		  }
		  setIsLoading(false);
		};
	
		fetchReviews();
	  }, []);

	  useEffect(() => {
		// Filter reviews based on the search keyword
		const filtered = reviews.filter((review) =>
		  review.user.firstName?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
		  review.user.lastName?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
		  review.company.name.toLowerCase().includes(searchKeyword.toLowerCase())
		);
		setFilteredReviews(filtered);
	  }, [searchKeyword, reviews]);

	return (
		<>
			<Typography style={styles.title} variant="h1">
			Reviews:
			</Typography>
			<TextField
				style={styles.searchInput}
				label="Search"
				placeholder='Search reviews...'
				variant="outlined"
				fullWidth
				value={searchKeyword}
				onChange={(e) => setSearchKeyword(e.target.value)}
			/>
			<SearchIcon style={{ fill: '#e11979' }} />
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
				// eslint-disable-next-line react/jsx-no-useless-fragment
				<>
					{filteredReviews.length ? (
					<ReviewItem reviews={filteredReviews} />
					) : (
					<Typography style={styles.noMatchingReviews}>No matching reviews</Typography>
					)}
			  	</>
			)}
	  </>
	);
}

export default ReviewsList;
