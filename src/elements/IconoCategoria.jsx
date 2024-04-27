import IconoComida from './../asets/imagenes/cat_comida.svg?react';
import IconoCompras from './../asets/imagenes/cat_compras.svg?react';
import IconoCuentasYPagos from './../asets/imagenes/cat_cuentas-y-pagos.svg?react';
import IconoDiversion from './../asets/imagenes/cat_diversion.svg?react';
import IconoHogar from './../asets/imagenes/cat_hogar.svg?react';
import IconoRopa from './../asets/imagenes/cat_ropa.svg?react';
import IconoSaludEHigiene from './../asets/imagenes/cat_salud-e-higiene.svg?react';
import IconoTransporte from './../asets/imagenes/cat_transporte.svg?react';

// eslint-disable-next-line react/prop-types
const IconoCategoria = ({id}) => {
	
	switch(id){
		case 'comida':
			return <IconoComida />
		case 'compras':
			return <IconoCompras />;
		case 'cuentas y pagos':
			return <IconoCuentasYPagos />;
		case 'diversion':
			return <IconoDiversion />;
		case 'hogar':
			return <IconoHogar />;
		case 'ropa':
			return <IconoRopa />;
		case 'salud e higiene':
			return <IconoSaludEHigiene />;
		case 'transporte':
			return <IconoTransporte />;
		default:
		break;
	}
}
 
export default IconoCategoria;