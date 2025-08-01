import { Link } from "react-router";

const AdvertsEmptyWarning = () => (
  <section>
    <div className="text-primary/50 mx-auto flex w-full max-w-sm flex-col items-center justify-center px-4">
      <span className="material-symbols-outlined mb-2 !text-7xl !font-bold">
        orders
      </span>
      <h3 className="mb-2 text-lg">No adverts... yet.</h3>
      <p className="mb-4">Why don't you add one right now?</p>
      <Link to="/adverts/new" className="btn btn-primary">
        <span className="material-symbols-outlined flex items-center">add</span>
        <p className="-mb-0.5">New advert</p>
      </Link>
    </div>
  </section>
);

export default AdvertsEmptyWarning;
