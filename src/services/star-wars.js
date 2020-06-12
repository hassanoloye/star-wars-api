import _ from "lodash";

import RequestService from './request';

const config = require("config");

const request = new RequestService({ baseUrl: config.starWarsApiUrl })
const filmSortFields = [
  'title',
]

export default class StarWarsService {

  constructor() {
  }

  static async getFilms() {
    const response = await request.get('/films')
    return {
      ...response,
      results: _.sortBy(_.map(response.results, StarWarsService.formatFilmRecord), filmSortFields)
    }
  }

  static formatFilmRecord(record) {
    return {
      id: StarWarsService.getFilmIdFromUrl(record.url),
      ..._.pick(record, ['title', 'opening_crawl', 'release_date', 'created', 'edited', 'url']),
      comments_count: 0,
    }
  }

  static getFilmIdFromUrl(recordUrl) {
    return _.toNumber(recordUrl.match(/(\d)+/g)[0])
  }
}
