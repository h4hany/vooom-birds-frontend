import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() {
  }

  paramsBuilder(object) {
    const self = this;
    const result = {};
    for (const [key, value] of Object.entries(object)) {
      result[self.toSnakeCase(key)] = value;
    }
    return result;
  }

  getNumberFromString(str) {
    return str.match(/\d+/)[0];
  }

  jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
  }

  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  isEmptyString(str) {
    return (!str || 0 === str.length);
  }

  toSnakeCase(str) {
    return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(x => x.toLowerCase()).join('_');
  }

  toCamelCase(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }

  validate(obj) {
    const errorObject = obj;
    for (const [key, value] of Object.entries(obj)) {
      if (value === undefined || value === null || value === '') {
        errorObject[key] = {
          error: key + ' is blank '
        };
      }
    }
    return errorObject;
  }

  isValid(obj): boolean {
    const arrOfValid = [];
    for (const [key, value] of Object.entries(obj)) {
      if (value === undefined || value === null || value === '') {
        arrOfValid.push(false);
      }
    }
    return !arrOfValid.includes(false);
  }
}
