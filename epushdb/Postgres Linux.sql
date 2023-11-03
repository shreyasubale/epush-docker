-- File name: C:\Users\Sharma\Desktop\epushDB\Postgres.sql
-- Created by DBConvert http://www.dbconvert.com


--
-- Table structure for table `bioformat`
--

CREATE TABLE "bioformat" (  "bioformatid" INTEGER NOT NULL ,
  "bioformat" VARCHAR NOT NULL ,
  PRIMARY KEY ("bioformatid","bioformat")
); 


--
-- Table structure for table `biotype`
--

CREATE TABLE "biotype" (  "biotypeid" INTEGER NOT NULL ,
  "biotype" VARCHAR NOT NULL ,
  PRIMARY KEY ("biotypeid","biotype")
); 


--
-- Table structure for table `commands`
--

CREATE TABLE "commands" (  "commandid" BIGSERIAL NOT NULL ,
  "commandtypeid" INTEGER NOT NULL ,
  "deviceid" BIGINT NOT NULL ,
  "employeeid" BIGINT NOT NULL ,
  "bioid" INTEGER NOT NULL ,
  "status" INTEGER NOT NULL ,
  "devicecommandid" BIGINT NULL ,
  "createdby" INTEGER NOT NULL ,
  "createdon" TIMESTAMP NOT NULL ,
  "modifiedon" TIMESTAMP NULL ,
  PRIMARY KEY ("commandid","commandtypeid","deviceid","employeeid","bioid")
); 


--
-- Table structure for table `devicecommands`
--

CREATE TABLE "devicecommands" (  "devicecommandid" SERIAL NOT NULL ,
  "title" VARCHAR NULL ,
  "devicecommand" TEXT NULL ,
  "serialnumber" VARCHAR NOT NULL ,
  "status" VARCHAR NULL ,
  "type" VARCHAR NULL ,
  "creationdate" TIMESTAMP NULL ,
  "executiondate" TIMESTAMP NULL ,
  PRIMARY KEY ("devicecommandid","serialnumber")
); 


--
-- Table structure for table `deviceerrormessages`
--

CREATE TABLE "deviceerrormessages" (  "deviceerrormessageid" SERIAL NOT NULL ,
  "serialnumber" VARCHAR NOT NULL ,
  "errormessage" TEXT NULL ,
  "logstream" TEXT NULL ,
  "createddate" VARCHAR NULL ,
  PRIMARY KEY ("deviceerrormessageid","serialnumber")
); 


--
-- Table structure for table `devicegroup`
--

CREATE TABLE "devicegroup" (  "devicegroupid" INTEGER NOT NULL ,
  "name" VARCHAR NOT NULL ,
  "description" VARCHAR NULL ,
  "verificationtypeid" INTEGER NOT NULL ,
  "lastmodifieddate" TIMESTAMP NOT NULL ,
  PRIMARY KEY ("devicegroupid"),
  UNIQUE ("name")
); 


--
-- Table structure for table `devicelogs`
--

CREATE TABLE "devicelogs" (  "devicelogid" SERIAL NOT NULL ,
  "downloaddate" TIMESTAMP NULL ,
  "deviceid" INTEGER NOT NULL ,
  "userid" VARCHAR NOT NULL ,
  "logdate" TIMESTAMP NOT NULL ,
  "direction" VARCHAR NULL ,
  "attdirection" VARCHAR NULL ,
  "c1" VARCHAR NULL ,
  "c2" VARCHAR NULL ,
  "c3" VARCHAR NULL ,
  "c4" VARCHAR NULL ,
  "c5" VARCHAR NULL ,
  "c6" VARCHAR NULL ,
  "c7" VARCHAR NULL ,
  "workcode" VARCHAR NULL 
); 
CREATE INDEX "devicelogs_devicelogid" ON "devicelogs" ("devicelogid");


--
-- Table structure for table `devicelogs_processed`
--

