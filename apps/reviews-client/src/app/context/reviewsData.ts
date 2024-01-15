export async function getReviews() {
    try {
      const response = await fetch('api/reviews');
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews. Status: ${response.status}`);
      }
  
      const reviews = await response.json();
      return { reviews, error: null };
    } catch (error) {
      return { reviews: [], error: 'Error fetching reviews' };
    }
  }
  