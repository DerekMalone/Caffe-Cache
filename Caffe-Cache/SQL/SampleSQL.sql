SELECT *
FROM Coffee

SELECT *
FROM Machine

SELECT *
FROM [User]

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