CREATE TABLE "devicelogs_processed" (  "devicelogid" SERIAL NOT NULL ,
  "downloaddate" TIMESTAMP NULL ,
  "deviceid" INTEGER NOT NULL ,
  "userid" VARCHAR NOT NULL ,
  "logdate" TIMESTAMP NOT NULL ,
  "direction" VARCHAR NULL ,
  "attdirection" VARCHAR NULL ,
  "c1" VARCHAR NULL ,
  "c2" VARCHAR NULL ,
  "c3" VARCHAR NULL ,
  "c4" VARCHAR NULL ,
  "c5" VARCHAR NULL ,
  "c6" VARCHAR NULL ,
  "c7" VARCHAR NULL ,
  "workcode" VARCHAR NULL 
); 
CREATE INDEX "devicelogs_processed_devicelogid" ON "devicelogs_processed" ("devicelogid");


--
-- Table structure for table `deviceoperationlogs`
--

CREATE TABLE "deviceoperationlogs" (  "deviceoperationlogid" SERIAL NOT NULL ,
  "deviceoperationlogcode" INTEGER NULL ,
  "deviceoperationlogexecutedon" TIMESTAMP NOT NULL ,
  "serialnumber" VARCHAR NOT NULL ,
  PRIMARY KEY ("deviceoperationlogid","deviceoperationlogexecutedon","serialnumber")
); 


--
-- Table structure for table `deviceoperationlogtypes`
--

CREATE TABLE "deviceoperationlogtypes" (  "operationlogtypeid" INTEGER NOT NULL ,
  "operationlogtypecode" INTEGER NULL ,
  "operationlogtypename" VARCHAR NULL 
); 


--
-- Table structure for table `devices`
--

CREATE TABLE "devices" (  "deviceid" SERIAL NOT NULL ,
  "devicefname" VARCHAR NOT NULL ,
  "devicesname" VARCHAR NOT NULL ,
  "devicedirection" VARCHAR NULL ,
  "serialnumber" VARCHAR NOT NULL ,
  "connectiontype" VARCHAR NULL ,
  "ipaddress" VARCHAR NULL ,
  "baudrate" VARCHAR NULL ,
  "commkey" VARCHAR NOT NULL ,
  "comport" VARCHAR NULL ,
  "lastlogdownloaddate" TIMESTAMP NULL ,
  "c1" VARCHAR NULL ,
  "c2" VARCHAR NULL ,
  "c3" VARCHAR NULL ,
  "c4" VARCHAR NULL ,
  "c5" VARCHAR NULL ,
  "c6" VARCHAR NULL ,
  "c7" VARCHAR NULL ,
  "transactionstamp" VARCHAR NULL ,
  "lastping" TIMESTAMP NULL ,
  "devicetype" VARCHAR NULL ,
  "opstamp" VARCHAR NULL ,
  "downloadtype" INTEGER NULL ,
  "timezone" VARCHAR NULL ,
  "devicelocation" VARCHAR NULL ,
  "timeout" VARCHAR NULL ,
  PRIMARY KEY ("deviceid","serialnumber")
); 


--
-- Table structure for table `employees`
--

CREATE TABLE "employees" (  "employeeid" SERIAL NOT NULL ,
  "employeename" VARCHAR NOT NULL ,
  "employeecode" VARCHAR NOT NULL ,
  "stringcode" VARCHAR NOT NULL ,
  "numericcode" INTEGER NOT NULL ,
  "gender" VARCHAR NOT NULL ,
  "companyid" INTEGER NOT NULL ,
  "departmentid" INTEGER NOT NULL ,
  "designation" VARCHAR NULL ,
  "categoryid" INTEGER NOT NULL ,
  "doj" TIMESTAMP NULL ,
  "dor" TIMESTAMP NULL ,
  "doc" TIMESTAMP NULL ,
  "employeecodeindevice" VARCHAR NOT NULL ,
  "employeerfidnumber" VARCHAR NULL ,
  "employementtype" VARCHAR NOT NULL ,
  "status" VARCHAR NOT NULL ,
  "employeedevicepassword" VARCHAR NULL ,
  "employeedevicegroup" VARCHAR NULL ,
  "fathername" VARCHAR NULL ,
  "mothername" VARCHAR NULL ,
  "residentialaddress" VARCHAR NULL ,
  "permanentaddress" VARCHAR NULL ,
  "contactno" VARCHAR NULL ,
  "email" VARCHAR NULL ,
  "dob" TIMESTAMP NULL ,
  "placeofbirth" VARCHAR NULL ,
  "nomenee1" VARCHAR NULL ,
  "nomenee2" VARCHAR NULL ,
  "remarks" TEXT NULL ,
  "recordstatus" INTEGER NULL ,
  "c1" VARCHAR NULL ,
  "c2" VARCHAR NULL ,
  "c3" VARCHAR NULL ,
  "c4" VARCHAR NULL ,
  "c5" VARCHAR NULL ,
  "c6" VARCHAR NULL ,
  "c7" VARCHAR NULL ,
  "location" VARCHAR NULL ,
  "bloodgroup" VARCHAR NULL ,
  "workplace" VARCHAR NULL ,
  "extensionno" VARCHAR NULL ,
  "loginname" VARCHAR NULL ,
  "loginpassword" VARCHAR NULL ,
  "grade" VARCHAR NULL ,
  "team" VARCHAR NULL ,
  "isrecievenotification" INTEGER NULL ,
  "holidaygroup" INTEGER NULL ,
  "shiftgroupid" INTEGER NULL ,
  "shiftrosterid" INTEGER NULL ,
  "lastmodifiedby" VARCHAR NULL ,
  PRIMARY KEY ("employeecode"),
  UNIQUE ("employeecodeindevice")
); 
CREATE INDEX "employees_employeeid" ON "employees" ("employeeid");


--
-- Table structure for table `employeesbio`
--

CREATE TABLE "employeesbio" (  "employeebioid" SERIAL NOT NULL ,
  "employeeid" INTEGER NOT NULL ,
  "biotype" VARCHAR NOT NULL ,
  "bioversion" VARCHAR NULL ,
  "bioindex" INTEGER NOT NULL DEFAULT 0,
  "bioid" INTEGER NOT NULL ,
  "bio" TEXT NULL ,
  "bioformatid" INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY ("employeeid","biotype","bioindex","bioid","bioformatid")
); 
CREATE INDEX "employeesbio_employeebioid" ON "employeesbio" ("employeebioid");


--
-- Table structure for table `timezone`
--

CREATE TABLE "timezone" (  "timezoneid" INTEGER NOT NULL ,
  "name" VARCHAR NOT NULL ,
  "description" VARCHAR NULL ,
  "sunstart" VARCHAR NOT NULL ,
  "sunend" VARCHAR NOT NULL ,
  "monstart" VARCHAR NOT NULL ,
  "monend" VARCHAR NOT NULL ,
  "tuestart" VARCHAR NOT NULL ,
  "tueend" VARCHAR NOT NULL ,
  "wedstart" VARCHAR NOT NULL ,
  "wedend" VARCHAR NOT NULL ,
  "thustart" VARCHAR NOT NULL ,
  "thuend" VARCHAR NOT NULL ,
  "fristart" VARCHAR NOT NULL ,
  "friend" VARCHAR NOT NULL ,
  "satstart" VARCHAR NOT NULL ,
  "satend" VARCHAR NOT NULL ,
  "lastmodifieddate" TIMESTAMP NOT NULL ,
  PRIMARY KEY ("timezoneid"),
  UNIQUE ("name")
); 


--
-- Table structure for table `users`
--

CREATE TABLE "users" (  "userid" SERIAL NOT NULL ,
  "loginname" VARCHAR NOT NULL ,
  "loginpassword" VARCHAR NOT NULL ,
  "rolename" VARCHAR NULL ,
  "isadmin" INTEGER NOT NULL ,
  "accessi" INTEGER NOT NULL ,
  "recordstatus" INTEGER NULL ,
  "c1" VARCHAR NULL ,
  "c2" VARCHAR NULL ,
  "c3" VARCHAR NULL ,
  "c4" VARCHAR NULL ,
  "c5" VARCHAR NULL ,
  "c6" VARCHAR NULL ,
  "c7" VARCHAR NULL ,
  PRIMARY KEY ("loginname")
); 
CREATE INDEX "users_userid" ON "users" ("userid");


--
-- Table structure for table `verificationmode`
--

CREATE TABLE "verificationmode" (  "verifymethodcode" INTEGER NULL ,
  "verifymethodname" TEXT NULL 
); 


--
-- Table structure for table `verificationtype`
--

CREATE TABLE "verificationtype" (  "verificationtypeid" INTEGER NOT NULL ,
  "name" TEXT NOT NULL ,
  PRIMARY KEY ("verificationtypeid")
); 


--
-- Dumping data for table `bioformat`
--

INSERT INTO "bioformat" ("bioformatid","bioformat") VALUES (0,'ES'),(1,'ISO'),(2,'ANSI');

--
-- Dumping data for table `biotype`
--

INSERT INTO "biotype" ("biotypeid","biotype") VALUES (0,'UserPic'),(1,'Fingerprint'),(2,'Face'),(3,'Voiceprint'),(4,'Iris'),(5,'Retina'),(6,'Palmprint'),(7,'Fingervein'),(8,'Palm');

--
-- Dumping data for table `devicegroup`
--

INSERT INTO "devicegroup" ("devicegroupid","name","description","verificationtypeid","lastmodifieddate") VALUES (1,'DeviceGroup 01','DeviceGroup 01',0,'1970-01-01 00:00:00'),(2,'DeviceGroup 02','DeviceGroup 02',0,'1970-01-01 00:00:00'),(3,'DeviceGroup 03','DeviceGroup 03',0,'1970-01-01 00:00:00'),(4,'DeviceGroup 04','DeviceGroup 04',0,'1970-01-01 00:00:00'),(5,'DeviceGroup 05','DeviceGroup 05',0,'1970-01-01 00:00:00'),(6,'DeviceGroup 06','DeviceGroup 06',0,'1970-01-01 00:00:00'),(7,'DeviceGroup 07','DeviceGroup 07',0,'1970-01-01 00:00:00'),(8,'DeviceGroup 08','DeviceGroup 08',0,'1970-01-01 00:00:00'),(9,'DeviceGroup 09','DeviceGroup 09',0,'1970-01-01 00:00:00'),(10,'DeviceGroup 10','DeviceGroup 10',0,'1970-01-01 00:00:00');

--
-- Dumping data for table `deviceoperationlogtypes`
--

INSERT INTO "deviceoperationlogtypes" ("operationlogtypeid","operationlogtypecode","operationlogtypename") VALUES (1,0,'Power On'),(2,1,'Power Off'),(3,2,'The Authentication is Failed'),(4,3,'Alarm'),(5,4,'Enter into the Main Menu'),(6,5,'Change The Setting'),(7,6,'Enroll a FingerPrint'),(8,7,'Enroll a Password'),(9,8,'Enroll a HID Card'),(10,9,'Delete a User'),(11,10,'Delete a FingerPrint'),(12,11,'Delete a Password'),(13,12,'Delete a RFID Card'),(14,13,'Clear the Data'),(15,14,'Create a MF Card'),(16,15,'Enroll a MF Card'),(17,16,'Register  a MF Card'),(18,17,'Delete The Registration of MF Card'),(19,18,'Clear the MF Cards Content'),(20,19,'Move The Enroll Data into Card'),(21,20,'Coyp The Data in The Card to The Machine'),(22,21,'Set The Time'),(23,22,'Factory Setting'),(24,23,'Delete The In And Out Record'),(25,24,'Clear The Administrator Privilege'),(26,25,'Modify The Setting of Access Control Group'),(27,26,'Modify The Setting Of User Access Control'),(28,27,'Modify The Time Field Of Access Control'),(29,28,'Modify The Setting Of Unclock Combination'),(30,29,'Unclock'),(31,30,'Enroll a User'),(32,31,'Change The Finger Prints Attribute'),(33,32,'Duress Alarm');

--
-- Dumping data for table `timezone`
--

