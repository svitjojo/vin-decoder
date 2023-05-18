import { useState } from "react";
import parse from 'html-react-parser';
import { useAppDispatch, useAppSelector } from "../../app/store";
import { addVinToLastDecoded, getDecodedVin, setDecodedVin } from "../../features/vins/vinsSlice";
import './HomePage.css';
import { useOutsideClick } from "../../hooks/useOutsideHook";
import { vinValidator } from "../../helpers/vinValidator";
import { filterVinResult } from "../../helpers/filterVinResults";

const HomePage = () => {
  const [vinCode, setVinCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const { decodedVin, lastSearched, lastDecodedVins } = useAppSelector(state => state.vins);
  const dispatch = useAppDispatch();

  const filteredVinResult = filterVinResult(decodedVin?.results || []);

  const handleVinCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setVinCode(value);
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (vinValidator(vinCode)) {
      await dispatch(getDecodedVin(vinCode));
      dispatch(addVinToLastDecoded(vinCode));
      setErrorMessage('');
    } else {
      setErrorMessage('The input is invalid.<br/> Please check if it does not exceed 17 characters in length, use only numbers and Latin characters.<br/> For more information please check <a style="color: blue;" target="__blank" href="https://en.wikipedia.org/wiki/Vehicle_identification_number">LINK</a> .');
    }

    setVinCode('');
  };

  const handleClickOut = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const formVinHistory = document.querySelector('.form__vin-history');

    if (formVinHistory) {
      formVinHistory.classList.remove("form__vin-history--active");
    }
  };

  const handleInputClick = () => {
    const formVinHistory = document.querySelector(".form__vin-history");

    if (formVinHistory) {
      formVinHistory.classList.add("form__vin-history--active");
    }
  };

  const handleSelectedVinFromHistory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(setDecodedVin(event.currentTarget.innerHTML));
    setErrorMessage('');

    const formVinHistory = document.querySelector('.form__vin-history');

    if (formVinHistory) {
      formVinHistory.classList.remove("form__vin-history--active");
    }
  };

  const ref = useOutsideClick<HTMLDivElement>(handleClickOut);

  return (
    <>
      <section className="vin-section">
        <div className="vin-section__form">
          <form className="form" onSubmit={handleSubmit}>
            <label className="form__label">Enter your VIN code: </label>
            <div className="form__text-btn-wrapper" >
              <div className="" ref={ref}>
                <input
                  type="text"
                  value={vinCode}
                  onChange={handleVinCode}
                  className="form__input"
                  placeholder="Exp: JN1AZ4EH7DM430111"
                  autoComplete="off"
                  onClick={handleInputClick}
                />
                {lastSearched.length > 0
                  ? (
                    <div className="form__vin-history" onClick={handleClickOut}>
                      <ul className="form__vin-history-list">
                        {lastSearched.map(item => (
                          <li className="form__vin-history-item" key={item.searchCriteria}>
                            <button
                              className="form__vin-history-btn"
                              type="button"
                              onClick={handleSelectedVinFromHistory}
                            >
                              {item.searchCriteria.slice(4)}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : ''
                }
              </div>
              <button className="form__btn" type="submit">Decode</button>
            </div>
          </form>
        </div>
        {errorMessage
          ? (
            <div className="error-message">
              {parse(errorMessage)}
            </div>
          ) : ''}
        <div className="vin-section__info">
          <div className="vin-section__last-five-decoded last-five-decoded">
            <h3 className="last-five-decoded__title">Last five searched VIN:</h3>
            <ul className="last-five-decoded__list">
              {lastDecodedVins.map(item => (
                <li className="last-five-decoded__item" key={item + Math.random()}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="vin-section__results">
            <ul>
              {filteredVinResult
                ? (filteredVinResult.map(result => (
                    <li className="vin-section__results-item" key={result.variableId}>
                      <strong>{result.variable}:</strong> {result.value}
                    </li>
                  )))
                : ''}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
