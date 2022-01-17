import styled from "styled-components";

export const Wrapper = styled.div`
    display    : flex ;
    align-items: center;
    background: var(--darkGrey);
    padding: 0 20px;
`;
export const Content = styled.div`
    display: flex;
    max-width: var(--maxWidth);
    margin: 0 auto;
    width: 100%;

    .column{
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--medGrey);
        margin: 0 20px;
        border-radius: 20px;
        flex: 1;
        :first-child{
        margin-left: 0;
    }
    :last-child{
        margin-right: 0;
    }
    }
    @media screen and (max-width: 768px){
        display: block;
        .column{
            margin: 20px 0
        }
    }
`;