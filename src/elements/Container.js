import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas: 
        "header header header"
        "content content content"
        "content content content";
    min-height:100vh;
`;

export default Container;