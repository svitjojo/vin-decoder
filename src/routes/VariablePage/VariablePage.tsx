import { useEffect } from "react";
import parse from 'html-react-parser';
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getVariableById } from "../../features/variables/variablesSlice";

const VariablePage = () => {
  const { variableId } = useParams();
  const navigate = useNavigate();

  const variable = useAppSelector(state => state.variables.selectedItem);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVariableById(Number(variableId)));
  }, []);

  return (
    <>
      <a href="#" onClick={() => {
        navigate(-1);
      }}>{'< Back'}</a>
      {!!variable
        ? parse(variable?.description)
        : ''}
    </>
  );
};

export default VariablePage;
