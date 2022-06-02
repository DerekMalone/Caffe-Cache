USE MASTER
GO

IF NOT EXISTS (
    SELECT [name]
    FROM sys.databases
    WHERE [name] = N'CaffeCache'
)
CREATE DATABASE CaffeCache
GO

USE CaffeCache
GO


--DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS Machine;
DROP TABLE IF EXISTS Coffee;
DROP TABLE IF EXISTS Brew;


--CREATE TABLE [User] (
--	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
--	[Name] VARCHAR(55) NOT NULL,
--    [UID] VARCHAR(55) NOT NULL UNIQUE
--);


CREATE TABLE Machine (
    Id Integer NOT NULL PRIMARY KEY IDENTITY,
    [Name] VARCHAR(55) NOT NULL,
    UserId VARCHAR(55) NOT NULL,
    --CONSTRAINT FK_Machine_User FOREIGN KEY (UserId) REFERENCES [User]([UID])
);

CREATE TABLE Coffee (
    Id Integer NOT NULL PRIMARY KEY IDENTITY,
    Brand VARCHAR(55) NOT NULL,
    [Name] VARCHAR(55) NULL,
    RoastType VARCHAR(55) NULL,
    UserId VARCHAR(55) NOT NULL,
    --CONSTRAINT FK_Coffee_User FOREIGN KEY (UserId) REFERENCES [User]([UID])
);

CREATE TABLE Brew (
    Id Integer NOT NULL PRIMARY KEY IDENTITY,
    [Name] VARCHAR(55) NOT NULL,
    GrindSize VARCHAR(55) NULL,
    CoffeeWeight INT NULL,
    WaterVolume INT NUll,
    BrewTemp INT NULL,
    BrewDuration TIME NULL,
    BrewInstructions TEXT NULL,
    UserId VARCHAR(55) NOT NULL,
    MachineId INT NOT NULL,
    CoffeeId INT NOT NULL,
    --CONSTRAINT FK_Brew_User FOREIGN KEY (UserId) REFERENCES [User]([UID]),
    --CONSTRAINT FK_Brew_Machine FOREIGN KEY (UserID) REFERENCES Machine(UserId),
    --CONSTRAINT FK_Brew_Coffee FOREIGN KEY (UserID) REFERENCES Coffee(UserId)
);

--INSERT INTO [USER] ([NAME], [UID]) VALUES ('Derek Malone', '1234');
--INSERT INTO [USER] ([NAME], [UID]) VALUES ('Theodore Franklin', '2345');
--INSERT INTO [USER] ([NAME], [UID]) VALUES ('Duke Dog DeHund VonWoofenstein', '3456');
--INSERT INTO [USER] ([NAME], [UID]) VALUES ('Danielle Malone', '4567');

INSERT INTO Machine ([NAME], UserId) VALUES ('Gaggia Classic Pro', '0xTSjm1XDsWnFUOA8wdZklBtFB83');
INSERT INTO Machine ([NAME], UserId) VALUES ('Aero Press', '0xTSjm1XDsWnFUOA8wdZklBtFB83');
INSERT INTO Machine ([NAME], UserId) VALUES ('Gaggia Classic Pro', 'nJ9zfQ0E0OcgNe1dwPFwb7MqFkA2');

INSERT INTO Coffee (Brand, [Name], RoastType, UserId) VALUES ('8th And Roast', 'French Connection', 'Medium Light', '0xTSjm1XDsWnFUOA8wdZklBtFB83');
INSERT INTO Coffee (Brand, [Name], RoastType, UserId) VALUES ('8th And Roast', 'French Connection', 'Medium Light', 'nJ9zfQ0E0OcgNe1dwPFwb7MqFkA2');
INSERT INTO Coffee (Brand, [Name], RoastType, UserId) VALUES ('8th And Roast', 'French Connection', 'Medium Light', 'nJ9zfQ0E0OcgNe1dwPFwb7MqFkA2');
INSERT INTO Coffee (Brand, [Name], RoastType, UserId) VALUES ('8th And Roast', 'French Connection', 'Medium Light', '0xTSjm1XDsWnFUOA8wdZklBtFB83');

INSERT INTO Brew ([Name], GrindSize, CoffeeWeight, WaterVolume, BrewTemp, BrewDuration, BrewInstructions, UserId, MachineId, CoffeeId) VALUES ('Espresso', 'Fine Grind', 18, 36, 220, '00:01:30', 'grind, shake, tamp, brew', '1234', 1, 1);
INSERT INTO Brew ([Name], GrindSize, CoffeeWeight, WaterVolume, BrewTemp, BrewDuration, BrewInstructions, UserId, MachineId, CoffeeId) VALUES ('Americano', 'Fine Grind', 22, 40, 220, '00:02:00', 'grind, pour grinds into AP, pour in water, steep, flip onto mug, press plunger', '1234', 2, 1);
