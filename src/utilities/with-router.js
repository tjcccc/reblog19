// Replace withRouter after upgrading react-router-dom from v5 to v6.
// Reference: https://reactrouter.com/docs/en/v6/getting-started/faq#what-happened-to-withrouter-i-need-it

import { React } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return (<Component {...props} router={{ location, navigate, params }} />);
  }

  return ComponentWithRouterProp;
}
