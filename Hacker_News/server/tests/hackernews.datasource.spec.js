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

describe("[HackerNewsAPI.getArticleByIds]", () => {
  it("gets an array of articles from the HackerNewsAPI", async () => {
    datasource.get.mockReturnValue(getArticlePreReducerStub);
    const response = await datasource.getArticleByIds([21168364]);

    expect(response).toEqual([getArticlePostReducerStub]);
    expect(datasource.get).toHaveBeenCalled();
    expect(datasource.get).toBeCalledWith('item/21168364.json');
  });
});

describe("[HackerNewsAPI.getAllArticleIds]", () => {
  it("gets an array of articles from the hacker news api", async () => {
    datasource.get.mockReturnValue([getAllArticleIdsStub]);
    const response = await datasource.getAllArticleIds([21168364]);

    expect(response).toEqual([getAllArticleIdsStub]);
    expect(datasource.get).toHaveBeenCalled();
    expect(datasource.get).toBeCalledWith('topstories.json');
  });
});

describe("[HackerNewsAPI.getAllArticles]", () => {
  it("gets an array of all articles from the hacker news api", async () => {
    datasource.getAllArticleIds = jest.fn();
    datasource.getAllArticleIds.mockReturnValue(getAllArticleIdsStub);
    datasource.get.mockReturnValue(getArticlePreReducerStub);
    const response = await datasource.getAllArticles();

    expect(response).toEqual([getArticlePostReducerStub]);
    expect(datasource.get).toHaveBeenCalled();
    expect(datasource.get).toBeCalledWith('item/21168364.json');
  });
});