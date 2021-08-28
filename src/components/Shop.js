import styled from 'styled-components';

const Shop = ({ className }) => {
    return (
        <div className={className}>
            <div className={x}>
                Shop
            </div>
        </div>
    );
};

const StyledElement = styled(Shop)`
    .x {
        color: pink;
    }
`;

export default Shop;