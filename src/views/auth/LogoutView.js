import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../../redux/modules/authentication';

const LogoutView = props => {
  const navigate = useNavigate();
  const { logout } = props;

  useEffect(() => {
    logout();
    navigate('/login', { replace: true });
  }, [logout, navigate]);

  return null;
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});

LogoutView.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(LogoutView);
