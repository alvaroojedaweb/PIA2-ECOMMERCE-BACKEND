-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: celulartech
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `CATEGORIAPKID` int NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`CATEGORIAPKID`),
  UNIQUE KEY `NOMBRE` (`NOMBRE`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Celulares','2026-11-24 02:54:12','2026-11-24 02:54:12'),(2,'Accesorios','2026-11-24 02:54:12','2026-11-24 02:54:12');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `CLIENTEPKID` int NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(255) NOT NULL,
  `APELLIDO` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `TELEFONO` varchar(255) DEFAULT NULL,
  `DIRECCION` varchar(255) DEFAULT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `email_confirmado` tinyint(1) DEFAULT '0',
  `confirm_token` varchar(255) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_expires` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`CLIENTEPKID`),
  UNIQUE KEY `EMAIL` (`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Juan','Pérez','juan.perez@ejemplo.com','3515123456','Av. Colón 1250, Córdoba','$2b$10$10HjDizkzoRrlRQdlg63ueqp3Z5IkEJF/SWzjb8vUK2WJ6p0f9TTi',1,NULL,NULL,NULL,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(2,'María','Gómez','maria.gomez@ejemplo.com','3516987654','Bv. San Juan 450, Córdoba','$2b$10$m6yeL9siD8I/A06L2EsiyOJKqZoyruq4kPAdHycUFZ/8SDSwcAH3u',1,NULL,NULL,NULL,'2026-11-24 02:54:13','2026-11-24 02:54:13');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `CLIENTEPKID` int NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(255) NOT NULL,
  `APELLIDO` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `TELEFONO` varchar(255) DEFAULT NULL,
  `DIRECCION` varchar(255) DEFAULT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `email_confirmado` tinyint(1) DEFAULT '0',
  `confirm_token` varchar(255) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_expires` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`CLIENTEPKID`),
  UNIQUE KEY `EMAIL` (`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'ivan','prueba','aleinllano@gmail.com',NULL,NULL,'$2b$10$H5/Db8krpuczdtmJze44suTmnLR38U89.Oaxo/BRFJxCs5zph5kV.',0,'728374068bfdeb6550a669a2cb5cacb2f0f412b3cedc4344681f2c10bd060586',NULL,NULL,'2026-11-18 16:52:24','2026-11-18 16:52:24');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `EMPLEADOPKID` int NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(255) NOT NULL,
  `APELLIDO` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `ROLID` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`EMPLEADOPKID`),
  UNIQUE KEY `EMAIL` (`EMAIL`),
  KEY `ROLID` (`ROLID`),
  CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`ROLID`) REFERENCES `rol` (`ROLPKID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (1,'Admin','CelularTech','admin@celulartech.com','$2b$10$kqN7uTu03NL.ceoSXj1jpeTnFVDXWLUfCKadwl8A5cfRtz7jDrWSS',1,'2026-11-24 02:54:13','2026-11-24 02:54:13'),(2,'Soporte','Staff','staff1@celulartech.com','$2b$10$1YtuOoR9YZyx8Gg.wAYxHeEh./FGoY9Ybl5Hup..zsEHJfgB.h/4e',2,'2026-11-24 02:54:13','2026-11-24 02:54:13');
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagen_producto`
--

DROP TABLE IF EXISTS `imagen_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagen_producto` (
  `IMAGENPRODUCTOPKID` int NOT NULL AUTO_INCREMENT,
  `PRODUCTOPKID` int NOT NULL,
  `IMAGENURL` varchar(255) NOT NULL,
  `ORDEN` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`IMAGENPRODUCTOPKID`),
  KEY `PRODUCTOPKID` (`PRODUCTOPKID`),
  CONSTRAINT `imagen_producto_ibfk_1` FOREIGN KEY (`PRODUCTOPKID`) REFERENCES `producto` (`PRODUCTOPKID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagen_producto`
--

LOCK TABLES `imagen_producto` WRITE;
/*!40000 ALTER TABLE `imagen_producto` DISABLE KEYS */;
INSERT INTO `imagen_producto` VALUES (1,1,'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(2,1,'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(3,1,'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(4,2,'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(5,2,'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(6,2,'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(7,3,'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(8,3,'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(9,3,'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(10,4,'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(11,4,'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(12,4,'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(13,5,'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(14,5,'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(15,5,'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(16,6,'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(17,6,'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(18,6,'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=800&q=80',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(19,7,'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(20,7,'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(21,7,'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(22,8,'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(23,8,'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(24,8,'https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&w=800&q=80',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(25,9,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(26,9,'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(27,9,'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(28,10,'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(29,10,'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=800&q=80',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(30,10,'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(31,11,'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=800&q=80',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(32,11,'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(33,11,'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(34,12,'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(35,12,'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(36,12,'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(37,13,'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(38,13,'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(39,13,'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(40,14,'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(41,14,'https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=800&q=80',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(42,14,'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',3,'2026-11-24 02:54:12','2026-11-24 02:54:12');
/*!40000 ALTER TABLE `imagen_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_carrito`
--

DROP TABLE IF EXISTS `item_carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_carrito` (
  `ITEMCARRITOPKID` int NOT NULL AUTO_INCREMENT,
  `CLIENTEPKID` int NOT NULL,
  `PRODUCTOPKID` int NOT NULL,
  `CANTIDAD` int NOT NULL DEFAULT '1',
  `PRECIO` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`ITEMCARRITOPKID`),
  UNIQUE KEY `idx_unique_cliente_producto` (`CLIENTEPKID`,`PRODUCTOPKID`),
  KEY `PRODUCTOPKID` (`PRODUCTOPKID`),
  CONSTRAINT `item_carrito_ibfk_1` FOREIGN KEY (`CLIENTEPKID`) REFERENCES `cliente` (`CLIENTEPKID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_carrito_ibfk_2` FOREIGN KEY (`PRODUCTOPKID`) REFERENCES `producto` (`PRODUCTOPKID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_carrito`
--

LOCK TABLES `item_carrito` WRITE;
/*!40000 ALTER TABLE `item_carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_orden_compra`
--

DROP TABLE IF EXISTS `item_orden_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_orden_compra` (
  `ITEMORDENCOMPRAPKID` int NOT NULL AUTO_INCREMENT,
  `ORDENCOMPRAPKID` int NOT NULL,
  `PRODUCTOPKID` int NOT NULL,
  `CANTIDAD` int NOT NULL DEFAULT '1',
  `PRECIOUNITARIO` decimal(10,2) NOT NULL,
  `SUBTOTAL` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`ITEMORDENCOMPRAPKID`),
  KEY `ORDENCOMPRAPKID` (`ORDENCOMPRAPKID`),
  KEY `PRODUCTOPKID` (`PRODUCTOPKID`),
  CONSTRAINT `item_orden_compra_ibfk_1` FOREIGN KEY (`ORDENCOMPRAPKID`) REFERENCES `orden_compra` (`ORDENCOMPRAPKID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_orden_compra_ibfk_2` FOREIGN KEY (`PRODUCTOPKID`) REFERENCES `producto` (`PRODUCTOPKID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_orden_compra`
--

LOCK TABLES `item_orden_compra` WRITE;
/*!40000 ALTER TABLE `item_orden_compra` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_orden_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `MARCAPKID` int NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`MARCAPKID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (1,'Samsung','2026-11-24 02:54:12','2026-11-24 02:54:12'),(2,'Xiaomi','2026-11-24 02:54:12','2026-11-24 02:54:12'),(3,'Apple','2026-11-24 02:54:12','2026-11-24 02:54:12'),(4,'Motorola','2026-11-24 02:54:12','2026-11-24 02:54:12'),(5,'Sony','2026-11-24 02:54:12','2026-11-24 02:54:12');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modelo`
--

DROP TABLE IF EXISTS `modelo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modelo` (
  `MODELOPKID` int NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(255) NOT NULL,
  `MARCAPKID` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`MODELOPKID`),
  KEY `MARCAPKID` (`MARCAPKID`),
  CONSTRAINT `modelo_ibfk_1` FOREIGN KEY (`MARCAPKID`) REFERENCES `marca` (`MARCAPKID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelo`
--

LOCK TABLES `modelo` WRITE;
/*!40000 ALTER TABLE `modelo` DISABLE KEYS */;
INSERT INTO `modelo` VALUES (1,'Galaxy A55 5G',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(2,'Galaxy S24 Ultra',1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(3,'Redmi Note 13 Pro',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(4,'Redmi Note 14',2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(5,'iPhone 16 Pro Max',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(6,'iPhone 15',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(7,'Accesorios Apple',3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(8,'Moto G84 5G',4,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(9,'Edge 50 Pro',4,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(10,'Audio & Accesorios',5,'2026-11-24 02:54:12','2026-11-24 02:54:12');
/*!40000 ALTER TABLE `modelo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden_compra`
--

DROP TABLE IF EXISTS `orden_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orden_compra` (
  `ORDENCOMPRAPKID` int NOT NULL AUTO_INCREMENT,
  `CLIENTEPKID` int NOT NULL,
  `EMPLEADOPKID` int DEFAULT NULL,
  `FECHA` datetime DEFAULT NULL,
  `ESTADO` enum('pendiente','confirmada','enviada','entregada','cancelada') DEFAULT 'pendiente',
  `TOTAL` decimal(10,2) DEFAULT '0.00',
  `DIRECCIONENVIO` text,
  `NOTAS` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`ORDENCOMPRAPKID`),
  KEY `CLIENTEPKID` (`CLIENTEPKID`),
  KEY `EMPLEADOPKID` (`EMPLEADOPKID`),
  CONSTRAINT `orden_compra_ibfk_1` FOREIGN KEY (`CLIENTEPKID`) REFERENCES `cliente` (`CLIENTEPKID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orden_compra_ibfk_2` FOREIGN KEY (`EMPLEADOPKID`) REFERENCES `empleado` (`EMPLEADOPKID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden_compra`
--

LOCK TABLES `orden_compra` WRITE;
/*!40000 ALTER TABLE `orden_compra` DISABLE KEYS */;
INSERT INTO `orden_compra` VALUES (1,1,NULL,'2026-11-24 02:54:13','enviada',424998.00,'Av. Colón 1250, Córdoba Capital','Entregar en recepción de 9 a 18 hs.','2026-11-24 02:54:13','2026-11-24 02:54:13');
/*!40000 ALTER TABLE `orden_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `PRODUCTOPKID` int NOT NULL AUTO_INCREMENT,
  `DESCRIPCION` varchar(255) NOT NULL,
  `PRECIO` int NOT NULL,
  `CATEGORIAPKID` int NOT NULL,
  `NOMBRE` varchar(255) NOT NULL,
  `ALMACENAMIENTO_GB` int DEFAULT NULL,
  `STOCK` int NOT NULL DEFAULT '0',
  `PESO_G` int NOT NULL DEFAULT '0',
  `MODELOPKID` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`PRODUCTOPKID`),
  KEY `CATEGORIAPKID` (`CATEGORIAPKID`),
  KEY `MODELOPKID` (`MODELOPKID`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`CATEGORIAPKID`) REFERENCES `categoria` (`CATEGORIAPKID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`MODELOPKID`) REFERENCES `modelo` (`MODELOPKID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Titanio natural, chip A18 Pro, pantalla Super Retina XDR de 6.9 pulgadas y sistema de cámaras Pro con teleobjetivo 5x.',1899999,1,'iPhone 16 Pro Max 256GB',256,8,227,5,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(2,'Pantalla Dynamic AMOLED 2X QHD+ de 6.8\", procesador Snapdragon 8 Gen 3, cámara de 200 MP y S-Pen integrado.',1749999,1,'Samsung Galaxy S24 Ultra 512GB',512,6,232,2,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(3,'Pantalla AMOLED 120Hz de 6.67\", cámara principal de 108 MP con IA, batería de 5500 mAh y carga turbo de 33W.',389999,1,'Xiaomi Redmi Note 14 256GB',256,18,196,4,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(4,'Marco metálico premium, pantalla Super AMOLED Vision Booster de 6.6\", resistencia al agua IP67 y triple cámara de 50 MP.',549999,1,'Samsung Galaxy A55 5G 128GB',128,14,213,1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(5,'Pantalla curva pOLED de 144Hz validada por Pantone, carga TurboPower de 125W incluida y cámara con enfoque láser.',799999,1,'Motorola Edge 50 Pro 512GB',512,9,186,9,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(6,'Dynamic Island, cámara principal de 48 MP con teleobjetivo 2x, chip A16 Bionic y conector USB-C.',1299999,1,'Apple iPhone 15 128GB',128,10,171,6,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(7,'Cámara de 200 MP con estabilización óptica OIS, pantalla AMOLED FHD+ y carga rápida de 67W.',429999,1,'Xiaomi Redmi Note 13 Pro 256GB',256,15,188,3,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(8,'Acabado en cuero vegano, 12GB de RAM, pantalla pOLED de 6.5\" y sonido Dolby Atmos estéreo.',359999,1,'Motorola Moto G84 5G 256GB',256,3,168,8,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(9,'Cancelación de ruido líder con 8 micrófonos, hasta 30 horas de batería y conexión multipunto Bluetooth.',459999,2,'Auriculares Sony WH-1000XM5',NULL,12,250,10,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(10,'Adaptador de corriente original USB-C de 20W para carga rápida segura en iPhone, iPad y AirPods.',34999,2,'Cargador Rápido Apple 20W USB-C',NULL,30,90,7,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(11,'Cable reforzado de 2 metros certificado MFi para carga rápida y transferencia de datos de alta velocidad.',18999,2,'Cable Trenzado USB-C a Lightning 2m',NULL,45,60,7,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(12,'Interior de microfibra suave, exterior antideslizante y protección reforzada en bordes y módulo de cámaras.',14500,2,'Funda Silicona MagSafe Soft-Touch',NULL,40,40,1,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(13,'Estuche de carga rápida USB-C, resistencia al sudor IPX4 y 24 horas de autonomía combinada.',64999,2,'Auriculares Inalámbricos TWS Pro',NULL,22,55,10,'2026-11-24 02:54:12','2026-11-24 02:54:12'),(14,'Batería portátil de alta capacidad con doble salida USB-C Power Delivery de 22.5W y display digital.',52999,2,'PowerBank Carga Rápida 20.000 mAh',NULL,0,340,10,'2026-11-24 02:54:12','2026-11-24 02:54:12');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `ROLPKID` int NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`ROLPKID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Admin','2026-11-24 02:54:12','2026-11-24 02:54:12'),(2,'Staff','2026-11-24 02:54:12','2026-11-24 02:54:12');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-23 23:54:13
