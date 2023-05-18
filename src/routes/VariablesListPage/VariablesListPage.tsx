import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getAllVariables } from "../../features/variables/variablesSlice";
import { Link } from "react-router-dom";

export const VariablesListPage = () => {
  const { items: variables, loaded } = useAppSelector(state => state.variables);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllVariables());
  }, []);

  if (!loaded) {
    return (
      <p>loading...</p>
    );
  }

  return (
    <ul>
      {variables.length > 0
        ? (
          variables.map(variable => (
            <li key={variable.ID}>
              <span>{variable.GroupName ?? 'No group name'}</span> - <Link to={`../variables/${variable.ID}`}>{variable.Name}</Link>
            </li>
          ))
        ) : ''}
    </ul>
  );
};
