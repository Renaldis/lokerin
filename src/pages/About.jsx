function About() {
  return (
    <section className="bg-slate-100 flex flex-col-reverse md:flex-row w-full p-5">
      <div className="w-full md:w-1/2 md:p-5 md:mt-10 mt-5">
        <h1 className="text-xl text-center md:text-start font-bold text-blue-500 mb-2">
          Tentang Lokerin
        </h1>
        <p className="w-[95%] d:w-[80%] text-center md:text-start">
          <span className="font-semibold">Lokerin</span> adalah aplikasi
          inovatif yang memudahkan pencari kerja di Indonesia untuk menemukan
          lowongan pekerjaan yang sesuai dengan keahlian dan minat mereka.
          Dengan tampilan yang user-friendly dan fitur pencarian yang efisien,
          Lokerin menyediakan akses langsung ke ribuan lowongan pekerjaan dari
          berbagai industri dan perusahaan terkemuka. Aplikasi ini memberikan
          pengalaman pencarian kerja yang lebih cepat, lebih mudah, dan lebih
          terorganisir.
        </p>
      </div>
      <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center">
        <img
          className="w-60 h-60 md:w-96 md:h-96"
          src="https://i.pinimg.com/736x/39/ea/d6/39ead63b3820b30f3b183175f70e1d75.jpg"
          alt="HeroSiniLoker.png"
        />
      </div>
    </section>
  );
}

export default About;
