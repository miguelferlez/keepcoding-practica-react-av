const AdvertsNotFoundWarning = () => (
  <section className="">
    <div className="text-primary/50 mx-auto flex max-w-sm flex-col items-center px-4 text-center">
      <span className="material-symbols-outlined mb-2 !text-7xl !font-bold">
        robot_2
      </span>
      <h3 className="mb-2">These aren't the ads you're looking for.</h3>
      <p>
        It seems that we couldn't find what you wanted. Try changing the filters
        to see appointments.
      </p>
    </div>
  </section>
);

export default AdvertsNotFoundWarning;
