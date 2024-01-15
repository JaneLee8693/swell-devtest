import { Alert, Card, CardContent, Typography } from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import StarIcon from '@mui/icons-material/Star';
import { Company, User, Review } from '@prisma/client';

const styles = {
	card: {
		margin: 'auto',
		marginTop: '5px',
	},
    header: {
		display: 'flex',
		flex_direction: 'row',
	},
	info: {
		display: 'flex',
		alignItems: 'flex-end',
	},
	rating: {
		display: 'flex',
		justifyContent: 'right',
		flexGrow: 1,
		marginRight: '15px',
	},
};

interface ReviewData extends Review {
	company: Company;
	user: User;
}

/* eslint-disable-next-line */
export interface ReviewsProps {
	reviews: ReviewData[];
}

export function ReviewItem(props: ReviewsProps) {
	const { reviews } = props;

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{reviews.length ? (
				<>
					{reviews.map((review, index) => (
						<Card
							style={styles.card}
							sx={{ backgroundColor: '#e2e2e3' }}
							variant="outlined"
							data-testid="review-card"
							key={review.id}
						>
							<CardContent>
								<div style={styles.header}>
									<div>
										<div style={styles.info}>
											<Typography sx={{ fontSize: '15pt' }} variant="h3">
												{`${review.user.firstName} ${review.user.lastName}`}
											</Typography>
											<Typography
                                                component="div"
                                                sx={{ fontSize: '8pt', marginLeft: '15px' }}
                                                color="text.secondary"
											>
                                                reviewed on {''}
												{new Date(review.createdOn).toLocaleString('en-US', {
													dateStyle: 'short',
												})}
											</Typography>
										</div>
										<Typography sx={{ mb: 1, mt: 1 }} color="text.secondary">
											{review.company.name}
										</Typography>
									</div>
									<div style={styles.rating}>
										<Typography sx={{ color: '#e11979', fontSize: '20pt', fontWeight: 'bold' }}>
											{review.rating}
										</Typography>
										<StarIcon sx={{ color: '#e11979', fontSize: '30pt' }} />
									</div>
								</div>
								{review.reviewText && (
									<Typography variant="body1" data-testid="review-text">
										{review.reviewText}
									</Typography>
								)}
							</CardContent>
						</Card>
					))}
				</>
			) : (
                <Alert severity="info" icon={<TaskIcon />}>
                    No reviews found.
                </Alert>
			)}
		</>
	);
}

export default ReviewItem;