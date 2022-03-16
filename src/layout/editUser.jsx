import React, { useState, useEffect } from "react";
import api from "../api";
import PropTypes from "prop-types";
import { validator } from "../utils/validator";
import TextField from "../components/common/form/textField";
import SelectField from "../components/common/form/selectField";
import RadioField from "../components/common/form/radioField";
import MultiSelectField from "../components/common/form/multiSelectField";
import { useParams, useHistory } from "react-router-dom";

const EditUser = ({ match }) => {
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "",
    qualities: []
  });

  const { userId } = useParams();
  const history = useHistory();

  const transformQualities = (data) => {
    return data.map((item) => ({ label: item.name, value: item._id }));
  };

  const getQualities = (data) => {
    const qualitiesArray = [];
    for (const item in data) {
      for (const quality in qualities) {
        if (data[item].value === qualities[quality]._id) {
          qualitiesArray.push(qualities[quality]);
        }
      }
    }
    return qualitiesArray;
  };

  useEffect(() => {
    setIsLoading(true);
    api.users
      .getById(userId)
      .then(({ profession, qualities, ...data }) =>
        setData((prevState) => ({
          ...prevState,
          ...data,
          qualities: transformQualities(qualities),
          profession: profession._id
        }))
      );
    api.qualities.fetchAll().then((data) => setQualities(data));
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

  const getProfessionById = (id) => {
    for (const item in professions) {
      const profession = professions[item];
      if (profession._id === id) return profession;
    }
  };

  const validatorConfig = {
    name: {
      isRequired: { message: "Укажите Ваше имя" }
    },
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Email введен некорректно" }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { profession, qualities } = data;
    const isValid = validate();
    if (!isValid) return;
    const submittedData = {
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    };

    api.users
      .update(userId, submittedData)
      .then((data) => history.push(`/users/${data._id}`));
  };
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  return (
    <div className="container mt-5 shadow">
      {!isLoading ? (
        <div className="row">
          <div className="col-md-6 offset-md-3 p-4">
            <h3 className="mb-4">Edit User</h3>
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                label="Имя"
                value={data.name}
                error={errors.name}
                onChange={handleChange}
              />
              <TextField
                name="email"
                label="Электронная почта"
                value={data.email}
                error={errors.email}
                onChange={handleChange}
              />
              <SelectField
                label="Выберите Вашу профессию"
                options={professions}
                onChange={handleChange}
                defaultOption="Choose..."
                name="profession"
                value={data.profession}
              />
              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "Other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите Ваш пол"
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Выберите Ваши качества"
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary mx-auto w-100"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
};

EditUser.propTypes = {
  match: PropTypes.object.isRequired
};

export default EditUser;
