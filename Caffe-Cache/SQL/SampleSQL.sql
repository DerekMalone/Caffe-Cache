SELECT *		
FROM Coffee
WHERE UserId = '1234'

SELECT *
FROM Machine

SELECT *
FROM [User]

SELECT *
FROM Brew

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
VALUES ('Test',
		'Medium Grind',
		18,
		36,
		222,
		'00:03:00',
		'Brew it',
		'1234',
		1,
		1);