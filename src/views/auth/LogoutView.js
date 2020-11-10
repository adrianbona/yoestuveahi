import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../../redux/modules/authentication';
import { removeUserToken } from '../../components/authentication/session';

const LogoutView = props => {
  const navigate = useNavigate();
  const { logout, user } = props;

  useEffect(() => {
    logout();
  }, [logout]);

  useEffect(() => {
    if (!user) {
      removeUserToken();
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  return null;
};

const mapStateToProps = state => ({
  user: state.authentication.user || null
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});

LogoutView.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutView);
