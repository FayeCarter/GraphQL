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

describe("[HackerNewsAPI.getArticle]", () => {
  it("gets a single article from the hacker news api", async () => {
    datasource.get.mockReturnValue(getArticlePreReducerStub);
    const response = await datasource.getArticle(21168364);

    expect(response).toEqual(getArticlePostReducerStub);
    expect(datasource.get).toHaveBeenCalled();
    expect(datasource.get).toBeCalledWith('item/21168364.json');
  });
});