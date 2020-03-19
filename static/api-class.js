const BASE_URL = "http://127.0.0.1:5000/api";

class Cupcakes {
  constructor(cupcakes) {
    this.cupcakes = cupcakes;
  }

  static async fetchAllCupcakes() {
    // query the /stories endpoint (no auth required)
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    // turn the plain old story objects from the API into instances of the Story class
    const cupcakes = response.data.cupcakes.map(
      cupcake => new Cupcake(cupcake)
    );

    // build an instance of our own class using the new array of stories
    const cupcakesList = new Cupcakes(cupcakes);
    return cupcakesList;
  }

  static async createCupcakes(cupcake) {
    // this function should return the newly created cupcake so it can be used in
    // the script.js file where it will be appended to the DOM
    const response = await axios.post(`${BASE_URL}/cupcakes`, {
      flavor: cupcake.flavor,
      size: cupcake.size,
      rating: cupcake.rating,
      image: cupcake.image
    });

    // turn API response into Cupcake instance
    const cupcakeInstance = new Cupcake(response.data.cupcake);
    return cupcakeInstance;
  }

  async updateCupcake(cupcake) {
    // this function should return the newly created story so it can be used in
    // the script.js file where it will be appended to the DOM
    const response = await axios.patch(`${BASE_URL}/cupcakes/{cupcake.id}`, {
      flavor: flavor,
      size: size,
      rating: rating,
      image: image
    });

    // turn API response into Cupcake instance
    const cupcakeInstance = new Cupcake(response.data.cupcake);
    return cupcakeInstance;
  }

  async deleteCupcake(cupcakeId) {
    // this function should return the newly created story so it can be used in
    // the script.js file where it will be appended to the DOM
    const response = await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    return response;
  }
}

class Cupcake {
  constructor(cupcake) {
    this.id = cupcake.id;
    this.flavor = cupcake.flavor;
    this.size = cupcake.size;
    this.rating = cupcake.rating;
    this.image = cupcake.image;
  }
}
