import "./globals.css"
const Page = () => {
  return (
    <main className="flex min-h-screen tracking-wider flex-col items-center justify-between p-4 md:p-14 lg:p-24">
      <section className="bg-cars rounded-lg mb-10">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl font-pBold text-black mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              CARS
            </h1>
            <p className="max-w-2xl mb-6 font-pMedium font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              Claims Adjustment & Reporting System
            </p>
            <a
              href="/auth/login"
              className="inline-flex mr-2 items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-black rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
            >
              Download App
            </a>
            <a
              href="/auth"
              className="inline-flex ml-2 items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-black rounded-lg hover:bg-gray-100"
            >
              Admin Login
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="/cars.png" alt="logo" className="" />
          </div>
        </div>
      </section>
    </main>
  );
};
export default Page;
