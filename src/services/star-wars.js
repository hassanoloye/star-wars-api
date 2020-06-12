import _ from "lodash";

import RequestService from './request';
import {centimetersToFeetAndInches} from "../utils/converter"

const config = require("config");

const request = new RequestService({baseUrl: config.starWarsApiUrl})
const filmSortFields = [
  'title'
]

export default class StarWarsService {

  constructor() {
  }

  static async getFilms() {
    const response = await request.get('/films')
    return {
      ...response,
      results: _.orderBy(_.map(response.results, StarWarsService.formatFilmRecord), filmSortFields)
    }
  }

  static async getCharacters(gender, orderBy) {
    const response = await request.get('/people');
    let results = response.results;

    if (gender) {
      results = _.filter(response.results, {gender: gender.toLowerCase()})
    }

    if (orderBy) {
      const orderingType = orderBy.startsWith("-") ? ['desc'] : ['asc'];
      const orderingField = orderBy.replace("-", "");

      results = _.orderBy(results, [orderingField], [orderingType])
    }

    return {
      ...response,
      results,
      results_count: results.length,
      results_total_height: StarWarsService.formatCharacterHeight(_.sumBy(results, (record) => _.toNumber(record.height)))
    };
  }

  static formatFilmRecord(record) {
    return {
      id: StarWarsService.getFilmIdFromUrl(record.url),
      ..._.pick(record, ['title', 'opening_crawl', 'release_date', 'created', 'edited', 'url']),
      comments_count: 0
    }
  }

  static getFilmIdFromUrl(recordUrl) {
    return _.toNumber(recordUrl.match(/(\d)+/g)[0])
  }

  static formatCharacterHeight(characterHeight) {
    return `${characterHeight} cm (${centimetersToFeetAndInches(characterHeight)})`
  }
}
