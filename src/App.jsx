import { useState } from "react";
import "./App.css";

const App = () => {
  const [gender, setGender] = useState("male");
  const [inputs, setInputs] = useState({
    boyun: "",
    bel: "",
    boy: "",
    kalça: "",
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const calculateBodyFat = () => {
    if (gender === "male") {
      const { boyun, bel, boy } = inputs;
      const bodyFat =
        86.01 * Math.log10(bel - boyun) - 70.041 * Math.log10(boy) + 30.3;
      setResult(bodyFat.toFixed(2));
    } else {
      const { boyun, bel, boy, kalça } = inputs;
      const bodyFat =
        163.205 *
          Math.log10(parseFloat(bel) + parseFloat(kalça) - parseFloat(boyun)) -
        97.684 * Math.log10(boy) -
        104.912;
      setResult(bodyFat.toFixed(2));
    }
  };

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
    setInputs({ boyun: "", bel: "", boy: "", kalça: "" });
    setResult(null); // Clear result when gender is changed
  };

  return (
    <div className="app">
      <h1>Yimsel Yağ Oranı Hesaplayıcı</h1>
      <div className="toggle">
        <button onClick={() => handleGenderChange("male")}>Erkek</button>
        <button onClick={() => handleGenderChange("female")}>Kadın</button>
      </div>
      <div className="formula">
        <h2>
          Formül:{" "}
          {gender === "male" ? (
            <>
              86.01 * log(
              <span className="variable">bel</span> -{" "}
              <span className="variable">boyun</span>) - 70.041 * log(
              <span className="variable">boy</span>) + 30.30
            </>
          ) : (
            <>
              163.205 * log(
              <span className="variable">bel</span> +{" "}
              <span className="variable">kalça</span> -{" "}
              <span className="variable">boyun</span>) - 97.684 * log(
              <span className="variable">boy</span>) - 104.912
            </>
          )}
        </h2>
      </div>
      <div className="inputs">
        <label>
          Boyun:{" "}
          <input
            type="text"
            name="boyun"
            value={inputs.boyun}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Bel:{" "}
          <input
            type="text"
            name="bel"
            value={inputs.bel}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Boy:{" "}
          <input
            type="text"
            name="boy"
            value={inputs.boy}
            onChange={handleInputChange}
          />
        </label>
        {gender === "female" && (
          <label>
            Kalça:{" "}
            <input
              type="text"
              name="kalça"
              value={inputs.kalça}
              onChange={handleInputChange}
            />
          </label>
        )}
      </div>
      <button onClick={calculateBodyFat}>Hesapla</button>
      {result && (
        <div className="result">
          <h2>Sonuç: {result}%</h2>
        </div>
      )}
      <footer className="footer">made by tiodeniz</footer>
    </div>
  );
};

export default App;
