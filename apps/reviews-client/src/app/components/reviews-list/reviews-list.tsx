import Alert from '@mui/material/Alert';
import TaskIcon from '@mui/icons-material/Task';
import React from 'react';
import { Company, Review, User } from '@prisma/client';

interface ReviewData extends Review {
	company: Company;
	user: User;
}

/* eslint-disable-next-line */
export interface ReviewsListProps {
	reviews: ReviewData[];
}

export function ReviewsList(props: ReviewsListProps) {

	const { reviews } = props;

	return (
		<div>
			{reviews.length > 0 ? (
			<div>
				{reviews.map((review) => (
				<div key={review.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
					<h3>{`Review by ${review.user.firstName} ${review.user.lastName}`}</h3>
					<p>{`Company: ${review.company.name}`}</p>
					<p>{`Date: ${new Date(review.createdOn).toLocaleDateString()}`}</p>
					<p>{`Rating: ${review.rating || 'N/A'}`}</p>
					<p>{`Review: ${review.reviewText || 'No review text available'}`}</p>
				</div>
				))}
			</div>
			) : (
			<Alert severity="info" icon={<TaskIcon />}>
				No reviews found.
			</Alert>
			)}
	  	</div>
	);
}

export default ReviewsList;
