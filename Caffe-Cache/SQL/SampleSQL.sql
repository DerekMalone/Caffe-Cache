SELECT *		
FROM Coffee
WHERE UserId = '1234'

SELECT *
FROM Machine

SELECT *
FROM [User]

--Get Brews by UID
SELECT *
FROM Brew
--WHERE UserId = '1234'

SELECT b.Id,
	b.[Name],
	b.GrindSize,
	b.CoffeeWeight,
	b.WaterVolume,
	b.BrewTemp,
	b.BrewDuration,
	b.BrewInstructions,
	u.[Name] AS UserName,
	m.[Name] AS MachineName,
	c.Brand AS CoffeeBrand,
	c.[Name] AS CoffeeName
FROM Brew b
LEFT JOIN [User] u ON b.UserId = u.UID
LEFT JOIN Machine m ON b.MachineId = m.Id
LEFT JOIN Coffee c ON b.CoffeeId = c.Id

INSERT INTO Machine 
([Name],
UserId)
OUTPUT INSERTED.ID
VALUES ('French Press', '1234');

SELECT Id,
[Name] AS BrewName,
GrindSize,
CoffeeWeight,
WaterVolume,
BrewTemp,
BrewDuration,
BrewInstructions,
UserId,
MachineId,
CoffeeId
FROM Brew
WHERE UserId = '1234' AND Id = 1

UPDATE Machine
SET [Name] = 'Gaggia Classic Pro'
WHERE Id = 1 AND UserId = '1234'

INSERT INTO Brew (
				[Name],
				GrindSize,
				CoffeeWeight,
				WaterVolume,
				BrewTemp,
				BrewDuration,
				BrewInstructions,
				UserId,
				MachineId,
				CoffeeId)
OUTPUT INSERTED.ID
VALUES ('Test 9',
		'Medium Grind',
		18,
		36,
		222,
		'00:03:00',
		'Brew it',
		'1234',
		1,
		9);

UPDATE Machine
SET [Name] = 'Test 2.0"',
UserId = 1234
WHERE Id = 8

SELECT Id,
		[Name] AS BrewName,
		GrindSize,
		CoffeeWeight,
		WaterVolume,
		BrewTemp,
		BrewDuration,
		BrewInstructions,
		UserId,
		MachineId,
		CoffeeId
FROM Brew
WHERE MachineId = 2

SELECT Id,
		[Name] AS BrewName,
		GrindSize,
		CoffeeWeight,
		WaterVolume,
		BrewTemp,
		BrewDuration,
		BrewInstructions,
		UserId,
		MachineId,
		CoffeeId
FROM Brew
WHERE CoffeeId = 9

--GetMachineByBrewId
SELECT b.Id as BrewId,
		m.Id as MachineId,
		m.[Name] as MachineName,
		m.UserId as MachineUserId
FROM Machine m
 INNER JOIN Brew b ON b.MachineId = m.Id
WHERE b.Id = 2

--GetCoffeeByBrewId
SELECT  c.Id as CoffeeId,
		c.Brand,
		c.[Name],
		c.RoastType,
		c.UserId
FROM Coffee c
INNER JOIN Brew b ON b.CoffeeId = c.Id
WHERE b.Id = 1

UPDATE Machine
SET UserId = '0xTSjm1XDsWnFUOA8wdZklBtFB83'
WHERE Id = 1

UPDATE Brew
SET UserId = '0xTSjm1XDsWnFUOA8wdZklBtFB83'
WHERE Id = 1

UPDATE Brew
SET UserId = 'nJ9zfQ0E0OcgNe1dwPFwb7MqFkA2'
WHERE Id = 2



UPDATE Brew                                            
    SET [Name] = 'Test 2',
        GrindSize = 'Test 2',
        CoffeeWeight = 22,
        WaterVolume = 22,
        BrewTemp = 22,
        BrewDurationHour = 0,
        BrewDurationMin = 1,
        BrewDurationSec = 1,
        BrewInstructions = 'Test 2',
        UserId = '0xTSjm1XDsWnFUOA8wdZklBtFB83',
        MachineId = 0,
        CoffeeId = 0
WHERE Id = 6
