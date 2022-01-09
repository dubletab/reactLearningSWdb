
export default class SwapiService {

    _apiBase = 'https://www.swapi.tech/api'
  
    getResources = async (url) => {
      const res = await fetch(`${this._apiBase}${url}`);
    
      if(!res.ok){
        throw new Error(`could not fetch ${url}, received ${res.status}`)
      }
    
      const body = await res.json();
      // console.log(body);
      return body;
    }
  
    getAllPersons = async () => {
      const res = await this.getResources(`/people/`);
      return res.results.map((el) => {
        return {id: el.uid, name: el.name}});
    }
  
    getPerson = async (id) => {
      const person = await this.getResources(`/people/${id}`);
      return this._transformPerson(person);
    }
  
    getAllPlanets = async () =>{
      const res = await this.getResources(`/planets/`);
      console.log(res);
      return res.results.map((el) => {
        return {id: el.uid, name: el.name}});
    }
  
    getPlanet = async (id) =>{
      const planet = await this.getResources(`/planets/${id}`);
      return this._transformPlanet(planet);
    }
  
    getAllStarships = async () =>{
      const res = await this.getResources(`/starships/`);
      return res.results.map((el) => {
        return {id: el.uid, name: el.name}});
    }
  
    getStarship = async (id) =>{
      const starship = await this.getResources(`/starships/${id}`);
      return this._transformStarship(starship);
    }

    _transformPlanet(planet){
      const {name, population, rotation_period, diameter} = planet.result.properties;
      return {
        name: name,
        population: population,
        rotationPeriod: rotation_period,
        diameter: diameter,
        id: planet.result.uid
      }
    }

    _transformPerson(person){
      const {name, gender, birth_year, eye_color} = person.result.properties;
      return {
        name: name,
        gender: gender,
        birthYear: birth_year,
        eyeColor: eye_color,
        id: person.result.uid
      }
    }

    _transformStarship(starship){
      const {name, model, manufacturer, cost_in_credits, length, crew, passengers, cargo_capacity} = starship.result.properties;
      return {
        name: name,
        model: model,
        manufacturer: manufacturer,
        costInCredits: cost_in_credits,
        length: length,
        crew: crew,
        passengers: passengers,
        cargoCapacity: cargo_capacity,
        id: starship.result.uid
      }
    }
  }
  
  
//   const swapi = new SwapiService;
  
//   swapi.getAllStarships()
//     .then((body) => {
//       body.forEach(element => {
//         console.log(element.name);
//       });
//     });
  
//   swapi.getPerson(9)
//     .then((body) => {
//             console.log(body.result.properties.name);
//       });
  