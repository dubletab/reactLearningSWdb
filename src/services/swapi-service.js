
export default class SwapiService {

    _apiBase = 'https://www.swapi.tech/api'
  
    async getResources(url){
      const res = await fetch(`${this._apiBase}${url}`);
    
      if(!res.ok){
        throw new Error(`could not fetch ${url}, received ${res.status}`)
      }
    
      const body = await res.json();
      return body;
    }
  
    async getAllPersons(){
      const res = await this.getResources(`/people/`);
      return res.results.map(this._transformPerson);
    }
  
    async getPerson(id){
      const person = await this.getResources(`/people/${id}`);
      return this._transformPerson(person);
    }
  
    async getAllPlanets(){
      const res = await this.getResources(`/planets/`);
      return res.results.map(this._transformPlanet);
    }
  
    async getPlanet(id){
      const planet = await this.getResources(`/planets/${id}`);
      return this._transformPlanet(planet);
    }
  
    async getAllStarships(){
      const res = await this.getResources(`/starships/`);
      return res.results.map(this._transformStarship);
    }
  
    async getStarship(id){
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
  