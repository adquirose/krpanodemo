import styled from 'styled-components';
import Puntos from './../assets/imagenes/puntos.svg?react';

const Svg = styled.svg`
    height: 50vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 0;
    // path {
    //     fill: rgba(135,182,194, .15);
    // }
`;
 
const PuntosArriba = styled(Puntos)`
    position: fixed;
    z-index: 1;
    top: 2.5rem; /* 40px */
    left: 2.5rem; /* 40px */
`;
 
const PuntosAbajo = styled(Puntos)`
    position: fixed;
    z-index: 1;
    bottom: 2.5rem; /* 40px */
    right: 2.5rem; /* 40px */
`;

const Fondo = () => {
	return (
		<>
			<PuntosArriba />
			<Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio='none'>
                <path fill="#0099ff" fillOpacity="1" d="M0,96L48,85.3C96,75,192,53,288,85.3C384,117,480,203,576,224C672,245,768,203,864,170.7C960,139,1056,117,1152,133.3C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </Svg>
			<PuntosAbajo />
		</>
	)
}
 
export default Fondo;