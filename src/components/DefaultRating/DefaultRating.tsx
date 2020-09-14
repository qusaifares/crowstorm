import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { StarBorder } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff523b'
  },
  iconHover: {
    color: '#ff523b'
  }
})(Rating);

interface Props {
  value: number;
}

const DefaultRating: React.FC<Props> = ({ value }) => {
  return (
    <StyledRating
      name='customized-color'
      value={value}
      getLabelText={(val) => `${val} Star${val !== 1 ? 's' : ''}`}
      precision={0.5}
      emptyIcon={
        <StarBorder
          className='defaultRating__star'
          style={{ color: '#ff523b' }}
          fontSize='inherit'
        />
      }
      readOnly
    />
  );
};

export default DefaultRating;
