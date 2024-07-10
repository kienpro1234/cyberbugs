import React from 'react'
import { useNavigate } from 'react-router-dom';

export let globalNavigate = <></>;

export const GlobalNavigate = () => {
    globalNavigate = useNavigate();
    return null;
}