INSERT INTO "timezone" ("timezoneid","name","description","sunstart","sunend","monstart","monend","tuestart","tueend","wedstart","wedend","thustart","thuend","fristart","friend","satstart","satend","lastmodifieddate") VALUES (1,'TimeZone 01','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(2,'TimeZone 02','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(3,'TimeZone 03','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(4,'TimeZone 04','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(5,'TimeZone 05','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(6,'TimeZone 06','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(7,'TimeZone 07','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(8,'TimeZone 08','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(9,'TimeZone 09','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(10,'TimeZone 10','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(11,'TimeZone 11','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(12,'TimeZone 12','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(13,'TimeZone 13','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(14,'TimeZone 14','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(15,'TimeZone 15','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(16,'TimeZone 16','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(17,'TimeZone 17','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(18,'TimeZone 18','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(19,'TimeZone 19','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(20,'TimeZone 20','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(21,'TimeZone 21','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(22,'TimeZone 22','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(23,'TimeZone 23','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(24,'TimeZone 24','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(25,'TimeZone 25','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(26,'TimeZone 26','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(27,'TimeZone 27','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(28,'TimeZone 28','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(29,'TimeZone 29','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(30,'TimeZone 30','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(31,'TimeZone 31','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(32,'TimeZone 32','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(33,'TimeZone 33','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(34,'TimeZone 34','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(35,'TimeZone 35','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(36,'TimeZone 36','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(37,'TimeZone 37','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(38,'TimeZone 38','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(39,'TimeZone 39','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(40,'TimeZone 40','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(41,'TimeZone 41','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(42,'TimeZone 42','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(43,'TimeZone 43','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(44,'TimeZone 44','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(45,'TimeZone 45','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(46,'TimeZone 46','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(47,'TimeZone 47','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(48,'TimeZone 48','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(49,'TimeZone 49','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00'),(50,'TimeZone 50','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','0000','1970-01-01 00:00:00');

--
-- Dumping data for table `users`
--

INSERT INTO "users" ("userid","loginname","loginpassword","rolename","isadmin","accessi","recordstatus","c1","c2","c3","c4","c5","c6","c7") VALUES (1,'root','63A9F0EA7BB98050796B649E85481845','Admin',1,1,1,NULL,NULL,NULL,NULL,'1','1','2017-11-28 11:51:56');
SELECT setval('public."users_userid_seq"', max("userid") ) FROM "users"; 


--
-- Dumping data for table `verificationmode`
--

INSERT INTO "verificationmode" ("verifymethodcode","verifymethodname") VALUES (0,'VS_FP_OR_PW_OR_RF_OR_FACE'),(1,'VS_FP'),(2,'VS_PIN'),(3,'VS_PW'),(4,'VS_RF'),(5,'VS_FP_OR_PW'),(6,'VS_FP_OR_RF'),(7,'VS_PW_OR_RF'),(8,'VS_PIN_AND_FP'),(9,'VS_FP_AND_PW'),(10,'VS_FP_AND_RF'),(11,'VS_PW_AND_RF'),(12,'VS_FP_AND_PW_AND_RF'),(13,'VS_PIN_AND_FP_AND_PW'),(14,'VS_FP_AND_RF_OR_PIN'),(15,'VS_FACE'),(16,'VS_FACE_AND_FP'),(17,'VS_FACE_AND_PW'),(18,'VS_FACE_AND_RF'),(19,'VS_FACE_AND_FP_AND_RF'),(20,'VS_FACE_AND_FP_AND_PW'),(21,'VS_OTHER'),(22,'VS_NUM'),(25,'VS_PALM'),(101,'VS_FP'),(102,'VS_RF');

--
-- Dumping data for table `verificationtype`
--

INSERT INTO "verificationtype" ("verificationtypeid","name") VALUES (0,'Fingerprint or Password or Badge'),(1,'Fingerprint Only'),(2,'EmployeeCode Only'),(3,'Password Only'),(4,'Badge Only'),(5,'Fingerprint or Password'),(6,'Fingerprint or Badge'),(7,'Password or Badge'),(8,'EmployeeCode And Fingerprint'),(9,'Fingerprint And Password'),(10,'Fingerprint And Badge'),(11,'Password And Badge'),(12,'Fingerprint And Password And Badge'),(13,'EmployeeCode And Fingerprint And Password'),(14,'Fingerprint And Badge And EmployeeCode');
