import { Link } from "react-router-dom";
import bannerImg from "../assets/heroSiniLoker.png";
import { cardAbout, jobListings } from "../data";

function Home() {
  return (
    <section id="home" className="">
      <article className="banner lg:h-screen bg-slate-50 pb-10 lg:pb-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute"
        >
          <path
            fill="#a2d9ff"
            fillOpacity="0.1"
            d="M0,256L40,245.3C80,235,160,213,240,218.7C320,224,400,256,480,245.3C560,235,640,181,720,160C800,139,880,149,960,138.7C1040,128,1120,96,1200,101.3C1280,107,1360,149,1400,170.7L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
        <div className="grid lg:grid-cols-2 pt-15">
          <div className="banner flex justify-center flex-col mt-20 lg:-mt-10 gap-2">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold ms-10 text-slate-600">
              Temukan Pekerjaan Impianmu
            </span>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold ms-10 text-slate-600">
              Dengan <span className="text-blue-500">Lokerin</span>
            </span>
            <br />
            <span className="text-lg lg:text-xl font-semibold ms-10 text-slate-600">
              Dapatkan pekerjaan cocok sesuai dengan profil Anda hari ini
            </span>
            <Link
              to="/job-vacancy"
              className="bg-blue-600 flex items-center justify-center text-white rounded-full w-30 h-10 ms-10 hover:bg-blue-400 cursor-pointer"
            >
              Lowongan
            </Link>
          </div>
          <div className="bannerImage hidden lg:flex md:mt-20 lg:mt-5">
            <img src={bannerImg} alt="Banner-Image" />
          </div>
        </div>
      </article>
      {/* card */}
      <article>
        <div className="card-section px-10 pb-20 pt-10">
          <h1 className="lg:text-2xl text-xl font-semibold text-slate-600 text-center mb-5">
            Mengapa mencari pekerjaan di Lokerin?
          </h1>
          <div className="flex justify-center gap-5 flex-wrap md:pb-10">
            {cardAbout.map((res) => {
              return (
                <div
                  key={res.id}
                  className="card border lg:w-[350px] sm:w-[400px] w-[500px] border-slate-100 shadow-sm rounded-lg p-5 bg-white"
                >
                  <div className="image flex justify-center pt-5">
                    <img src={res.image} alt={res.title} className="w-25" />
                  </div>
                  <div className="flex flex-col items-center mt-5 px-4 mx-auto">
                    <h3 className="text-lg">{res.title}</h3>
                    <p className="text-base text-center">{res.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </article>
      {/* mitra */}
      <article id="mitraSection" className="bg-white pb-10">
        <h1 className="text-xl font-semibold text-black text-center ml-8">
          Dipercaya 100+ Mitra Terpercaya
        </h1>
        <div className="flex flex-wrap w-[80%] mx-auto items-center bg-white gap-5 justify-center mb-3">
          {jobListings !== null &&
            jobListings.map((res, idx) => {
              return (
                <img
                  key={idx}
                  src={res.company_image_url}
                  alt={res.company_name}
                  className="w-20 md:w-32 lg:w-40"
                />
              );
            })}
        </div>
        <p className="text-sm font-normal text-black ml-8 p-1 flex justify-center items-center md:text-xl ">
          dan <strong className="px-2">20+</strong> perusahaan lainnya
        </p>
      </article>
    </section>
  );
}

export default Home;
