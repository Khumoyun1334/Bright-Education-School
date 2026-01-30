import { courses } from "../data/courses";
import { Link } from "react-router-dom";

const Courses = () => {
  return (
    <section id="courses" className="bg-gray-100 py-20 px-5">
      <h2 className="text-3xl font-bold text-center mb-12">Kurslarimiz</h2>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {courses.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img src={c.img} className="h-44 w-full object-cover" />

            <div className="p-6 text-center">
              <h3 className="text-xl font-bold mb-3">{c.title}</h3>
              <p className="text-gray-600 mb-4">{c.description}</p>

              <Link
                to={`/courses/${c.id}`}
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full"
              >
                Batafsil
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
