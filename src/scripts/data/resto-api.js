import API_ENDPOINT from '../global/api-endpoint';

class RESTO_API {
  static async allRestaurants() {
    try {
      const response = await fetch(API_ENDPOINT.HOME);
      const responseJSON = await response.json();
      return responseJSON.restaurants;
    } catch (error) {
      alert('You need to connect to the internet!');
      throw new Error(error);
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJSON = await response.json();
      return responseJSON.restaurant;
    } catch (error) {
      alert('You need to connect to the internet!');
      throw new Error(error);
    }
  }

  static async postReview(review) {
    try {
      const response = await fetch(API_ENDPOINT.REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: review,
      });
      const responseJSON = await response.json();
      return responseJSON.error;
    } catch (error) {
      alert('You need to connect to the internet!');
      throw new Error(error);
    }
  }
}

export default RESTO_API;
