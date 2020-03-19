$(async function() {
  const $cupcakesList = $("#cupcakes-list");
  const $addCupcakeForm = $("#add-cupcake-form");

  cupcakesList = null;
  await generateCupcakes();
  /**
   * Event listener for signing up/creating account.
   * If successful, we will setup a new user instance
   */

  $addCupcakeForm.on("submit", addCupcake);
  $cupcakesList.on("click", "#delete-button", removeCupcake);

  async function addCupcake(evt) {
    evt.preventDefault();

    const flavor = $("#flavor").val();
    const size = $("#size").val();
    const rating = $("#rating").val();
    let image = $("#image").val();
    image = image === "" ? null : image;

    const cupcake = { flavor, size, rating, image };

    try {
      const cupcakeInstance = await Cupcakes.createCupcakes(cupcake);
      addToList(cupcakeInstance);
    } catch (error) {
      alert("couldn't create cupcake: please input into all fields");
    }

    $(this).trigger("reset");
  }

  async function generateCupcakes() {
    // get an instance of StoryList
    const cupcakesInstance = await Cupcakes.fetchAllCupcakes();
    // update our global variable
    cupcakesList = cupcakesInstance;
    // empty out that part of the page
    $cupcakesList.empty();

    // loop through all of our stories and generate HTML for them
    for (let cupcake of cupcakesList.cupcakes) {
      const result = generateCupcakeHTML(cupcake);
      $cupcakesList.append(result);
    }
  }

  function generateCupcakeHTML(cupcake) {
    // render story markup
    const cupcakeMarkup = $(`
      <li id="${cupcake.id}" class="list-group-item">
        <b>${cupcake.flavor} </b><small> - Rating: ${cupcake.rating}</small>
        <button class="btn btn-danger btn-sm" id="delete-button">Delete</button>
        <img class="cupcake-img img-fluid"
            src="${cupcake.image}"
            alt="${cupcake.flavor}">
      </li>
    `);

    return cupcakeMarkup;
  }

  function addToList(cupcake) {
    const cupcakeHTML = generateCupcakeHTML(cupcake);
    $cupcakesList.append(cupcakeHTML);
  }

  async function removeCupcake(evt) {
    evt.preventDefault();
    const $cupcake = $(evt.target).closest("li");
    const $cupcakeId = $cupcake.attr("id");

    const response = await cupcakesList.deleteCupcake($cupcakeId);
    $cupcake.remove();
  }
});
