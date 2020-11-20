import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const EnsureAuthentication = props => {
  const { user, children } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  return children || null;
};

const mapStateToProps = state => ({
  user: state.authentication.user || null
});

EnsureAuthentication.defaultProps = {
  user: null
};

EnsureAuthentication.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  user: PropTypes.shape({ name: PropTypes.string })
};
export default connect(mapStateToProps)(EnsureAuthentication);
