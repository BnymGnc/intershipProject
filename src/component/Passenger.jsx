import React, { useRef, useState } from 'react';
import '../css/Passenger.css';

export default function Passenger() {
  const passengerCount = 3;

  const genderRefs = [
    [useRef(null), useRef(null)],
    [useRef(null), useRef(null)],
    [useRef(null), useRef(null)],
  ];
  const nameRefs = [useRef(null), useRef(null), useRef(null)];
  const surnameRefs = [useRef(null), useRef(null), useRef(null)];
  const nationalityRefs = [useRef(null), useRef(null), useRef(null)];
  const birthRefs = [useRef(null), useRef(null), useRef(null)];

  const [errors, setErrors] = useState(
    Array.from({ length: passengerCount }, () => ({
      gender: false,
      name: false,
      surname: false,
      nationality: false,
      birth: false,
    }))
  );

 const handleSubmit = (e) => {
  e.preventDefault();

  const newErrors = [];
  const passengers = [];

  for (let i = 0; i < passengerCount; i++) {
    const gender = genderRefs[i][0].current.checked
      ? 'male'
      : genderRefs[i][1].current.checked
      ? 'female'
      : null;

    const name = nameRefs[i].current.value.trim();
    const surname = surnameRefs[i].current.value.trim();
    const nationality = nationalityRefs[i].current.value.trim();
    const birth = birthRefs[i].current.value.trim();

    const passengerError = {
      gender: !gender,
      name: !name,
      surname: !surname,
      nationality: !nationality,
      birth: !birth,
    };

    newErrors.push(passengerError);

    passengers.push({
      gender: gender || null,
      name: name || null,
      surname: surname || null,
      nationality: nationality || null,
      birth: birth || null,
    });

 
    const hasError = Object.values(passengerError).some((err) => err);
    if (!hasError) {
      console.log(`${i + 1}. yolcu bilgileri doldurulmuştur.`);
    }
  }

  setErrors(newErrors);

  console.log(JSON.stringify(passengers, null, 2));
};

  const renderForm = (index) => (
    <div key={index}>
      <h2>{index + 1}. Adult (+12)</h2>
      <form>
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <p>Gender</p> <p className="Reddot">*</p><br /><br />
                <label className="Radio">Male</label>
                <input type="radio" name={`gender-${index}`} ref={genderRefs[index][0]} />
                <label className="Radio">Female</label>
                <input type="radio" name={`gender-${index}`} ref={genderRefs[index][1]} />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <p className="Required" style={{ visibility: errors[index].gender ? 'visible' : 'hidden' }}>
                  Gender is required
                </p>
              </td>
            </tr>
            <tr>
              <td><p>Name</p><p className="Reddot">*</p></td>
              <td><p>Surname</p><p className="Reddot">*</p></td>
            </tr>
            <tr>
              <td><input type="text" className="input" placeholder="Name" ref={nameRefs[index]} /></td>
              <td><input type="text" className="input" placeholder="Surname" ref={surnameRefs[index]} /></td>
            </tr>
            <tr>
              <td>
                <p className="Required" style={{ visibility: errors[index].name ? 'visible' : 'hidden' }}>
                  Name is required
                </p>
              </td>
              <td>
                <p className="Required" style={{ visibility: errors[index].surname ? 'visible' : 'hidden' }}>
                  Surname is required
                </p>
              </td>
            </tr>
            <tr>
              <td><p>Nationality</p><p className="Reddot">*</p></td>
              <td><p>Date of birth</p><p className="Reddot">*</p></td>
            </tr>
            <tr>
              <td>
                <select ref={nationalityRefs[index]}>
                  <option value="">Select</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="USA">USA</option>
                </select>
              </td>
              <td><input type="date" className="date" ref={birthRefs[index]} /></td>
            </tr>
            <tr>
              <td>
                <p className="Required" style={{ visibility: errors[index].nationality ? 'visible' : 'hidden' }}>
                  Nationality is required
                </p>
              </td>
              <td>
                <p className="Required" style={{ visibility: errors[index].birth ? 'visible' : 'hidden' }}>
                  Date of birth is required
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );

  return ( 
    <>
      <h1 style={{ marginLeft: '50px' }}>Passenger Information</h1>
      <div id="mainDiv">
        {[0, 1, 2].map((_, index) => renderForm(index))}
        <button className="button" onClick={handleSubmit}>Save</button>
      </div>
    </>
  );
}