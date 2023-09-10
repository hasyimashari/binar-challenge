class App {
  constructor() {
    this.carContainerElement = document.getElementById("cars-container");

    this.form = document.getElementById("search-form");
  }

  async init() {
    // await this.load();

    // Register click listener
    this.form.onsubmit = this.run;
  }

  getFilter () {

    const formData = new FormData(this.form);
    const data_formData = Object.fromEntries(formData.entries());

    const datetime = new Date(`${data_formData['tanggal']} ${data_formData['waktu-jemput']}`);
    const capacity = data_formData['jumlah-penumpang'];

    const filter = (i) => i.available && i.capacity >= capacity && i.availableAt >= datetime;

    return filter;
  }

  run = async (e) => {

    e.preventDefault();

    this.clear();

    const cars = await Binar.listCars(this.getFilter());
    Car.init(cars);

    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  // async load() {

  //   const cars = await Binar.listCars(filter);
  //   Car.init(cars);
  // }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
