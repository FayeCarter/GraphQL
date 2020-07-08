import { RESTDataSource } from 'apollo-datasource-rest';
require("dotenv").config();

export class NewYorkTimesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://hacker-news.firebaseio.com/v0/";
  }

  articleReducer({ id, byline, url, published_date, title } = {}) {
    return {
      id: `nyt-${id}`,
      title,
      author: byline,
      url,
      time: published_date,
      source: "New York Times"
    }
  }

  async getAllArticles() {
    const result = await this.get(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.NYT_TOKEN}`
    )
    return result?.results?.map(article => this.articleReducer(article));
  }
  
}

