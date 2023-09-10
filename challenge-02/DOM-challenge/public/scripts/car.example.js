class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
    <div class="card-car__container d-flex flex-column">
      <div class="car-img__container d-flex">
        <img src="${this.image}" alt="${this.manufacture}" class="car-img img-fluid">
      </div>

      <div class="desc-img__container d-flex flex-column">
        <p style="margin: 0; padding: 0;">
            ${this.manufacture} ${this.model} / ${this.type}
        </p>

        <h6 style="margin: 0; padding: 0;">
            RP ${this.rentPerDay} / hari
        </h6>

        <p style="margin: 0; padding: 0;">
            ${this.description}
        </p>

        <div class="d-flex gap-2">
            <img src="icon/users_icon.png" alt="users_icon" class="img-fluid">
            ${this.capacity} orang
        </div>
        <div class="d-flex gap-2">
            <img src="icon/settings_icon.png" alt="settings_icon" class="img-fluid">
            ${this.transmission}
        </div>
        <div class="d-flex gap-2">
            <img src="icon/calendar_icon.png" alt="calendar_icon" class="img-fluid">
            Tahun ${this.year}
        </div>

        <button class="btn btn-success" style="background-color: #5CB85F;">Pilih Mobil</button>
      </div>
    </div>
    `;
  }
}
