import { useParams } from "react-router-dom";
import { courses } from "../data/courses";

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return <p className="text-center mt-40">Kurs topilmadi 😕</p>;
  }

  return (
    <section className="pt-32 pb-20 px-5 max-w-5xl mx-auto">
      <img
        src={course.img}
        className="w-full h-72 object-cover rounded-2xl mb-8"
      />

      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-600 mb-6">{course.description}</p>

      <div className="bg-gray-100 rounded-2xl p-6 space-y-3">
        <p><strong>Kurs davomiyligi:</strong> {course.duration}</p>
        <p><strong>Darslar:</strong> {course.lessons}</p>
        <p><strong>Oylik to‘lov:</strong> {course.price}</p>
      </div>
    </section>
  );
};

export default CourseDetail;
