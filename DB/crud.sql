-- Motor de BD: MYSQL

-- Base de datos: crud

-- Estructura de tabla para la tabla `productos`
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  `precio` double NOT NULL,
  `iva` double NOT NULL,
  `total` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;


-- Datos para la tabla productos

INSERT INTO `productos` (`descripcion`, `precio`, `iva`, `total`) VALUES
('Dell G3 1050TI', 22000.00, 3520.00, 25520.00);

