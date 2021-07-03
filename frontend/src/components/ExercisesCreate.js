import { useEffect, useState } from "react";
import apiCalls from "../services/apiCalls";
import { useNavigate } from "react-router-dom";

export default function ExercisesCreate() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    duration: "",
    intensity: "",
    image_url: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleAddExercise = async () => {
    console.log("wtf");
    const { data, error } = await apiCalls.saveExercise("exercises", {
      name: form.name,
      category: form.category,
      duration: form.duration,
      intensity: form.intensity,
      image_url: form.image_url,
    });

    if (data) {
      setSubmitted(true);
    }
    if (error) {
      setErrors((prevState) => ({ ...prevState, form: error }));
    }
  };

  useEffect(() => {
    if (submitted) {
      navigate("/exercises");
      setSubmitted(false);
    }
  }, [submitted, navigate]);

  return (
    <div>
      Add exercise
      {errors.form && <span className="error">{errors.form}</span>}
      <div>
        <div>
          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={form.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="category">category</label>
          <input
            type="text"
            name="category"
            placeholder="category"
            value={form.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="name">duration</label>
          <input
            type="text"
            name="duration"
            placeholder="duration"
            value={form.duration}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="name">intensity</label>
          <input
            type="text"
            name="intensity"
            placeholder="intensity"
            value={form.intensity}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="name">image_url</label>
          <input
            type="text"
            name="image_url"
            placeholder="image_url"
            value={form.image_url}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button onClick={handleAddExercise}> Save </button>
    </div>
  );
}
