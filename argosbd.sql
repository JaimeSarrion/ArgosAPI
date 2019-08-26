-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-08-2019 a las 16:41:50
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `argosbd`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_SPacientes` (`codigo` INT)  SELECT *
	FROM pacientes
	WHERE codPaciente IN (

		SELECT a.CodPaciente
		FROM al_cuidado a, medicos m
   	 	WHERE codigo = a.codMedico and a.codMedico = m.codMedico
	)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `al_cuidado`
--

CREATE TABLE `al_cuidado` (
  `codMedico` int(11) NOT NULL,
  `CodPaciente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `al_cuidado`
--

INSERT INTO `al_cuidado` (`codMedico`, `CodPaciente`) VALUES
(1, 1),
(1, 3),
(1, 5),
(2, 1),
(2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `codMedico` int(11) NOT NULL,
  `Nombre` varchar(20) NOT NULL,
  `Apellidos` varchar(30) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`codMedico`, `Nombre`, `Apellidos`, `dni`, `email`, `password`) VALUES
(1, 'Jaime', 'Sarrion', '48753212X', 'jaime@gmail.com', 'contraseña'),
(2, 'Benito Antonio', 'Martínez Ocasio', '12345678W', 'benito@gmail.com', 'contraseña'),
(3, 'Alba', 'Farello', '12345278W', 'alba@gmail.com', 'contraseña');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `CodPaciente` int(11) NOT NULL,
  `Nombre` varchar(20) NOT NULL,
  `Apellidos` varchar(20) NOT NULL,
  `Observaciones` text NOT NULL,
  `Calle` varchar(30) NOT NULL,
  `Telefono` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`CodPaciente`, `Nombre`, `Apellidos`, `Observaciones`, `Calle`, `Telefono`) VALUES
(1, 'Billie', 'Ellish', 'Tiene exceso de swag. Padece de depresión cronica. Hace temazos.', 'C/Pintor Murillo 35 ', '789654123'),
(3, 'Kidd', 'Keo', '100 mg de puños via oral. Esta muy sólo. No para de repetir \'Drakukeo\'', 'C/Falsa 123', '456332185'),
(4, 'Jaume', 'Moreno Canto', 'Ingresado por coma etílico 6 veces. Tiene el higado que parece foie de pato. Amante del TGB. Ha dejado claro que le gusta españa repetidas veces', 'C/Javea 45 3I', '123456654'),
(5, 'Larry', 'Rider Arturo Garcia', 'Su nombre es muy largo. Amante de OT, no para de escucharlo en la consulta. Desaparecido desde hace mese.', 'C/San Juan N/A', '987654321');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `al_cuidado`
--
ALTER TABLE `al_cuidado`
  ADD PRIMARY KEY (`codMedico`,`CodPaciente`),
  ADD KEY `CodPaciente` (`CodPaciente`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`codMedico`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`CodPaciente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `codMedico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `CodPaciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `al_cuidado`
--
ALTER TABLE `al_cuidado`
  ADD CONSTRAINT `al_cuidado_ibfk_1` FOREIGN KEY (`codMedico`) REFERENCES `medicos` (`codMedico`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `al_cuidado_ibfk_2` FOREIGN KEY (`CodPaciente`) REFERENCES `pacientes` (`CodPaciente`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
