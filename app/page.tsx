import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-10 py-5 flex justify-between items-center">

          <div className="flex items-center gap-4">

            <Image
              src="/logo.png"
              alt="LFA Logo"
              width={90}
              height={90}
              priority
            />

            <div>
              <h1 className="font-bold text-3xl text-blue-700">
                Learning For All
              </h1>

              <p className="text-sm text-gray-500">
                AI-Powered Learning Support
              </p>
            </div>

          </div>

          <div className="hidden md:flex gap-10 text-lg font-semibold text-gray-700">

            <a href="#about" className="hover:text-blue-700 transition">
              About Us
            </a>

            <a href="#vision" className="hover:text-green-600 transition">
              Vision & Mission
            </a>

            <a href="#partners" className="hover:text-orange-500 transition">
              Partners
            </a>

            <a href="#contact" className="hover:text-blue-700 transition">
              Contact
            </a>

          </div>

        </div>
      </nav>

      {/* HERO */}

      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50">

        <div
          className="
            max-w-screen-2xl
            mx-auto
            px-12
            py-16
            grid
            md:grid-cols-2
            gap-8
            items-center
          "
        >

          {/* LEFT */}

          <div>

            <div
              className="
                inline-block
                bg-orange-100
                text-orange-600
                px-5
                py-2
                rounded-full
                font-semibold
                mb-8
              "
            >
              AI-Powered Early Learning Support
            </div>

            <h1 className="text-8xl md:text-9xl font-bold leading-tight">

              <span className="text-blue-700">
                Learning
              </span>{" "}

              <span className="text-green-600">
                For
              </span>{" "}

              <span className="text-orange-500">
                All
              </span>

            </h1>

            <p className="text-4xl mt-6 font-semibold text-gray-700">
              Early Identification.
              <br />
              Timely Support.
            </p>

            <p className="mt-6 text-2xl text-gray-600 max-w-3xl leading-10">
              Empowering teachers to identify learning risks early
              and provide targeted interventions before academic
              gaps become permanent.
            </p>

            <div className="flex flex-wrap gap-5 mt-12">

              <a
                href="/assessment"
                className="
                  bg-orange-500
                  hover:bg-orange-600
                  transition
                  text-white
                  px-12
                  py-5
                  text-lg
                  rounded-xl
                  font-semibold
                  shadow-lg
                "
              >
                Try Live Demo
              </a>

              <a
                href="/dashboard"
                className="
                  border-2
                  border-blue-600
                  text-blue-600
                  hover:bg-blue-600
                  hover:text-white
                  transition
                  px-12
                  py-5
                  text-lg
                  rounded-xl
                  font-semibold
                "
              >
                Demo Dashboard
              </a>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex justify-center">

            <Image
              src="/logo.png"
              alt="LFA"
              width={650}
              height={650}
              priority
              className="
                drop-shadow-2xl
                hover:scale-105
                transition
                duration-300
              "
            />

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="px-8 relative z-10 -mt-8">

        <div
          className="
            max-w-screen-xl
            mx-auto
            bg-white
            rounded-3xl
            shadow-2xl
            p-12
            grid
            md:grid-cols-4
            gap-8
          "
        >

          <div className="text-center">
            <h3 className="text-6xl font-bold text-blue-700">
              200+
            </h3>
            <p className="mt-2 text-gray-600">
              Students Assessed
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-6xl font-bold text-green-600">
              3+
            </h3>
            <p className="mt-2 text-gray-600">
              Schools Reached
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-6xl font-bold text-orange-500">
              15+
            </h3>
            <p className="mt-2 text-gray-600">
              Teachers Empowered
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-6xl font-bold text-blue-700">
              92%
            </h3>
            <p className="mt-2 text-gray-600">
              Early Risk Detection
            </p>
          </div>

        </div>

      </section>

      {/* ABOUT */}

      <section
        id="about"
        className="max-w-screen-xl mx-auto px-8 py-24"
      >

        <h2 className="text-5xl font-bold text-blue-700 mb-8">
          About Us
        </h2>

        <p className="text-xl text-gray-700 leading-10 max-w-4xl">
          Learning For All (LFA) helps schools identify
          students who may be at risk of learning
          difficulties through structured classroom
          observations, standardized assessments,
          and AI-assisted intervention planning.
        </p>

      </section>

      {/* VISION */}

      <section
        id="vision"
        className="bg-blue-50 py-24"
      >

        <div className="max-w-screen-xl mx-auto px-8">

          <h2 className="text-5xl font-bold text-green-600 mb-8">
            Vision & Mission
          </h2>

          <p className="text-xl text-gray-700 leading-10 max-w-4xl">
            Our vision is a future where every child
            receives support before learning gaps
            become barriers.
          </p>

          <p className="mt-8 text-xl text-gray-700 leading-10 max-w-4xl">
            Our mission is to provide affordable,
            scalable and AI-powered early learning
            support tools to schools across India.
          </p>

        </div>

      </section>

      {/* PARTNERS */}

      <section
        id="partners"
        className="max-w-screen-xl mx-auto px-8 py-24"
      >

        <h2 className="text-5xl font-bold text-orange-500 mb-12">
          Partnered Schools & Organisations
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white shadow-xl rounded-xl p-10">
            <a href="https://www.instagram.com/newlightmodernsensecschool/">
  <img src="/new_light.jpg" alt="New Light School, Asr"/>
</a>
          </div>

          <div className="bg-white shadow-xl rounded-xl p-10">
            <a href="https://www.facebook.com/navbharathighschoolasr1950/">
  <img src="/nav_bharat.jpg" alt="Nav Bharat School, Asr"/>
</a>
          </div>


       <div className="bg-white shadow-xl rounded-xl p-10">
            <a href="https://www.facebook.com/p/Govt-Girls-Secondary-school-Putlighar-Amritsar-100071951491058/">
  <img src="/GSSSS.jpg" alt="GSSSS Putlg School, Asr"/>
</a>
          </div>

        </div>

      </section>

      {/* CONTACT */}

      <section
        id="contact"
        className="bg-slate-900 text-white py-24"
      >

        <div className="max-w-screen-xl mx-auto px-8">

          <h2 className="text-5xl font-bold mb-8">
            Contact Us
          </h2>

          <p className="text-xl">
            LFA_LearningForALL@outlook.com
          </p>

          <p className="mt-3 text-xl">
            Amritsar, India
          </p>

        </div>

      </section>

    </main>
  );
}