import _ from "lodash";
import Sequelize from "sequelize"

import RequestService from './request';
import {centimetersToFeetAndInches} from "../utils/converter"
import {comment} from '../../db/models'

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
    const film_comments_count = await comment.unscoped().findAll({
      attributes: [
        'filmId',
        [Sequelize.fn('count', Sequelize.col('comment.id')), 'commentsCount']
      ],
      group: ['filmId'],
      raw: true,
    });

    const filmsToCommentsCountMap = _.mapValues(_.keyBy(film_comments_count, 'filmId'), 'commentsCount')
    return {
      ...response,
      results: _.orderBy(
        response.results.map((record) => this.formatFilmRecord(record, filmsToCommentsCountMap)),
        filmSortFields
      )
    }
  }

  static async getCharacters({gender, orderBy, filmId}) {
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

    results = results.map((record) => this.formatCharacterRecord(record))

    if (filmId) {
      results = results.filter(record => record.films_id.includes(_.toNumber(filmId)))
    }

    return {
      ...response,
      results,
      results_count: results.length,
      results_total_height: this.formatCharacterHeight(_.sumBy(results, (record) => _.toNumber(record.height)))
    };
  }

  static formatFilmRecord(record, filmsToCommentsCountMap) {
    const recordId = this.getRecordIdFromUrl(record.url)
    return {
      id: recordId,
      ..._.pick(record, ['title', 'opening_crawl', 'release_date', 'created', 'edited', 'url']),
      comments_count: _.toNumber(_.get(filmsToCommentsCountMap, recordId, 0))
    }
  }

  static formatCharacterRecord(record) {
    return {
      ...record,
      id: this.getRecordIdFromUrl(record.url),
      films_id: record.films.map(filmUrl => this.getRecordIdFromUrl(filmUrl))
    }
  }


  static getRecordIdFromUrl(recordUrl) {
    return _.toNumber(recordUrl.match(/(\d)+/g)[0])
  }

  static formatCharacterHeight(characterHeight) {
    return `${characterHeight} cm (${centimetersToFeetAndInches(characterHeight)})`
  }
}
