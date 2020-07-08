import { NewYorkTimesAPI } from "../datasources/newyorktimes";
import { 
  emptyReducerReturnValue, 
  getArticlePreReducerStub, 
  getArticlePostReducerStub 
} from '../fixtures/newyorltimes';

const datasource = new NewYorkTimesAPI();
datasource.get = jest.fn();

describe("[NewYorkTimesAPI.articleReducer]", () => {
  it("transforms using the article reducer", () => {
    expect(datasource.articleReducer(getArticlePreReducerStub)).toEqual(
      getArticlePostReducerStub
    )
  });
});
