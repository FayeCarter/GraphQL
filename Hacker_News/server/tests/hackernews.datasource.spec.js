import { HackerNewsAPI } from "../datasources/hackernews";
import { 
  emptyReducerReturnValue, 
  getAllArticleIdsStub, 
  getArticlePreReducerStub, 
  getArticlePostReducerStub 
} from '../fixtures/hackernews';

const datasource = new HackerNewsAPI();
datasource.get = jest.fn();

describe("[HackerNewsAPI.articleReducer]", () => {
  it("transforms using the article reducer", () => {
    expect(datasource.articleReducer(getArticlePreReducerStub)).toEqual(
      getArticlePostReducerStub
    )
  });

  it("doesn't transform using the article reducer if no article passed to it", () => {
    expect(datasource.articleReducer()).toEqual(emptyReducerReturnValue)
  });
});