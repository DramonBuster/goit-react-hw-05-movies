import PropTypes from 'prop-types';
import { Slide, toast } from 'react-toastify';

const Toastify = (type, nameToastify) =>
  toast(nameToastify, {
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    transition: Slide,
    type: type,
  });

Toastify.propTypes = {
  type: PropTypes.string.isRequired,
  nameToastify: PropTypes.string.isRequired,
};

export default Toastify;
