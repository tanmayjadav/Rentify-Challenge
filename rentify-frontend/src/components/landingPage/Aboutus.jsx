import logo from "../../../public/logo.png"

const stats = [
    { label: 'Founded', value: '2023' },
    { label: 'Clients Served', value: '3K+' },
    { label: 'Campaigns Launched', value: '1k+' },
    { label: 'Property Sold', value: '$ 100+ million' },
  ];
  
  export default function Aboutus() {
    return (
      <div className="py-10 sm:py-20">
        <div className="lg:mx-auto lg:max-w-7xl  lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
          <div className="relative sm:py-16 lg:py-0">
            <div aria-hidden="true" className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
              <div className="absolute z-[-1] inset-y-0 right-1/2 w-full rounded-r-3xl lg:right-72" />
              <svg
                className="absolute top-8 z-[-1] left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                width={404}
                height={392}
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={392} fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
              </svg>
            </div>
            <div className="relative z-[-1] mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
              {/* Testimonial card*/}
              <div className="relative z-[-1] pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
                <img
                  className="absolute z-[-1]  inset-0 h-full w-full object-cover"
                  src="https://media.istockphoto.com/id/1311737046/photo/for-rent-sign-outside-house.webp?b=1&s=170667a&w=0&k=20&c=fRnk8ssp6odhfmJp2uwI6c56wy_Eu5Nuzyh6LTXfgjk="
                  alt=""
                />
                <div className="absolute z-[-1] inset-0 bg-primary/10 dark:bg-primary/60  mix-blend-multiply" />
                <div className="absolute z-[-1] inset-0 bg-gradient-to-t from-primary/70 dark:from-gray-900 via-primary/40 dark:via-gray-500 opacity-90" />
                <div className="relative px-8">
                  {/* <div>
                    <img
                      className="ml-[-20px] h-28"
                      src={logo}
                      alt="SevaSetu"
                    />
                  </div> */}
                  <blockquote className="mt-4">
                    <div className="relative z-[-1] text-2xl font-medium text-white/90 dark:text-foreground md:flex-grow">
                      <svg
                        className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="relative">
                      Renting is about finding a place that feels like home, a canvas for life's moments, and the freedom to explore new neighborhoods, embracing change and creating cherished memories.
                      </p>
                    </div>
  
                    <footer className="mt-4">
                      <p className=" text-2xl font-bold text-foreground/90">Tanmay Jadav, CEO at Rentify</p>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
  
          <div className="relative z-[-1] mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
            {/* Content area */}
            <div className="pt-12 sm:pt-16 lg:pt-20">
              <h2 className="text-3xl text-foreground/90 font-extrabold tracking-tight sm:text-4xl">
                Making Convinent to sell and Find Home
              </h2>
              <div className="mt-6 text-foreground/70 space-y-6">
                <p className="text-lg">
                  Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique
                  pellentesque. Blandit amet, sed aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel
                  porttitor vitae ut. Amet vitae fames senectus vitae.
                </p>
                <p className="text-base leading-7">
                  Rhoncus nisl, libero egestas diam fermentum dui. At quis tincidunt vel ultricies. Vulputate aliquet
                  velit faucibus semper. Pellentesque in venenatis vestibulum consectetur nibh id. In id ut tempus
                  egestas. Enim sit aliquam nec, a. Morbi enim fermentum lacus in. Viverra.
                </p>
              </div>
            </div>
  
            {/* Stats section */}
            <div className="mt-10">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-t-2 border-gray-100 pt-6">
                    <dt className="text-base font-medium text-gray-500">{stat.label}</dt>
                    <dd className="text-3xl font-extrabold tracking-tight text-foreground/80">{stat.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10">
                <a href="#" className="text-base font-medium text-primary">
                  {' '}
                  Learn more about our services <span aria-hidden="true">&rarr;</span>{' '}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }