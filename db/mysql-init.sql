-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: epushserver
-- ------------------------------------------------------
-- Server version	5.7.15-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BioFormat`
--

DROP TABLE IF EXISTS `BioFormat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BioFormat` (
  `BioFormatId` int(11) NOT NULL,
  `BioFormat` varchar(255) NOT NULL,
  PRIMARY KEY (`BioFormat`,`BioFormatId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BioFormat`
--

LOCK TABLES `BioFormat` WRITE;
/*!40000 ALTER TABLE `BioFormat` DISABLE KEYS */;
INSERT INTO `BioFormat` VALUES (2,'ANSI'),(0,'ES'),(1,'ISO');
/*!40000 ALTER TABLE `BioFormat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BioType`
--

DROP TABLE IF EXISTS `BioType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BioType` (
  `BioTypeId` int(11) NOT NULL,
  `BioType` varchar(255) NOT NULL,
  PRIMARY KEY (`BioType`,`BioTypeId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BioType`
--

LOCK TABLES `BioType` WRITE;
/*!40000 ALTER TABLE `BioType` DISABLE KEYS */;
INSERT INTO `BioType` VALUES (2,'Face'),(1,'Fingerprint'),(7,'Fingervein'),(4,'Iris'),(8,'Palm'),(6,'Palmprint'),(5,'Retina'),(0,'UserPic'),(3,'Voiceprint');
/*!40000 ALTER TABLE `BioType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Commands`
--

DROP TABLE IF EXISTS `Commands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Commands` (
  `CommandId` bigint(20) NOT NULL AUTO_INCREMENT,
  `CommandTypeId` int(11) NOT NULL,
  `DeviceId` bigint(20) NOT NULL,
  `EmployeeId` bigint(20) NOT NULL,
  `BioId` int(11) NOT NULL,
  `Status` int(11) NOT NULL,
  `DeviceCommandId` bigint(20) DEFAULT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedOn` datetime NOT NULL,
  `ModifiedOn` datetime DEFAULT NULL,
  PRIMARY KEY (`BioId`,`CommandId`,`CommandTypeId`,`DeviceId`,`EmployeeId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Commands`
--

LOCK TABLES `Commands` WRITE;
/*!40000 ALTER TABLE `Commands` DISABLE KEYS */;
/*!40000 ALTER TABLE `Commands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeviceCommands`
--

DROP TABLE IF EXISTS `DeviceCommands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DeviceCommands` (
  `DeviceCommandId` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) DEFAULT NULL,
  `DeviceCommand` text,
  `SerialNumber` varchar(255) NOT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `CreationDate` datetime DEFAULT NULL,
  `ExecutionDate` datetime DEFAULT NULL,
  PRIMARY KEY (`DeviceCommandId`,`SerialNumber`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeviceCommands`
--

LOCK TABLES `DeviceCommands` WRITE;
/*!40000 ALTER TABLE `DeviceCommands` DISABLE KEYS */;
/*!40000 ALTER TABLE `DeviceCommands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeviceErrorMessages`
--

DROP TABLE IF EXISTS `DeviceErrorMessages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DeviceErrorMessages` (
  `DeviceErrorMessageId` int(11) NOT NULL AUTO_INCREMENT,
  `SerialNumber` varchar(50) NOT NULL,
  `ErrorMessage` text,
  `LogStream` text,
  `CreatedDate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`DeviceErrorMessageId`,`SerialNumber`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeviceErrorMessages`
--

LOCK TABLES `DeviceErrorMessages` WRITE;
/*!40000 ALTER TABLE `DeviceErrorMessages` DISABLE KEYS */;
/*!40000 ALTER TABLE `DeviceErrorMessages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeviceGroup`
--

DROP TABLE IF EXISTS `DeviceGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DeviceGroup` (
  `DeviceGroupId` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `VerificationTypeId` int(11) NOT NULL,
  `LastModifiedDate` datetime NOT NULL,
  PRIMARY KEY (`DeviceGroupId`),
  UNIQUE KEY `UK_DeviceGroup_Name` (`Name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeviceGroup`
--

LOCK TABLES `DeviceGroup` WRITE;
/*!40000 ALTER TABLE `DeviceGroup` DISABLE KEYS */;
INSERT INTO `DeviceGroup` VALUES (1,'DeviceGroup 01','DeviceGroup 01',0,'1970-01-01 00:00:00'),(2,'DeviceGroup 02','DeviceGroup 02',0,'1970-01-01 00:00:00'),(3,'DeviceGroup 03','DeviceGroup 03',0,'1970-01-01 00:00:00'),(4,'DeviceGroup 04','DeviceGroup 04',0,'1970-01-01 00:00:00'),(5,'DeviceGroup 05','DeviceGroup 05',0,'1970-01-01 00:00:00'),(6,'DeviceGroup 06','DeviceGroup 06',0,'1970-01-01 00:00:00'),(7,'DeviceGroup 07','DeviceGroup 07',0,'1970-01-01 00:00:00'),(8,'DeviceGroup 08','DeviceGroup 08',0,'1970-01-01 00:00:00'),(9,'DeviceGroup 09','DeviceGroup 09',0,'1970-01-01 00:00:00'),(10,'DeviceGroup 10','DeviceGroup 10',0,'1970-01-01 00:00:00');
/*!40000 ALTER TABLE `DeviceGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeviceLogs`
--

DROP TABLE IF EXISTS `DeviceLogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DeviceLogs` (
  `DeviceLogId` int(11) NOT NULL AUTO_INCREMENT,
  `DownloadDate` datetime DEFAULT NULL,
  `DeviceId` int(11) NOT NULL,
  `UserId` varchar(50) NOT NULL,
  `LogDate` datetime NOT NULL,
  `Direction` varchar(255) DEFAULT NULL,
  `AttDirection` varchar(255) DEFAULT NULL,
  `C1` varchar(255) DEFAULT NULL,
  `C2` varchar(255) DEFAULT NULL,
  `C3` varchar(255) DEFAULT NULL,
  `C4` varchar(255) DEFAULT NULL,
  `C5` varchar(255) DEFAULT NULL,
  `C6` varchar(255) DEFAULT NULL,
  `C7` varchar(255) DEFAULT NULL,
  `WorkCode` varchar(255) DEFAULT NULL,
  KEY `DeviceLogId` (`DeviceLogId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeviceLogs`
--

LOCK TABLES `DeviceLogs` WRITE;
/*!40000 ALTER TABLE `DeviceLogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `DeviceLogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeviceLogs_Processed`
--

DROP TABLE IF EXISTS `DeviceLogs_Processed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DeviceLogs_Processed` (
  `DeviceLogId` int(11) NOT NULL AUTO_INCREMENT,
  `DownloadDate` datetime DEFAULT NULL,
  `DeviceId` int(11) NOT NULL,
  `UserId` varchar(50) NOT NULL,
  `LogDate` datetime NOT NULL,
  `Direction` varchar(255) DEFAULT NULL,
  `AttDirection` varchar(255) DEFAULT NULL,
  `C1` varchar(255) DEFAULT NULL,
  `C2` varchar(255) DEFAULT NULL,
  `C3` varchar(255) DEFAULT NULL,
  `C4` varchar(255) DEFAULT NULL,
  `C5` varchar(255) DEFAULT NULL,
  `C6` varchar(255) DEFAULT NULL,
  `C7` varchar(255) DEFAULT NULL,
  `WorkCode` varchar(255) DEFAULT NULL,
  KEY `DeviceLogId` (`DeviceLogId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeviceLogs_Processed`
--

LOCK TABLES `DeviceLogs_Processed` WRITE;
/*!40000 ALTER TABLE `DeviceLogs_Processed` DISABLE KEYS */;
/*!40000 ALTER TABLE `DeviceLogs_Processed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeviceLogsInfoBL`
--

DROP TABLE IF EXISTS `DeviceLogsInfoBL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DeviceLogsInfoBL` (
  `DeviceLogId` int(11) NOT NULL AUTO_INCREMENT,
  `DownloadDate` datetime DEFAULT NULL,
  `DeviceId` int(11) NOT NULL,
  `LogDate` datetime NOT NULL,
  PRIMARY KEY (`DeviceLogId`),
  UNIQUE KEY `UK_DeviceLogsInfoBL` (`DeviceId`,`LogDate`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeviceLogsInfoBL`
--

LOCK TABLES `DeviceLogsInfoBL` WRITE;
/*!40000 ALTER TABLE `DeviceLogsInfoBL` DISABLE KEYS */;
/*!40000 ALTER TABLE `DeviceLogsInfoBL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeviceOperationLogs`
--

DROP TABLE IF EXISTS `DeviceOperationLogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DeviceOperationLogs` (
  `DeviceOperationLogId` int(11) NOT NULL AUTO_INCREMENT,
  `DeviceOperationLogCode` int(11) DEFAULT NULL,
  `DeviceOperationLogExecutedOn` datetime NOT NULL,
  `SerialNumber` varchar(255) NOT NULL,
  PRIMARY KEY (`DeviceOperationLogExecutedOn`,`DeviceOperationLogId`,`SerialNumber`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeviceOperationLogs`
--

LOCK TABLES `DeviceOperationLogs` WRITE;
/*!40000 ALTER TABLE `DeviceOperationLogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `DeviceOperationLogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeviceOperationLogTypes`
--

DROP TABLE IF EXISTS `DeviceOperationLogTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DeviceOperationLogTypes` (
  `OperationLogTypeId` int(11) NOT NULL,
  `OperationLogTypeCode` int(11) DEFAULT NULL,
  `OperationLogTypeName` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeviceOperationLogTypes`
--

LOCK TABLES `DeviceOperationLogTypes` WRITE;
/*!40000 ALTER TABLE `DeviceOperationLogTypes` DISABLE KEYS */;
/*!40000 ALTER TABLE `DeviceOperationLogTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Devices`
--

DROP TABLE IF EXISTS `Devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Devices` (
  `DeviceId` int(11) NOT NULL AUTO_INCREMENT,
  `DeviceFName` varchar(255) NOT NULL,
  `DevicesName` varchar(255) NOT NULL,
  `DeviceDirection` varchar(255) DEFAULT NULL,
  `SerialNumber` varchar(255) NOT NULL,
  `ConnectionType` varchar(255) DEFAULT NULL,
  `IpAddress` varchar(255) DEFAULT NULL,
  `BaudRate` varchar(255) DEFAULT NULL,
  `CommKey` varchar(255) NOT NULL,
  `ComPort` varchar(255) DEFAULT NULL,
  `LastLogDownloadDate` datetime DEFAULT NULL,
  `C1` varchar(255) DEFAULT NULL,
  `C2` varchar(255) DEFAULT NULL,
  `C3` varchar(255) DEFAULT NULL,
  `C4` varchar(255) DEFAULT NULL,
  `C5` varchar(255) DEFAULT NULL,
  `C6` varchar(255) DEFAULT NULL,
  `C7` varchar(255) DEFAULT NULL,
  `TransactionStamp` varchar(50) DEFAULT NULL,
  `LastPing` datetime DEFAULT NULL,
  `DeviceType` varchar(255) DEFAULT NULL,
  `OpStamp` varchar(255) DEFAULT NULL,
  `DownLoadType` int(11) DEFAULT NULL,
  `TimeZone` varchar(50) DEFAULT NULL,
  `DeviceLocation` varchar(50) DEFAULT NULL,
  `TimeOut` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`DeviceId`,`SerialNumber`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Devices`
--

LOCK TABLES `Devices` WRITE;
/*!40000 ALTER TABLE `Devices` DISABLE KEYS */;
/*!40000 ALTER TABLE `Devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employees`
--

DROP TABLE IF EXISTS `Employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employees` (
  `EmployeeId` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeName` varchar(50) NOT NULL,
  `EmployeeCode` varchar(50) NOT NULL,
  `StringCode` varchar(50) NOT NULL,
  `NumericCode` int(11) NOT NULL,
  `Gender` varchar(255) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  `DepartmentId` int(11) NOT NULL,
  `Designation` varchar(255) DEFAULT NULL,
  `CategoryId` int(11) NOT NULL,
  `DOJ` datetime DEFAULT NULL,
  `DOR` datetime DEFAULT NULL,
  `DOC` datetime DEFAULT NULL,
  `EmployeeCodeInDevice` varchar(50) NOT NULL,
  `EmployeeRFIDNumber` varchar(255) DEFAULT NULL,
  `EmployementType` varchar(255) NOT NULL,
  `Status` varchar(255) NOT NULL,
  `EmployeeDevicePassword` varchar(50) DEFAULT NULL,
  `EmployeeDeviceGroup` varchar(50) DEFAULT NULL,
  `FatherName` varchar(255) DEFAULT NULL,
  `MotherName` varchar(255) DEFAULT NULL,
  `ResidentialAddress` varchar(255) DEFAULT NULL,
  `PermanentAddress` varchar(255) DEFAULT NULL,
  `ContactNo` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `PlaceOfBirth` varchar(255) DEFAULT NULL,
  `Nomenee1` varchar(255) DEFAULT NULL,
  `Nomenee2` varchar(255) DEFAULT NULL,
  `Remarks` longtext,
  `RecordStatus` int(11) DEFAULT NULL,
  `C1` varchar(255) DEFAULT NULL,
  `C2` varchar(255) DEFAULT NULL,
  `C3` varchar(255) DEFAULT NULL,
  `C4` varchar(255) DEFAULT NULL,
  `C5` varchar(255) DEFAULT NULL,
  `C6` varchar(255) DEFAULT NULL,
  `C7` varchar(255) DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `BLOODGROUP` varchar(255) DEFAULT NULL,
  `WorkPlace` varchar(255) DEFAULT NULL,
  `ExtensionNo` varchar(255) DEFAULT NULL,
  `LoginName` varchar(255) DEFAULT NULL,
  `LoginPassword` varchar(255) DEFAULT NULL,
  `Grade` varchar(255) DEFAULT NULL,
  `Team` varchar(255) DEFAULT NULL,
  `IsRecieveNotification` int(11) DEFAULT NULL,
  `HolidayGroup` int(11) DEFAULT NULL,
  `ShiftGroupId` int(11) DEFAULT NULL,
  `ShiftRosterId` int(11) DEFAULT NULL,
  `LastModifiedBy` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`EmployeeCode`),
  UNIQUE KEY `UK_EmployeeCodeInDevice` (`EmployeeCodeInDevice`),
  KEY `EmployeeId` (`EmployeeId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employees`
--

LOCK TABLES `Employees` WRITE;
/*!40000 ALTER TABLE `Employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `Employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EmployeesBio`
--

DROP TABLE IF EXISTS `EmployeesBio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EmployeesBio` (
  `EmployeeBioId` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeId` int(11) NOT NULL,
  `BioType` varchar(50) NOT NULL,
  `BioVersion` varchar(50) DEFAULT NULL,
  `BioIndex` int(11) NOT NULL DEFAULT '0',
  `BioId` int(11) NOT NULL,
  `Bio` longtext,
  `BioFormatId` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`BioFormatId`,`BioId`,`BioIndex`,`BioType`,`EmployeeId`),
  KEY `EmployeeBioId` (`EmployeeBioId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EmployeesBio`
--

LOCK TABLES `EmployeesBio` WRITE;
/*!40000 ALTER TABLE `EmployeesBio` DISABLE KEYS */;
/*!40000 ALTER TABLE `EmployeesBio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TimeZone`
--

DROP TABLE IF EXISTS `TimeZone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TimeZone` (
  `TimeZoneId` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `SunStart` varchar(10) NOT NULL,
  `SunEnd` varchar(10) NOT NULL,
  `MonStart` varchar(10) NOT NULL,
  `MonEnd` varchar(10) NOT NULL,
  `TueStart` varchar(10) NOT NULL,
  `TueEnd` varchar(10) NOT NULL,
  `WedStart` varchar(10) NOT NULL,
  `WedEnd` varchar(10) NOT NULL,
  `ThuStart` varchar(10) NOT NULL,
  `ThuEnd` varchar(10) NOT NULL,
  `FriStart` varchar(10) NOT NULL,
  `FriEnd` varchar(10) NOT NULL,
  `SatStart` varchar(10) NOT NULL,
  `SatEnd` varchar(10) NOT NULL,
  `LastModifiedDate` datetime NOT NULL,
  PRIMARY KEY (`TimeZoneId`),
  UNIQUE KEY `UK_TimeZone_Name` (`Name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TimeZone`
--

LOCK TABLES `TimeZone` WRITE;
/*!40000 ALTER TABLE `TimeZone` DISABLE KEYS */;
INSERT INTO `TimeZone` VALUES (1,'TimeZone 01','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(2,'TimeZone 02','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(3,'TimeZone 03','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(4,'TimeZone 04','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(5,'TimeZone 05','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(6,'TimeZone 06','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(7,'TimeZone 07','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(8,'TimeZone 08','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(9,'TimeZone 09','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(10,'TimeZone 10','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(11,'TimeZone 11','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(12,'TimeZone 12','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(13,'TimeZone 13','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(14,'TimeZone 14','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(15,'TimeZone 15','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(16,'TimeZone 16','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(17,'TimeZone 17','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(18,'TimeZone 18','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(19,'TimeZone 19','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(20,'TimeZone 20','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(21,'TimeZone 21','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(22,'TimeZone 22','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(23,'TimeZone 23','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(24,'TimeZone 24','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(25,'TimeZone 25','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(26,'TimeZone 26','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(27,'TimeZone 27','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(28,'TimeZone 28','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(29,'TimeZone 29','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(30,'TimeZone 30','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(31,'TimeZone 31','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(32,'TimeZone 32','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(33,'TimeZone 33','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(34,'TimeZone 34','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(35,'TimeZone 35','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(36,'TimeZone 36','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(37,'TimeZone 37','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(38,'TimeZone 38','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(39,'TimeZone 39','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(40,'TimeZone 40','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(41,'TimeZone 41','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(42,'TimeZone 42','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(43,'TimeZone 43','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(44,'TimeZone 44','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(45,'TimeZone 45','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(46,'TimeZone 46','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(47,'TimeZone 47','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(48,'TimeZone 48','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(49,'TimeZone 49','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(50,'TimeZone 50','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00');
/*!40000 ALTER TABLE `TimeZone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `LoginName` varchar(50) NOT NULL,
  `LoginPassword` varchar(50) NOT NULL,
  `RoleName` varchar(255) DEFAULT NULL,
  `IsAdmin` int(11) NOT NULL,
  `AccessI` int(11) NOT NULL,
  `RecordStatus` int(11) DEFAULT NULL,
  `C1` varchar(255) DEFAULT NULL,
  `C2` varchar(255) DEFAULT NULL,
  `C3` varchar(255) DEFAULT NULL,
  `C4` varchar(255) DEFAULT NULL,
  `C5` varchar(255) DEFAULT NULL,
  `C6` varchar(255) DEFAULT NULL,
  `C7` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`LoginName`),
  KEY `UserId` (`UserId`)
) ENGINE=MyISAM AUTO_INCREMENT=102 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (101,'root','63A9F0EA7BB98050796B649E85481845',NULL,1,1,NULL,NULL,NULL,NULL,NULL,'1','1','2017-12-19 20:27:04');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VerificationMode`
--

DROP TABLE IF EXISTS `VerificationMode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `VerificationMode` (
  `VerifyMethodCode` int(11) DEFAULT NULL,
  `VerifyMethodName` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VerificationMode`
--

LOCK TABLES `VerificationMode` WRITE;
/*!40000 ALTER TABLE `VerificationMode` DISABLE KEYS */;
INSERT INTO `VerificationMode` VALUES (0,'VS_FP_OR_PW_OR_RF_OR_FACE'),(1,'VS_FP'),(2,'VS_PIN'),(3,'VS_PW'),(4,'VS_RF'),(5,'VS_FP_OR_PW'),(6,'VS_FP_OR_RF'),(7,'VS_PW_OR_RF'),(8,'VS_PIN_AND_FP'),(9,'VS_FP_AND_PW'),(10,'VS_FP_AND_RF'),(11,'VS_PW_AND_RF'),(12,'VS_FP_AND_PW_AND_RF'),(13,'VS_PIN_AND_FP_AND_PW'),(14,'VS_FP_AND_RF_OR_PIN'),(15,'VS_FACE'),(16,'VS_FACE_AND_FP'),(17,'VS_FACE_AND_PW'),(18,'VS_FACE_AND_RF'),(19,'VS_FACE_AND_FP_AND_RF'),(20,'VS_FACE_AND_FP_AND_PW'),(21,'VS_OTHER'),(22,'VS_NUM'),(25,'VS_PALM'),(101,'VS_FP'),(102,'VS_RF');
/*!40000 ALTER TABLE `VerificationMode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VerificationType`
--

DROP TABLE IF EXISTS `VerificationType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `VerificationType` (
  `VerificationTypeId` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  PRIMARY KEY (`VerificationTypeId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VerificationType`
--

LOCK TABLES `VerificationType` WRITE;
/*!40000 ALTER TABLE `VerificationType` DISABLE KEYS */;
INSERT INTO `VerificationType` VALUES (0,'Fingerprint or Password or Badge'),(1,'Fingerprint Only'),(2,'EmployeeCode Only'),(3,'Password Only'),(4,'Badge Only'),(5,'Fingerprint or Password'),(6,'Fingerprint or Badge'),(7,'Password or Badge'),(8,'EmployeeCode And Fingerprint'),(9,'Fingerprint And Password'),(10,'Fingerprint And Badge'),(11,'Password And Badge'),(12,'Fingerprint And Password And Badge'),(13,'EmployeeCode And Fingerprint And Password'),(14,'Fingerprint And Badge And EmployeeCode');
/*!40000 ALTER TABLE `VerificationType` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-28 10:27:40
