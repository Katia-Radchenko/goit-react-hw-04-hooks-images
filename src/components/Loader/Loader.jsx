import PropTypes from 'prop-types';

import { Oval } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

const Loader = ({ center = false }) => {
  return (
    <Wrapper center={center}>
      <Oval
        arialLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={5}
        strokeWidthSecondary={1}
        color="#76bdd5"
        secondaryColor="transparent"
      />
    </Wrapper>
  );
};

Loader.propTypes = {
  center: PropTypes.bool,
};

export default Loader;
