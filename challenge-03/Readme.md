# challenge 3

### how to run
- clone this [repository](https://github.com/hasyimashari/binar-challenge.git)
- go to challenge-03 folder
- install dependecies `npm i`
- run `npm run start`

### end point
create an http server with [express js](https://expressjs.com/) with end point:
- GET /
- GET /cars
- GET /cars/:id
- POST /cars
- PUT /cars/:id
- DELETE /cars/:id

### postman documentation
- [api documentaion](https://www.postman.com/mission-observer-52095416/workspace/binar-challenge/collection/29693475-74147dde-9da1-4b27-8a90-6543eb1c9b17?action=share&creator=29693475)

### database
input database from json file
- databases is json with array of objects
- unfiltered data
``` JSON
[
      {
    "id": "6e2bc663-5197-441a-957b-bc75e4a2da7c",
    "plate": "DBH-3491",
    "manufacture": "Ford",
    "model": "F150",
    "image": "./images/car01.min.jpg",
    "rentPerDay": 200000,
    "capacity": 2,
    "description": " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
    "availableAt": "2022-03-23T15:49:05.563Z",
    "transmission": "Automatic",
    "available": true,
    "type": "Sedan",
    "year": 2022,
    "options": [
      "Cruise Control",
      "Tinted Glass",
      "Tinted Glass",
      "Tinted Glass",
      "AM/FM Stereo"
    ],
    "specs": [
      "Brake assist",
      "Leather-wrapped shift knob",
      "Glove box lamp",
      "Air conditioning w/in-cabin microfilter",
      "Body color folding remote-controlled pwr mirrors",
      "Dual-stage front airbags w/occupant classification system"
    ]
  }
]
```

- filtering data
``` JavaScript
cars.map( ({plate, manufacture, model, transmission, available, type, year, options, specs, ...rest}) => rest)

```

- filtered data:
``` JSON
[
      {
    "id": "6e2bc663-5197-441a-957b-bc75e4a2da7c",
    "image": "./images/car01.min.jpg",
    "rentPerDay": 200000,
    "capacity": 2,
    "description": " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
    "availableAt": "2022-03-23T15:49:05.563Z"
  }
]
```
