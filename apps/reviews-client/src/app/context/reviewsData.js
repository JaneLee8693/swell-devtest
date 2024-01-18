export async function getReviews() {
  const response = await fetch('api/reviews');
  const reviews = await response.json();
  return reviews;
}