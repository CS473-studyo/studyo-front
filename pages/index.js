import Header from 'components/header.js';
import SearchIcon from '@material-ui/icons/Search';

export default function Home() {
  const a = async () => {};

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: 'NanumSquare',
      }}
      className="d-flex flex-column"
    >
      <Header />
      <div>
        <img
          src="CourseHeaderBackground.png"
          alt="course header background"
          height="150"
          width="1440"
        />
      </div>
      <div className="container">
        <div className="mt-5 pt-5 mb-3 title-text">My Courses</div>
        <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
          <div className="input-group">
            <input
              type="search"
              placeholder="Find class by code or name"
              aria-describedby="button-addon1"
              className="body-text form-control border-0 bg-light"
            />
            <div className="input-group-append">
              <button
                id="button-addon1"
                type="submit"
                className="btn btn-link text-primary"
              >
                <SearchIcon></SearchIcon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
