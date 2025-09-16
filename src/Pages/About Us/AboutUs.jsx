import { motion } from "framer-motion";
import Navbar from "../Home/Navbar";
import AboutSection from "../Home/AboutSection";

export default function AboutUs() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-primary/10 py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary mb-4"
        >
          About <span className="text-primary">Our Company</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl"
        >
          We are a trusted consultancy specializing in{" "}
          <span className="text-secondary-dark font-medium">
            tender management, project bidding, and government contracts
          </span>
          , helping businesses achieve growth through successful procurement
          strategies.
        </motion.p>
      </section>

      {/* Our Story */}
      <section className="py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <motion.img
            src="https://picsum.photos/600/400?random=1"
            alt="Our Team"
            className="rounded-2xl shadow-lg w-full object-cover h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          />
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-secondary mb-4">
              Our Story
            </h2>
            <p className="text-gray leading-relaxed mb-4 text-sm sm:text-base md:text-lg lg:text-lg">
              Founded in 2015, we started with a vision to simplify the tender
              process for businesses. Over the years, we have successfully
              assisted more than{" "}
              <span className="text-primary font-semibold">500+</span> companies
              in winning government and private contracts.
            </p>
            <p className="text-gray leading-relaxed text-sm sm:text-base md:text-lg lg:text-lg">
              With expertise in tender documentation, bid submission, and
              compliance, we ensure our clients have the best chance of success
              in every project they pursue.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-light py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-3">
              Our Mission
            </h3>
            <p className="text-gray leading-relaxed text-sm sm:text-base md:text-lg lg:text-lg">
              To empower businesses of all sizes by providing expert guidance in
              tender bidding, ensuring transparency, efficiency, and maximum
              success rates in project acquisitions.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-3">
              Our Vision
            </h3>
            <p className="text-gray leading-relaxed text-sm sm:text-base md:text-lg lg:text-lg">
              To become the leading consultancy in India for tender management,
              creating opportunities for businesses to grow by bridging the gap
              between entrepreneurs and large-scale projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-secondary mb-8">
            Why Choose <span className="text-primary">Us?</span>
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Expertise",
                desc: "Over 8+ years of experience in tender management and project consultancy.",
              },
              {
                title: "Proven Success",
                desc: "Helped 500+ clients secure government and private contracts successfully.",
              },
              {
                title: "End-to-End Support",
                desc: "From documentation to final submission, we handle everything for you.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl shadow-md"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-primary mb-2">
                  {item.title}
                </h4>
                <p className="text-gray text-sm sm:text-base md:text-lg lg:text-lg">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 text-center">
        <motion.h2
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let’s Grow Together!
        </motion.h2>
        <p className="max-w-2xl mx-auto mb-6 text-sm sm:text-base md:text-lg lg:text-xl">
          Partner with us to simplify your tender process and achieve more
          project wins. Our team is ready to guide you at every step.
        </p>
        <a
          href="/contact"
          className="inline-block px-5 sm:px-6 md:px-8 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-primary/10 transition"
        >
          Contact Us
        </a>
      </section>

      <AboutSection />
    </div>
  );
}
