import { Company, Review, User } from '@prisma/client';

export interface ReviewsCountResponse {
	reviewsCount: number;
}

export interface ReviewExt extends Review {
	company: Company;
	user: User;
}

export interface ReviewsResponse {
	reviews: ReviewExt[];
	// id: string;
	// reviewerId: string;
	// companyId: string;
	// reviewText: string;
	// rating: number;
	// createdOn: string;
	// user: User;
	// company: Company;
}
