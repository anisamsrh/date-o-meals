import API_ENDPOINT from '../global/api-endpoint';

class RESTO_API {
  static async allRestaurants() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJSON = await response.json();
    return responseJSON.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJSON = await response.json();
    return responseJSON.restaurant;
  }

  static async postReview() {
    // post new review on restaurant
  }
}

export default RESTO_API;
