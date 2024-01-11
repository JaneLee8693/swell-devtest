import Alert from '@mui/material/Alert';
import TaskIcon from '@mui/icons-material/Task';
// import React, { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface ReviewsListProps {}

export function ReviewsList(props: ReviewsListProps) {
	return (
		<Alert severity="error" icon={<TaskIcon />}>
			TODO: Implement ReviewsList
		</Alert>
	);
}

export default ReviewsList;
