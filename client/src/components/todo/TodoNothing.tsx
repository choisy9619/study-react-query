import styled from '@emotion/styled';
import React from 'react';

export default function TodoNothing() {
    return (
        <StyledTodoNothingWrap>
            <p>할일이 없습니다.</p>
        </StyledTodoNothingWrap>
    );
}

const StyledTodoNothingWrap = styled.div`
    padding: 10px 0 0;
`;
