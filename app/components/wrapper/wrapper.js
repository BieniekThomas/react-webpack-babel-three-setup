import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const styledWrapper = ({ children }) => {
	console.log( 'wrapper' );

	return (
		<Wrapper>
			<div>
				{children}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 80px 30px 80px;
  align-items: center;
  justify-content: center;

  > div {
    max-width: ${props => props.theme.contentWidth};
    width: 100%;
  }
`;

styledWrapper.propTypes = {
	children: PropTypes.node,
};

styledWrapper.defaultProps = {
	children: null,
};

export default styledWrapper;
